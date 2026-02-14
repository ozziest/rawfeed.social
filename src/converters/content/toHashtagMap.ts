import { HashtagMap } from "../../types/shared";

export default (content: string): HashtagMap[] => {
  // Regular expression to find words starting with '#' and stop at the first non-alphanumeric character
  // Must include at least one letter (?=[\p{L}\p{N}_]*[\p{L}] ensures at least one \p{L} exists)
  // Allows ending punctuation: . ! ? , ; : ) ] }
  const regex =
    /(?:^|\s)#(?=[\p{L}\p{N}_]*[\p{L}])([\p{L}\p{N}_]+)(?=\s|$|[.!?,;:\)\]\}])/gu;

  // Create a Set to store unique hashtags
  const hashtags = new Set();

  let match;

  // Iterate through all matches
  while ((match = regex.exec(content)) !== null) {
    // Add the hashtag (without the #) to the Set
    hashtags.add(match[1]);
  }

  // Convert the Set to an array and return
  return Array.from(hashtags)
    .map((hashtag) => hashtag as string)
    .map((original) => {
      return {
        cleaned: original.trim().toLowerCase(),
      } as HashtagMap;
    });
};
