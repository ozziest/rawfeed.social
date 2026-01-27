import Parser from "rss-parser";
import { DefaultRSSFeedItem, RSSSourceWithUser } from "../types/shared";
import crypto from "crypto";
import postService from "./post.service";

const parser = new Parser();

export class RSSService {
  async fetchFeed(source: RSSSourceWithUser) {
    try {
      const feed = await parser.parseURL(source.url);

      return {
        source,
        items: feed.items as Parser.Output<unknown>[],
        fetchedAt: new Date(),
      };
    } catch (error) {
      throw error;
    }
  }

  async processFeedItems(
    source: RSSSourceWithUser,
    items: Parser.Output<unknown>[],
  ) {
    for (const item of items) {
      const externalId = crypto
        .createHash("sha256")
        .update(`${source.username}:${item.link}`)
        .digest("hex");

      const data = item as DefaultRSSFeedItem;

      const createdAt = data.isoDate
        ? new Date(data.isoDate)
        : data.pubDate
          ? new Date(data.pubDate)
          : new Date();

      const post = await postService.getItemByExternalId(externalId);
      const content = `${item.title}\n\n${item.link}`;
      if (!post && source.uuid) {
        await postService.insert(
          source.uuid,
          {
            content,
            location: source.language,
          },
          externalId,
          createdAt,
        );
      }
    }
  }
}
