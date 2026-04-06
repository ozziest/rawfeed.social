import { FastifyInstance } from "fastify";
import { useJsxViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { REPORT_POST_SCHEMA, validate } from "../helpers/validations";
import postService from "../services/post.service";
import { sendPostReportEmail } from "../services/email.service";
import { NotFound } from "../views/NotFound";
import { ReportPost } from "../views/posts/ReportPost";
import { ReportSuccess } from "../views/posts/ReportSuccess";

const useCtx = useJsxViews();

export default async function reportRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/report/post/:postId",
    {
      preHandler: [verifyToken],
      config: { rateLimit: { max: 30, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { postId } = request.params as { postId: string };
      const { html, base } = useCtx(request, reply);

      const post = await postService.getById(postId);
      if (!post) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      return html(
        <ReportPost
          {...base()}
          post={post}
          csrfToken={reply.generateCsrf()}
          title="Report Post — Rawfeed"
          description="Report a post on rawfeed.social"
        />,
      );
    },
  );

  fastify.post(
    "/report/post/:postId",
    {
      preHandler: [fastify.csrfProtection, verifyToken],
      config: { rateLimit: { max: 3, timeWindow: "1 days" } },
    },
    async (request, reply) => {
      const { postId } = request.params as { postId: string };
      const { html, base, setValidation, setState } = useCtx(request, reply);

      const post = await postService.getById(postId);
      if (!post) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      const body = request.body as Record<string, unknown>;
      const validation = validate(REPORT_POST_SCHEMA, body);

      if (validation.isNotValid) {
        setValidation(validation.errors);
        setState(body);
        return reply.redirect(`/report/post/${postId}`);
      }

      const { reason, explanation } = body as {
        reason: string;
        explanation?: string;
      };

      const postUrl = `${process.env.APP_URL ?? "https://rawfeed.social"}/posts/${postId}`;

      await sendPostReportEmail({
        postId,
        postUrl,
        reason,
        explanation: explanation ?? "",
      });

      return html(<ReportSuccess {...base()} postId={postId} />);
    },
  );
}
