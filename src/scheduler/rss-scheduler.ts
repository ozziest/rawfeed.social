import { Cron } from "croner";
import { RSSService } from "../services/rss.service";
import { RSS_RESOURCES } from "../rssResources";
import { logError } from "../helpers/common";
import userService from "../services/user.service";
import { RSSSourceWithUser } from "../types/shared";

const rssService = new RSSService();

export async function initializeRSSScheduler(isDevelopment: boolean) {
  const resources: RSSSourceWithUser[] = [...RSS_RESOURCES];

  for (const source of resources) {
    try {
      const user = await userService.createRSSBot(source);
      source.uuid = user?.id;
    } catch (error) {
      logError(error as Error, {
        username: source.username,
        feedUrl: source.url,
        tags: { module: "rss", action: "create_bot_user" },
      });
    }
  }

  for (const source of resources) {
    new Cron(source.updateFrequency, async () => {
      try {
        const result = await rssService.fetchFeed(source);
        await rssService.processFeedItems(source, result.items);
      } catch (error) {
        logError(error);
      }
    });

    if (source.useInDevelopment) {
      rssService
        .fetchFeed(source)
        .then((result) => rssService.processFeedItems(source, result.items))
        .catch(logError);
    }
  }

  console.log("[RSS Scheduler] All jobs scheduled");
}
