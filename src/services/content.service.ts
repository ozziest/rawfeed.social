import { sanitize } from "../helpers/security";
import { ContentMap, HashtagMap, LinkMap, MentionMap } from "../types/shared";
import { nanoid } from "nanoid";
import userService from "./user.service";
import linkService from "./link.service";
import hashtagService from "./hashtag.service";
import { loggerAll } from "../helpers/common";

const toPostContent = async (content: string): Promise<ContentMap> => {
  content = sanitize(content);
  return {
    content,
    mentions: await resolveMentions(content),
    hashtags: await resolveHashtags(content),
    links: await resolveLinks(content),
  };
};

const resolveHashtags = async (content: string): Promise<HashtagMap[]> => {
  // Regular expression to find words starting with '#' and stop at the first non-alphanumeric character
  const regex = /(?:^|\s)#([\p{L}\p{N}_]+)(?=\s|$)/gu;

  // Create a Set to store unique hashtags
  const hashtags = new Set();

  let match;

  // Iterate through all matches
  while ((match = regex.exec(content)) !== null) {
    // Add the hashtag (without the #) to the Set
    hashtags.add(match[1]);
  }

  // Convert the Set to an array and return
  const map = Array.from(hashtags)
    .map((hashtag) => hashtag as string)
    .map((original) => {
      return {
        cleaned: original.trim().toLowerCase(),
      } as HashtagMap;
    });

  // We don't need to query tags ids if we have empty query
  if (map.length === 0) {
    return map;
  }

  const createdItems = await hashtagService.getUsedHashtags(
    map.map((item) => item.cleaned),
  );

  for (const item of map) {
    const found = createdItems.find(
      (record) =>
        normalizeString(record.hashtag) === normalizeString(item.cleaned),
    );

    if (found) {
      item.id = found.id;
    } else {
      item.id = await hashtagService.insert(item.cleaned);
    }
  }

  return map;
};

const resolveMentions = async (content: string): Promise<MentionMap[]> => {
  // Regular expression to match words starting with '@', containing alphanumeric characters and underscores
  // Username can only contain [a-zA-Z0-9_] but can be followed by punctuation like !,.,:; etc.
  const regex = /(?:^|\s)@([a-zA-Z0-9_]+)(?=\s|[!?.,:;\-]|$)/g;

  // Create a Set to store unique usernames
  let usernames = new Set<string>();

  let match;

  // Iterate through all matches
  while ((match = regex.exec(content)) !== null) {
    // Add the username (without the @) to the Set
    usernames.add(match[1]);
  }

  const users = await userService.getAllByUsernames(Array.from(usernames));

  return users.map((item) => {
    return {
      id: item.id,
      username: `@${item.username}`,
    } as MentionMap;
  });
};

const resolveLinks = async (content: string): Promise<LinkMap[]> => {
  // Regular expression to match common URL patterns
  const regex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

  // Create an array to store found links
  const links = [];

  let match;

  // Iterate through all matches
  while ((match = regex.exec(content)) !== null) {
    // Add the full match to the links array
    links.push(match[0]);
  }

  const map: LinkMap[] = links.map((link) => {
    return {
      link,
      uniqueId: nanoid(30),
    };
  });

  for (const item of map) {
    item.linkId = await linkService.insert(item.uniqueId, item.link);
  }

  return map;
};

const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export default loggerAll(
  {
    toPostContent,
  },
  "content.service",
);
