import Parser from "rss-parser";
import robotsParser from "robots-parser";
import { DefaultRSSFeedItem, RSSSourceWithUser } from "../types/shared";
import crypto from "crypto";
import postService from "./post.service";
import { sentryException } from "../sentry";

const parser = new Parser({
  headers: { "User-Agent": "RawfeedBot" },
});

export class RSSService {
  private async isAllowedByRobots(feedUrl: string): Promise<boolean> {
    try {
      const { origin } = new URL(feedUrl);
      const robotsUrl = `${origin}/robots.txt`;
      const response = await fetch(robotsUrl, {
        headers: { "User-Agent": "RawfeedBot" },
        signal: AbortSignal.timeout(5_000),
      });
      if (!response.ok) {
        return true;
      }
      const text = await response.text();
      const robots = robotsParser(robotsUrl, text);
      return robots.isAllowed(feedUrl, "RawfeedBot") !== false;
    } catch {
      return true;
    }
  }

  async fetchFeed(source: RSSSourceWithUser) {
    try {
      const allowed = await this.isAllowedByRobots(source.url);
      if (!allowed) {
        throw new Error(
          `RawfeedBot is disallowed by robots.txt for ${source.url}`,
        );
      }

      const feed = await parser.parseURL(source.url);

      return {
        source,
        items: feed.items as Parser.Output<unknown>[],
        fetchedAt: new Date(),
      };
    } catch (error) {
      sentryException(error);
      throw error;
    }
  }

  async processFeedItems(
    source: RSSSourceWithUser,
    items: Parser.Output<unknown>[],
  ) {
    if (items.length === 0 || !source.uuid) {
      return;
    }

    // Build externalId map for all items in one batch query
    const itemMap = new Map<
      string,
      { item: Parser.Output<unknown>; createdAt: Date }
    >();
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
      itemMap.set(externalId, { item, createdAt });
    }

    // Single query to find which externalIds already exist
    const existingIds = await postService.getExternalIdSet([...itemMap.keys()]);

    for (const [externalId, { item, createdAt }] of itemMap) {
      if (existingIds.has(externalId)) {
        continue;
      }
      const content = `${item.title}\n\n${item.link}`;
      await postService.insert(
        source.uuid,
        { content, location: source.language },
        externalId,
        createdAt,
      );
    }
  }
}
