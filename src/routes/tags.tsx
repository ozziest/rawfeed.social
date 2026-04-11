import { FastifyInstance } from "fastify";
import { verifyToken } from "../middleware/verifyToken";
import userService from "../services/user.service";
import { useViews } from "../helpers/useViews";
import postService from "../services/post.service";
import hashtagService from "../services/hashtag.service";
import { HashtagViewParams } from "../helpers/dtos";
import { HASHTAG_VALIDATION, validate } from "../helpers/validations";
import { TagsIndex } from "../views/tags/TagsIndex";
import { NotFound } from "../views/NotFound";
import { asset } from "../helpers/asset";

const useCtx = useViews();

export default async function tagsRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/tags/:hashtag",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const { hashtag } = request.params as HashtagViewParams;

      const validation = validate(HASHTAG_VALIDATION, hashtag);
      if (validation.isNotValid) {
        return reply.status(404).html(<NotFound asset={asset} />);
      }

      const item = await hashtagService.getByTag(hashtag!);
      if (!item) {
        return reply.status(404).html(<NotFound asset={asset} />);
      }

      const [posts, report, lastMembers, bots] = await Promise.all([
        postService.getItemsByHashtag(item.id),
        hashtagService.getDailyReport(),
        userService.getLastMembers(),
        userService.getLastBots(),
      ]);

      postService.incViews(posts);

      return html(
        <TagsIndex
          {...base()}
          posts={posts}
          report={report}
          lastMembers={lastMembers}
          bots={bots}
          activeHashtag={`#${hashtag}`}
          csrfToken={reply.generateCsrf()}
        />,
      );
    },
  );
}
