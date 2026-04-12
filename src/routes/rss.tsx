import { FastifyInstance } from "fastify";
import { useViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { requireAuth } from "../middleware/requireAuth";
import { RSS_SUGGESTION_SCHEMA, validate } from "../helpers/validations";
import rssSuggestionService from "../services/rssSuggestion.service";
import rssSourceService from "../services/rssSource.service";
import { sendRssSuggestionReceivedEmail } from "../services/email.service";
import { SuggestFeed } from "../views/rss/SuggestFeed";
import { SuggestSuccess } from "../views/rss/SuggestSuccess";
import { sentryException } from "../sentry";

const useCtx = useViews();

export default async function rssRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/rss/suggest",
    {
      preHandler: [verifyToken],
      config: { rateLimit: { max: 30, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);

      return html(
        <SuggestFeed
          {...base()}
          csrfToken={reply.generateCsrf()}
          title="Suggest an RSS Feed — Rawfeed"
          description="Suggest an RSS feed to be added to rawfeed.social."
        />,
      );
    },
  );

  fastify.post(
    "/rss/suggest",
    {
      preHandler: [fastify.csrfProtection, verifyToken, requireAuth],
      config: { rateLimit: { max: 5, timeWindow: "1 day" } },
    },
    async (request, reply) => {
      const { base, setValidation, setState, html } = useCtx(request, reply);
      const loggedUser = request.loggedUser!;

      const body = request.body as Record<string, unknown>;
      const validation = validate(RSS_SUGGESTION_SCHEMA, body);

      if (validation.isNotValid) {
        setValidation(validation.errors);
        setState(body);
        return reply.redirect("/rss/suggest");
      }

      // Re-parse safe values from the body
      const parsed = RSS_SUGGESTION_SCHEMA.safeParse(body);
      if (!parsed.success) {
        setValidation({});
        return reply.redirect("/rss/suggest");
      }

      const { url, language, is_owner } = parsed.data;

      // Duplicate check: block if URL already pending/accepted in suggestions, or active in rss_sources
      const [hasSuggestion, sourceExists] = await Promise.all([
        rssSuggestionService.hasPendingOrAccepted(url),
        rssSourceService.urlExists(url),
      ]);

      if (hasSuggestion || sourceExists) {
        setValidation({
          url: "This RSS feed URL has already been submitted or is already active.",
        });
        setState(body);
        return reply.redirect("/rss/suggest");
      }

      const suggestion = await rssSuggestionService.create({
        submitted_by: loggedUser.userId,
        url,
        language,
        is_owner: is_owner as boolean,
      });

      await sendRssSuggestionReceivedEmail({
        submitterUsername: loggedUser.username,
        submitterEmail: suggestion.submitter_email ?? loggedUser.username,
        feedUrl: url,
        language,
        isOwner: is_owner as boolean,
        suggestionId: suggestion.id,
      }).catch((error) => {
        sentryException(error, {
          suggestionId: suggestion.id,
        });
      });

      return html(
        <SuggestSuccess
          {...base()}
          title="Suggestion Submitted — Rawfeed"
          description="Your RSS feed suggestion has been submitted for review."
        />,
      );
    },
  );
}
