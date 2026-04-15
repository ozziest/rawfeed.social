import { FastifyInstance } from "fastify";
import { useViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { requireAuth } from "../middleware/requireAuth";
import { shouldBeAdmin } from "../middleware/shouldBeAdmin";
import {
  ACCEPT_RSS_SUGGESTION_SCHEMA,
  REJECT_RSS_SUGGESTION_SCHEMA,
  validate,
} from "../helpers/validations";
import rssSuggestionService, {
  nextSuggestionCursor,
} from "../services/rssSuggestion.service";
import rssSourceService from "../services/rssSource.service";
import userService from "../services/user.service";
import { testRssFeed } from "../services/rss.service";
import {
  sendRssSuggestionAcceptedEmail,
  sendRssSuggestionRejectedEmail,
} from "../services/email.service";
import { addSourceToScheduler } from "../scheduler/rss-scheduler";
import { NotFound } from "../views/NotFound";
import { RssSuggestions } from "../views/admin/RssSuggestions";
import { RssSuggestionsNext } from "../views/admin/RssSuggestionsNext";
import { RssSuggestionDetail } from "../views/admin/RssSuggestionDetail";
import { RssSuggestionFeedPreview } from "../views/admin/RssSuggestionFeedPreview";
import { sentryException } from "../sentry";

const useCtx = useViews();
const adminHandlers = [verifyToken, requireAuth, shouldBeAdmin] as const;

export default async function adminRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/admin/rss-suggestions",
    { preHandler: [...adminHandlers] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const { status } = request.query as { status?: string };

      const [suggestions, counts] = await Promise.all([
        rssSuggestionService.getAll(undefined, status),
        rssSuggestionService.getCounts(),
      ]);

      return html(
        <RssSuggestions
          {...base()}
          suggestions={suggestions}
          nextCursor={nextSuggestionCursor(suggestions)}
          status={status}
          counts={counts}
          title="RSS Suggestions — Admin — Rawfeed"
          description="Manage RSS feed suggestions."
        />,
      );
    },
  );

  fastify.get(
    "/admin/rss-suggestions/next/:cursor",
    { preHandler: [...adminHandlers] },
    async (request, reply) => {
      const { cursor } = request.params as { cursor: string };
      const { status } = request.query as { status?: string };
      const { html } = useCtx(request, reply);

      const suggestions = await rssSuggestionService.getAll(cursor, status);

      return html(
        <RssSuggestionsNext
          suggestions={suggestions}
          nextCursor={nextSuggestionCursor(suggestions)}
          status={status}
        />,
      );
    },
  );

  fastify.get(
    "/admin/rss-suggestions/:id",
    { preHandler: [...adminHandlers] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { html, base } = useCtx(request, reply);

      const suggestion = await rssSuggestionService.getById(id);
      if (!suggestion) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      return html(
        <RssSuggestionDetail
          {...base()}
          suggestion={suggestion}
          csrfToken={reply.generateCsrf()}
          title="RSS Suggestion Detail — Admin — Rawfeed"
          description="Review this RSS feed suggestion."
        />,
      );
    },
  );

  fastify.post(
    "/admin/rss-suggestions/:id/test",
    {
      preHandler: [...adminHandlers],
      config: { rateLimit: { max: 20, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { base } = useCtx(request, reply);

      const suggestion = await rssSuggestionService.getById(id);
      if (!suggestion) {
        return reply.status(404).send("Not found");
      }

      const result = await testRssFeed(suggestion.url);

      return reply.html(
        <RssSuggestionFeedPreview result={result} {...base()} />,
      );
    },
  );

  fastify.post(
    "/admin/rss-suggestions/:id/accept",
    {
      preHandler: [fastify.csrfProtection, ...adminHandlers],
      config: { rateLimit: { max: 30, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { base, setValidation, setState, html } = useCtx(request, reply);

      const suggestion = await rssSuggestionService.getById(id);
      if (!suggestion) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      if (suggestion.status !== "pending") {
        return reply.redirect(`/admin/rss-suggestions/${id}`);
      }

      const body = request.body as Record<string, unknown>;
      const validation = validate(ACCEPT_RSS_SUGGESTION_SCHEMA, body);

      if (validation.isNotValid) {
        setValidation(validation.errors);
        setState(body);
        return reply.redirect(`/admin/rss-suggestions/${id}`);
      }

      const parsed = ACCEPT_RSS_SUGGESTION_SCHEMA.safeParse(body);
      if (!parsed.success) {
        return reply.redirect(`/admin/rss-suggestions/${id}`);
      }

      const {
        bot_username,
        bot_name,
        name,
        bio,
        language,
        update_frequency,
        category,
      } = parsed.data;

      // Create bot user
      const botUser = await userService.createRSSBot({
        username: bot_username,
        name: bot_name,
        bio: bio ?? "",
        url: suggestion.url,
        category: (category || "blog") as any,
        language: language as any,
        updateFrequency: update_frequency,
      });

      if (!botUser) {
        setValidation({
          bot_username:
            "Failed to create bot user. The username may already be taken.",
        });
        setState(body);
        return reply.redirect(`/admin/rss-suggestions/${id}`);
      }

      // Create rss_source
      const rssSource = await rssSourceService.create({
        submitted_by: suggestion.submitted_by,
        bot_user_id: botUser.id,
        url: suggestion.url,
        name,
        bio: bio ?? "",
        category: category ?? "",
        language,
        update_frequency,
      });

      // Mark suggestion accepted
      await rssSuggestionService.accept(id);

      // Activate scheduler immediately (non-fatal)
      await addSourceToScheduler({
        ...rssSource,
        username: bot_username,
      }).catch((error) => {
        sentryException(error, {
          bot_username,
        });
      });

      // Send acceptance email to submitter (non-fatal)
      if (suggestion.submitter_email && suggestion.submitter_username) {
        await sendRssSuggestionAcceptedEmail(
          suggestion.submitter_email,
          suggestion.submitter_username,
          name,
          suggestion.url,
        ).catch((error) => {
          sentryException(error, {
            bot_username,
          });
        });
      }

      return reply.redirect("/admin/rss-suggestions");
    },
  );

  fastify.post(
    "/admin/rss-suggestions/:id/reject",
    {
      preHandler: [fastify.csrfProtection, ...adminHandlers],
      config: { rateLimit: { max: 30, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { base, setValidation, setState } = useCtx(request, reply);

      const suggestion = await rssSuggestionService.getById(id);
      if (!suggestion) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      if (suggestion.status !== "pending") {
        return reply.redirect(`/admin/rss-suggestions/${id}`);
      }

      const body = request.body as Record<string, unknown>;
      const validation = validate(REJECT_RSS_SUGGESTION_SCHEMA, body);

      if (validation.isNotValid) {
        setValidation(validation.errors);
        setState(body);
        return reply.redirect(`/admin/rss-suggestions/${id}`);
      }

      const parsed = REJECT_RSS_SUGGESTION_SCHEMA.safeParse(body);
      if (!parsed.success) {
        return reply.redirect(`/admin/rss-suggestions/${id}`);
      }

      const { rejection_reason, admin_notes } = parsed.data;

      await rssSuggestionService.reject(id, rejection_reason, admin_notes);

      // Send rejection email to submitter (non-fatal)
      if (suggestion.submitter_email && suggestion.submitter_username) {
        await sendRssSuggestionRejectedEmail(
          suggestion.submitter_email,
          suggestion.submitter_username,
          suggestion.url,
          rejection_reason,
        ).catch((error) => {
          sentryException(error, {
            suggestionId: suggestion.id,
          });
        });
      }

      return reply.redirect("/admin/rss-suggestions");
    },
  );
}
