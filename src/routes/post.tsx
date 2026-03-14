import { FastifyInstance } from "fastify";
import { useJsxViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { requireAuth } from "../middleware/requireAuth";
import { POST_SCHEMA, validate } from "../helpers/validations";
import { PostInput } from "../helpers/dtos";
import postService from "../services/post.service";
import { nextCursor } from "../helpers/common";
import { PostCreate } from "../views/posts/PostCreate";
import { PostsNext } from "../views/posts/PostsNext";
import { ReshareButton } from "../views/components/posts/ReshareButton";
import { PostDetail } from "../views/posts/PostDetail";
import { ReplySection } from "../views/posts/ReplySection";
import { NotFound } from "../views/NotFound";

const useCtx = useJsxViews();

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/posts/:id",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { html, base } = useCtx(request, reply);
      const loggedUserId = request.loggedUser?.userId;
      const csrfToken = reply.generateCsrf();

      const post = await postService.getById(id, loggedUserId);
      if (!post) {
        return reply.status(404).html(<NotFound {...base()} />);
      }

      const replies = await postService.getReplies(id, loggedUserId);

      return html(
        <PostDetail
          {...base()}
          post={post}
          replies={replies}
          csrfToken={csrfToken}
        />,
      );
    },
  );

  fastify.post(
    "/posts/:id/reply",
    {
      preHandler: [fastify.csrfProtection, verifyToken, requireAuth],
      config: { rateLimit: { max: 20, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const { html, base, setValidation, setState } = useCtx(request, reply);
      const csrfToken = reply.generateCsrf();
      const loggedUserId = request.loggedUser!.userId;

      const post = await postService.getById(id, loggedUserId);
      if (!post) {
        return reply.status(404).send();
      }

      const validation = validate(POST_SCHEMA, request.body);
      if (validation.isNotValid) {
        setValidation(validation.errors);
        setState(request.body as object);
        const b = base();
        const replies = await postService.getReplies(id, loggedUserId);
        return html(
          <ReplySection
            postId={id}
            replies={replies}
            loggedUser={b.loggedUser}
            csrfToken={csrfToken}
            validation={b.validation}
            formData={b.state as Record<string, unknown>}
          />,
        );
      }

      const input = request.body as PostInput;
      await postService.insert(loggedUserId, input, undefined, undefined, id);

      const replies = await postService.getReplies(id, loggedUserId);
      return html(
        <ReplySection
          postId={id}
          replies={replies}
          loggedUser={request.loggedUser}
          csrfToken={csrfToken}
        />,
      );
    },
  );

  fastify.get(
    "/posts/next/:cursor/:userId",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { cursor, userId } = request.params as {
        cursor: string;
        userId?: string;
      };

      const { html } = useCtx(request, reply);
      const csrfToken = reply.generateCsrf();
      const loggedUserId = request.loggedUser?.userId;

      const posts = await postService.getItems({
        cursor,
        userId,
        loggedUserId,
      });
      postService.incViews(posts);

      return html(
        <PostsNext
          posts={posts}
          nextCursor={nextCursor(posts)}
          userId={userId}
          csrfToken={csrfToken}
          loggedUser={request.loggedUser}
        />,
      );
    },
  );

  fastify.post(
    "/posts/reshare/:postId",
    {
      preHandler: [fastify.csrfProtection, verifyToken, requireAuth],
      config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { postId } = request.params as { postId: string };
      const { html, notify } = useCtx(request, reply);
      const csrfToken = reply.generateCsrf();
      const userId = request.loggedUser!.userId;

      const existing = await postService.getReshareByUser(userId, postId);
      if (existing) {
        await postService.unreshare(userId, postId);
      } else {
        try {
          await postService.reshare(userId, postId);
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Cannot reshare this post";
          notify(message);
          const current = await postService.getById(postId, userId);
          if (!current) {
            return reply.status(404).send();
          }
          return html(
            <ReshareButton
              post={current}
              loggedUser={request.loggedUser}
              csrfToken={csrfToken}
            />,
          );
        }
      }

      const post = await postService.getById(postId, userId);
      if (!post) {
        notify("Post not found");
        return reply.status(404).send();
      }

      return html(
        <ReshareButton
          post={post}
          loggedUser={request.loggedUser}
          csrfToken={csrfToken}
        />,
      );
    },
  );

  fastify.post(
    "/posts/create",
    {
      preHandler: [fastify.csrfProtection, verifyToken, requireAuth],
      config: { rateLimit: { max: 20, timeWindow: "1 minute" } },
    },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const csrfToken = reply.generateCsrf();

      const validation = validate(POST_SCHEMA, request.body);
      if (validation.isNotValid) {
        const b = base();
        return html(
          <PostCreate
            posts={[]}
            csrfToken={csrfToken}
            loggedUser={b.loggedUser}
            validation={b.validation}
            formData={b.state as Record<string, unknown>}
          />,
        );
      }

      const input = request.body as PostInput;
      const id = await postService.insert(request.loggedUser?.userId!, input);
      console.log("id", id);

      const loggedUserId = request.loggedUser?.userId;
      const posts = await postService.getItems({ id, loggedUserId });
      const b = base();

      return html(
        <PostCreate
          posts={posts}
          csrfToken={csrfToken}
          loggedUser={b.loggedUser}
        />,
      );
    },
  );
}
