---
title: "Every Dollar We Spend, Publicly."
date: 2026-03-05
author: Özgür Adem Işıklı
excerpt: Rawfeed now has a public budget page. Here's why we built it, how it works, and what it actually costs to run an independent, non-profit social platform in 2026.
---

## The Honest Question Nobody Asks

When you sign up for a free service, there's usually an unspoken agreement you're not really aware of. The service is free because you — your attention, your behaviour, your data — are what's being monetised. That's not a conspiracy theory. It's just the prevailing business model.

Rawfeed doesn't do that. No ads, no data sales, no profiling. But that leaves an obvious question hanging in the air: _then how does it survive?_

Right now, honestly? Out of my own pocket.

That's fine — it's a small project and the costs are manageable. But I think you deserve to know that, explicitly, rather than having to guess or assume. So I built a [budget page](/budget).

---

## What the Budget Page Shows

The idea is simple. Every service Rawfeed depends on — the server, the domain, the email provider, storage — is listed with its cost, billing cycle, and a monthly and yearly equivalent. There's nothing hidden or rounded up.

![budget summary cards — Per Month, Per Year, Total Since Launch](/public/images/blog/budget/01.png)

At the top, three numbers summarise the whole picture: what it costs per month right now, what that works out to over a year, and the running total since the project launched in January 2026.

Below that, a table breaks it down line by line.

![budget table with services listed](/public/images/blog/budget/02.png)

Each row shows:

- The service name and what it's actually used for
- A category badge (Infrastructure, Storage, Communication, etc.)
- Whether it's billed monthly, yearly, or was a one-time cost
- The raw cost, plus monthly and yearly equivalents side by side

Free-tier services are listed too — not to pad the numbers, but because they could become paid services as usage grows, and I want you to know they exist.

---

## The Numbers Right Now

As of launch, the full monthly cost is around **$15–16/month**, which works out to roughly **$190/year**. The biggest line item is the server. Everything else is either free tier or a small S3 bill for data export storage.

That's it. One person, one server, one domain. Not a startup burning investor money. Not a corporation optimising for retention. Just a project trying to build something honest.

---

## Why "Total Since Launch" Is More Interesting Than It Sounds

Most budget pages just list current costs. I wanted the total to be accurate over time, not just a projection.

The problem is that costs change. If the server needs to be upgraded to handle more users, the monthly cost goes up — but everything before that upgrade happened at the old price. A naive calculation would just multiply the current price by the number of months, which would overstate past spending.

So the budget page supports **price history**. Each service can have a list of price changes, with the date each change took effect. The "Total Since Launch" figure walks through every month individually and uses the correct price for that period.

It's a small detail. But if I'm publishing a budget in the name of transparency, the numbers should actually be right.

---

## What Happens If Costs Grow?

If Rawfeed grows — and I hope it does — the costs will eventually exceed what one person can comfortably absorb indefinitely. When that happens, a few things could change:

**Non-invasive ads.** A small, non-personalised banner. No tracking, no profiles, no third-party networks. The kind of ad that was normal on the internet before surveillance advertising took over. This is the most likely path, if it happens at all.

**Voluntary support.** A way to chip in voluntarily if you find the project useful. No pressure, no paywalls, no premium tier.

**Nothing stays secret.** Whatever changes — it will be on the budget page first, in plain language, before it goes anywhere else.

I don't want to build a project and then surprise you with a revenue pivot. That's exactly the pattern Rawfeed exists to push back against.

---

## The Broader Point

There's a version of the internet where the tools you use every day are honest about how they work. Where "free" means someone is genuinely covering the costs, not quietly extracting value from you in ways you didn't agree to.

That version is harder to build and slower to scale. But it's worth building.

Publishing a budget is a small act. But it makes a real commitment: here is what we spend, here is what we earn (nothing, for now), and here is the gap. You can hold us to it.

The [budget page](/budget) updates automatically — whatever the current costs are, that's what you'll see.

---

_Have questions about how Rawfeed is funded, or want to contribute to the project? Head over to the [GitHub discussions](https://github.com/ozziest/rawfeed.social/discussions) — always happy to talk openly._
