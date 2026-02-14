import { describe, it, expect } from "vitest";
import { nextCursor, toISO } from "./common";
import { POST_SIZE } from "../consts";

describe("nextCursor", () => {
  it("returns null when there are fewer posts than POST_SIZE", () => {
    const posts = [
      { id: 1, created_at: new Date().toISOString() },
      { id: 2, created_at: new Date().toISOString() },
    ];

    expect(nextCursor(posts as any)).toBeNull();
  });

  it("returns a cursor string when posts length equals POST_SIZE", () => {
    const now = Date.now();
    const posts = Array.from({ length: POST_SIZE }, (_, i) => ({
      id: i + 1,
      created_at: new Date(now - (POST_SIZE - i) * 1000).toISOString(),
    }));

    const cursor = nextCursor(posts as any);
    expect(typeof cursor).toBe("string");
    expect(cursor).toMatch(/_[0-9]+$/);
  });
});

describe("toISO", () => {
  it("converts a date string to ISO format", () => {
    expect(toISO("2020-01-01")).toBe("2020-01-01T00:00:00.000Z");
  });
});
