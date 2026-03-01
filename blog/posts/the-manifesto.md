---
title: The Manifesto
date: 2026-03-01
author: Özgür Adem Işıklı
excerpt: A precise account of why algorithmic control of social communication is structurally incompatible with user autonomy, and what Rawfeed proposes instead.
---

## I. The Follow Button Is Not a Subscription

The RSS protocol, formalised in the early 2000s, established a subscription model with a single property: the reader received every item a source published, in chronological order, without any intermediary deciding what to include or exclude. The relationship was direct. The subscriber declared an interest, and the source delivered its output. Nothing sat between them.

The social media platforms of the 2010s copied this model while replacing its technical foundation entirely. A user who follows an account on an algorithmically driven platform has not created a direct subscription. They have submitted a signal to a recommendation system. That system weighs this signal against hundreds of others, including browsing history, interaction patterns, the predicted engagement value of each post, and the commercial relationships of the platform, and constructs a feed that may include or exclude any given post from any followed account at its discretion. The follow button is not a subscription. It is a preference signal whose effect is controlled entirely by the platform.

## II. The Incentive Structure and Its Consequences

A platform funded by display advertising has a direct financial interest in maximising the time users spend on it. More time on-platform means more advertisement impressions, which means more revenue. This incentive exists independently of whether the content that maximises session duration is the content users would choose to receive if the choice were genuinely theirs. The optimisation target of an advertising-funded platform, namely session duration and return visit frequency, is not the same as the optimisation target of a user, which is access to content from sources they have chosen to follow. These two targets conflict directly, and when they do, the platform's revenue interest determines the outcome.

Research on algorithmic recommendation systems has consistently found that content which produces high engagement does not uniformly correlate with user-reported satisfaction or informational value. Content that provokes outrage, anxiety, and social comparison generates measurable interaction while correlating with decreased wellbeing. The feed is not malfunctioning when it shows you this content. It is performing correctly according to its actual design objective. The customisation tools platforms have introduced in response to user dissatisfaction, such as keyword muting, interest filters and optional chronological views, do not resolve this. They are each applied on top of an algorithmic selection layer that the user cannot disable. The platform retains unilateral authority to modify or remove any of these features, and the historical record shows that features reducing algorithmic engagement are routinely deprecated when they reduce platform-measured metrics.

A small number of privately held corporations now exercise effective editorial control over the content distribution infrastructure used by the majority of the world's internet users. They determine which content reaches large audiences and which is suppressed, whether by explicit removal, by shadowbanning, or by algorithmic deprioritisation. These decisions are made without democratic accountability, without legally mandated transparency, and subject to no consistent external review. The structural risk is not contingent on any specific abuse. It is constituted by the concentration itself, independent of the current intentions of those who hold it.

## III. The Principles of Rawfeed

Rawfeed is designed as a direct technical and organisational response to the problems described above. Its operation is governed by six principles.

**Chronological feed ordering.** Rawfeed applies a single ordering criterion: publication time, descending. No engagement weighting, no insertion of content from unfollowed accounts, and no suppression of content from followed accounts is performed. This is not a configurable option. It is the only mode the feed system operates in.

**Subscription fidelity.** When a user follows an account, every post that account publishes appears in the user's feed. There is no algorithmic gate between publication and delivery. The follow button does what users have historically understood it to mean.

**No advertising infrastructure.** Rawfeed does not sell access to user attention, does not build profiles for targeting purposes, and does not optimise feed content to generate advertisement impressions. The absence of an advertising revenue objective removes the structural incentive to optimise the feed against user preferences.

**Open-standard interoperability.** Every Rawfeed account publishes a corresponding RSS feed accessible by any reader without authentication. Content is not locked within the platform. Any user may export their complete data at any time and leave without losing their content or subscriber relationships.

**Open source code.** The complete source code is published under AGPL-3.0. Any modifications, including those deployed as a network service, must be made publicly available under the same terms. The platform's behaviour is auditable by anyone. Claims in this document about technical implementation are verifiable by reading the source code.

**Non-profit operational structure.** There are no equity shareholders whose financial interests constitute an optimisation target. Server costs are funded by the founder. Future funding decisions will be made openly, with community participation. A non-profit structure removes the primary institutional mechanism through which these principles have been violated in advertising-funded platforms: the obligation to increase shareholder value.

## IV. Status and Participation

Rawfeed is, as of March 2026, in active development and not yet released for general public use. This document is published before general release deliberately: the principles it articulates should be open to examination and challenge while the platform can still revise them without difficulty. Any person who disagrees with a principle stated here, or who identifies a structural inconsistency between a stated principle and the platform's actual implementation, is invited to raise that disagreement through the project's public issue tracker or discussion forums.

Contribution is welcome in all forms: code, design, documentation, testing, and substantive critique. The governing principle of the project is that correctness matters more than consistency for its own sake. A platform that revises its principles in response to evidence and argument is more trustworthy than one that does not.

_The Rawfeed source code is available at [github.com/ozziest/rawfeed.social](https://github.com/ozziest/rawfeed.social) under AGPL-3.0. Questions and contributions may be submitted through the project's GitHub repository._
