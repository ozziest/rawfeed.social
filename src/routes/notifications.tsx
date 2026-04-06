import { FastifyInstance } from "fastify";
import { useViews } from "../helpers/useViews";
import { verifyToken } from "../middleware/verifyToken";
import { requireAuth } from "../middleware/requireAuth";
import notificationService, {
  nextNotificationCursor,
} from "../services/notification.service";
import { NotificationsPage } from "../views/notifications/NotificationsPage";
import { NotificationsNext } from "../views/notifications/NotificationsNext";
import { sentryException } from "../sentry";

const useCtx = useViews();

export default async function notificationRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/notifications",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { html, base } = useCtx(request, reply);
      const userId = request.loggedUser!.userId;

      const notifications =
        await notificationService.getNotificationsForUser(userId);

      notificationService.markAllAsRead(userId).catch((error) => {
        sentryException(error);
      });

      return html(
        <NotificationsPage
          {...base()}
          notifications={notifications}
          nextCursor={nextNotificationCursor(notifications)}
        />,
      );
    },
  );

  fastify.get(
    "/notifications/next/:cursor",
    { preHandler: [verifyToken, requireAuth] },
    async (request, reply) => {
      const { cursor } = request.params as { cursor: string };
      const { html } = useCtx(request, reply);
      const userId = request.loggedUser!.userId;

      const notifications = await notificationService.getNotificationsForUser(
        userId,
        cursor,
      );

      return html(
        <NotificationsNext
          notifications={notifications}
          nextCursor={nextNotificationCursor(notifications)}
        />,
      );
    },
  );
}
