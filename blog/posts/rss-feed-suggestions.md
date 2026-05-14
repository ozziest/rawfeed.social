---
title: You Can Now Suggest RSS Feeds
date: 2026-04-12
author: Özgür Adem Işıklı
excerpt: Rawfeed has RSS bot accounts that post content from RSS feeds directly into your timeline. Until now, only admins could add them. That changes today. Anyone can suggest a feed for review.
---

Rawfeed has RSS bot accounts that automatically post from RSS feeds. Until now, only admins could add them. That felt wrong.

Today we're launching **RSS feed suggestions**. Any logged-in user can submit a feed for review.

You go to [/rss/suggest](/rss/suggest), paste in a feed URL, pick a language, and submit. That's the core of it.

![The suggestion form showing a URL input field and language selector](/public/images/blog/rss-suggestion/01.png)

Before submitting, you confirm you've read the relevant policies: [Terms of Service](/legal/terms), [Data Processing Agreement](/legal/dpa), [Bots & Automation Policy](/legal/bots), and [Copyright Policy](/legal/dmca).

## What We Won't Accept

The form has a collapsible section listing every reason a suggestion can be rejected. Here's the full list:

**Copyright and content ownership**

- **Pirated or copyright-infringing content**: feeds that republish someone else's work without permission.
- **Full-text republished content**: feeds that scrape and repost full articles from other sources without adding anything.

**Safety and harm**

- **Adult or pornographic content**: Rawfeed is not an adult platform.
- **Child exploitation material**: immediate rejection, no exceptions.
- **Violence and gore**: gratuitous violent or graphic content.
- **Self-harm and pro-eating-disorder content**: content that promotes or glorifies self-harm.
- **Terrorism and extremism**: content promoting or glorifying violent extremism.

**Hate and abuse**

- **Hate speech and discrimination**: content targeting people based on race, religion, gender, sexuality, or similar characteristics.
- **Harassment and doxxing**: feeds dedicated to targeting or exposing individuals.

**Deception and manipulation**

- **Deceptive or impersonating feeds**: feeds pretending to be someone they are not.
- **Misinformation and conspiracy theories**: content that deliberately spreads false information.
- **Spam or low-quality content**: feeds with little to no real editorial content.

**Legal and technical**

- **Malware and phishing**: feeds carrying malicious links or deceptive content designed to steal data.
- **Illegal goods and services**: anything promoting or facilitating illegal activity.
- **Gambling promotion**: feeds primarily dedicated to gambling or betting.
- **Private or login-walled feeds**: feeds that require authentication to access. Our bots need to fetch content openly.
- **Broken or inactive feeds**: feeds that haven't published anything in a long time or that fail to parse.
- **Duplicate feeds**: feeds that already exist on Rawfeed under a different bot account.

This list is what our admins actually use when rejecting a submission. The same list you see on the form is the same list they pick from during review.

**A note on responsibility.** When you submit a feed, you take on some of that responsibility. Admins review every suggestion carefully. But they can't catch everything, especially content that changes over time. If you knowingly submit a feed that violates these rules, your account may be suspended. We want Rawfeed to serve people acting in good faith.

Acceptance is also not permanent. Rawfeed reserves the right to reject any submission and to remove any existing RSS bot account at any time if:

- the feed starts violating these rules
- the content quality drops significantly
- it no longer fits the platform

No feed is guaranteed a permanent spot just because it was accepted once.

## What Happens After You Submit

You'll get a confirmation message. Your suggestion goes into a review queue.

The admins review it. They check the content, the posting frequency, and the language. They also parse the feed to make sure it works.

If it's accepted, a bot account gets created. You'll receive an email confirming it. The bot starts appearing in the Explore section and can be followed like any other account.

If it's rejected, you'll receive an email explaining why. The reason will be specific instead of just "doesn't meet our standards".

We aim to review within a few days.

## How We Handle robots.txt

One of the first things checked during review is `robots.txt`. Rawfeed fetches all RSS content using the User-Agent `RawfeedBot`. Before pulling any data from a source, the bot checks whether `RawfeedBot` — or crawlers in general — are allowed by the site's `robots.txt` file. If the site blocks us, we don't fetch anything. The bot won't be created, and the suggestion will be rejected.

This check doesn't only happen at review time. `robots.txt` is checked every time the bot fetches new content. If a site owner adds a rule that blocks `RawfeedBot` after a feed has been accepted, fetching stops immediately. We don't override it, work around it, or wait for someone to notice. The feed goes dark until the restriction is lifted.

We respect what RSS owners want. Always. If they don't want their content fetched by us, we honor that. No exceptions.

**If you own an RSS feed and want to block Rawfeed**, add this to your `robots.txt`:

```
User-Agent: RawfeedBot
Disallow: /
```

That's it. The next time our bot tries to fetch your feed, it will see that rule and stop. If a bot account already exists for your feed, fetching will halt and the bot will go silent. You don't need to contact us.

## What Data We Actually Fetch

When `RawfeedBot` reads a feed, it stores two things: the **title** and the **link**.

That's it. No full article content. No images. No author details. No summaries. No AI training. No using your content to make money. Just a title and a URL that points back to your site.

The reasons are straightforward:

- It sends traffic to the original source. People click the link and read the article on your site.
- It lets Rawfeed users discover different sources from one place.
- It lets users reshare and discuss articles the same way someone would share a link in a conversation.

Rawfeed doesn't run on ads or sell user data. There is no business model built around your content.

We believe fetching a title and a link from a publicly available RSS feed is a reasonable and respectful use of the format. RSS feeds are designed to be read by software, that's the whole point. But we also understand that not everyone agrees, and we respect that.

If you own a feed and have an objection to how we use it, you can reach us at [hello@rawfeed.social](mailto:hello@rawfeed.social). You can also read our [Copyright Policy](/legal/dmca) for more detail on how we handle takedown requests.

## Why This Matters for the Open Web

RSS is one of the few remaining pieces of open web infrastructure that actually works. It's decentralized. No single company owns it. Any feed you subscribe to, you receive directly. No algorithm between you and the source.

Adding more RSS feeds to Rawfeed isn't just a feature. It's a small act of expanding what's available on an open, chronological timeline.

Every feed someone suggests and gets accepted means one more source of content that reaches people through direct subscription instead of through a recommendation engine.

If you know a feed that deserves to be here, submit it. We'll review it and tell you what we decided, either way.

## Suggest a Feed

Know a great feed that should be on Rawfeed? [Suggest it here](/rss/suggest). It takes less than a minute. Or [browse](/explore/bots) what's already available to see what others have added.
