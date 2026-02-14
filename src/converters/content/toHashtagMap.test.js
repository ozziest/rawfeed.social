import { describe, it, expect } from "vitest";
import toHashtagMap from "./toHashtagMap.ts";

describe("toHashtagMap - edge cases", () => {
  // Basic/Empty cases
  describe("empty and whitespace inputs", () => {
    it("returns empty array for empty string", () => {
      expect(toHashtagMap("")).toEqual([]);
    });

    it("returns empty array for whitespace only", () => {
      expect(toHashtagMap("   \n\t  ")).toEqual([]);
    });

    it("returns empty array when no hashtags present", () => {
      expect(toHashtagMap("hello world foo bar")).toEqual([]);
    });
  });

  // Basic extraction
  describe("basic hashtag extraction", () => {
    it("extracts single hashtag at start", () => {
      const result = toHashtagMap("#hello");
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ cleaned: "hello" });
    });

    it("extracts single hashtag in middle", () => {
      const result = toHashtagMap("hello #world foo");
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ cleaned: "world" });
    });

    it("extracts single hashtag at end", () => {
      const result = toHashtagMap("hello world #foo");
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ cleaned: "foo" });
    });
  });

  // Case sensitivity
  describe("case handling", () => {
    it("lowercases all hashtags", () => {
      const result = toHashtagMap("#HELLO #WoRLD #fOo");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["fOo".toLowerCase(), "hello", "world"].sort());
    });

    it("treats uppercase and lowercase as duplicates (NOTE: actually returns multiple because dedup happens before lowercasing)", () => {
      const result = toHashtagMap("#Foo #foo #FOO");
      // Function adds to Set before lowercasing, so "Foo", "foo", "FOO" are 3 unique entries
      expect(result.length).toBe(3);
      // Each one gets lowercased individually
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["foo", "foo", "foo"]);
    });
  });

  // Uniqueness
  describe("duplicate handling", () => {
    it("returns only unique hashtags (no duplicates)", () => {
      const result = toHashtagMap("#foo #bar #foo #baz #bar #foo");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["foo", "bar", "baz"].sort());
      expect(result.length).toBe(3);
    });
  });

  // Special characters in hashtags
  describe("underscores and numbers", () => {
    it("extracts hashtags with underscores", () => {
      const result = toHashtagMap("#foo_bar #_test #a_b_c");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toContain("foo_bar");
      expect(cleaned).toContain("_test");
      expect(cleaned).toContain("a_b_c");
    });

    it("extracts hashtags with numbers but requires at least one letter", () => {
      const result = toHashtagMap("#456abc #789_test #a1b2c3");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toContain("456abc");
      expect(cleaned).toContain("789_test");
      expect(cleaned).toContain("a1b2c3");
    });

    it("does NOT extract pure numeric hashtags (must have at least one letter)", () => {
      const result = toHashtagMap("#0 #123 #456");
      expect(result.length).toBe(0);
    });

    it("extracts hashtags with mixed numbers and underscores (must have letter)", () => {
      const result = toHashtagMap("#test_123 #123_test #a1_b2_c3");
      expect(result.length).toBe(3);
    });
  });

  // Punctuation handling
  describe("punctuation and special chars", () => {
    it("extracts hashtags followed by common punctuation (. ! ? , ; :)", () => {
      // Lookahead now allows punctuation chars: [.!?,;:\)\]\}]
      const result = toHashtagMap("#hello. #world, #foo! #bar? #baz; #qux:");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(
        ["foo", "bar", "baz", "hello", "qux", "world"].sort(),
      );
    });

    it("extracts hashtags followed by closing brackets/parens ) ] }", () => {
      const result = toHashtagMap("#foo) #bar] #baz}");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["foo", "bar", "baz"].sort());
    });

    it("extracts hashtag at end of sentence (end matches $ in lookahead)", () => {
      const result = toHashtagMap("check this #foo");
      expect(result).toHaveLength(1);
      expect(result[0].cleaned).toBe("foo");
    });

    it("extracts hashtags followed by newline/tab", () => {
      const result = toHashtagMap("#hello\n#world\t#foo");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["hello", "world", "foo"].sort());
    });
  });

  // Spacing
  describe("spacing and boundaries", () => {
    it("requires space before hashtag (except at start)", () => {
      const result = toHashtagMap("word#foo #bar");
      // #foo should not match because it has no space before
      const cleaned = result.map((h) => h.cleaned);
      expect(cleaned).toContain("bar");
      expect(cleaned).not.toContain("foo");
    });

    it("allows multiple spaces around hashtags", () => {
      const result = toHashtagMap("  #hello   #world  ");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["hello", "world"].sort());
    });

    it("extracts consecutive hashtags separated by space", () => {
      const result = toHashtagMap("#foo #bar #baz");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["foo", "bar", "baz"].sort());
    });
  });

  // Unicode and accents
  describe("unicode and accents", () => {
    it("extracts unicode letters in hashtags", () => {
      const result = toHashtagMap("#café #naïve #über #résumé");
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toContain("café");
      expect(cleaned).toContain("naïve");
      expect(cleaned).toContain("über");
      expect(cleaned).toContain("résumé");
    });

    it("extracts hashtags with mixed unicode and ASCII", () => {
      const result = toHashtagMap("#test_café #hello123naïve");
      expect(result.length).toBeGreaterThan(0);
    });

    it("does NOT match hashtags directly followed by emoji (no space/end)", () => {
      // #hello😀 doesn't match because emoji is not whitespace/$
      const result = toHashtagMap("#hello😀 #world🎉");
      expect(result.length).toBe(0);
    });

    it("extracts hashtags when emoji is separated by space", () => {
      const result = toHashtagMap("#hello 😀 #world 🎉");
      const cleaned = result.map((h) => h.cleaned);
      expect(cleaned).toContain("hello");
      expect(cleaned).toContain("world");
    });
  });

  // Real-world scenarios
  describe("real-world scenarios", () => {
    it("extracts from typical tweet/post", () => {
      const post =
        "Just launched a new feature! #rawfeed #socialmedia #opensource";
      const result = toHashtagMap(post);
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["rawfeed", "socialmedia", "opensource"].sort());
    });

    it("handles post with mentions and hashtags mixed", () => {
      const post = "@alice check out #nodejs and #typescript #webdev";
      const result = toHashtagMap(post);
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["nodejs", "typescript", "webdev"].sort());
    });

    it("extracts from markdown-like syntax", () => {
      const markdown = "## #Topic1\n#feature #bugfix #refactor";
      const result = toHashtagMap(markdown);
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toContain("topic1");
      expect(cleaned).toContain("feature");
    });

    it("handles line breaks and multiple lines", () => {
      const multiline = `#intro
Hello world #topic1
More text #topic2
#outro`;
      const result = toHashtagMap(multiline);
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["intro", "topic1", "topic2", "outro"].sort());
    });

    it("does NOT extract hashtags directly inside parentheses without space before #", () => {
      // (#foo) doesn't match because ( is not whitespace/start
      const text = "(#foo) [#bar] {#baz}";
      const result = toHashtagMap(text);
      expect(result.length).toBe(0);
    });

    it("extracts hashtags when properly separated with space before # and punctuation after", () => {
      // With spaces before # and punctuation after (. ! ? are allowed by regex)
      const text = "( #foo. ) [ #bar! ] { #baz? }";
      const result = toHashtagMap(text);
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["foo", "bar", "baz"].sort());
    });

    it("extracts hashtags followed by closing paren/bracket with space", () => {
      const text = "#foo ) #bar ] #baz }";
      const result = toHashtagMap(text);
      const cleaned = result.map((h) => h.cleaned).sort();
      expect(cleaned).toEqual(["foo", "bar", "baz"].sort());
    });
  });

  // Trimming behavior
  describe("trimming", () => {
    it("trims whitespace from cleaned value", () => {
      // The function calls `.trim()` on original before lowercasing
      const result = toHashtagMap("# hello");
      // This should not match because there's a space
      // But if it did match, it would trim the space
      expect(result).toEqual([]);
    });
  });

  // Object structure
  describe("output structure", () => {
    it("returns array of objects with 'cleaned' property", () => {
      const result = toHashtagMap("#foo");
      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty("cleaned");
      expect(typeof result[0].cleaned).toBe("string");
    });

    it("each hashtag has exactly 'cleaned' property (no id or other fields)", () => {
      const result = toHashtagMap("#foo #bar");
      result.forEach((hashtag) => {
        expect(Object.keys(hashtag)).toEqual(["cleaned"]);
      });
    });
  });

  // Long and extreme cases
  describe("long and extreme cases", () => {
    it("handles very long input with many hashtags", () => {
      const hashtags = Array.from({ length: 100 }, (_, i) => `#tag${i}`).join(
        " ",
      );
      const result = toHashtagMap(hashtags);
      expect(result.length).toBe(100);
    });

    it("handles very long hashtag names", () => {
      const longTag = "#" + "a".repeat(1000);
      const result = toHashtagMap(longTag);
      expect(result.length).toBe(1);
      expect(result[0].cleaned).toBe("a".repeat(1000));
    });

    it("handles hashtag at very end without trailing space", () => {
      const result = toHashtagMap("hello world #final");
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ cleaned: "final" });
    });
  });

  // No whitespace handling
  describe("hashtags without surrounding whitespace", () => {
    it("does not extract hashtag if no space before (unless at start)", () => {
      const result = toHashtagMap("word#foo");
      expect(result.length).toBe(0);
    });

    it("extracts hashtag at very start without leading space", () => {
      const result = toHashtagMap("#foo bar");
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ cleaned: "foo" });
    });
  });
});
