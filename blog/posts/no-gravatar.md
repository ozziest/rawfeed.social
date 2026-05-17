---
title: We Removed Gravatar
date: 2026-05-17
author: Özgür Adem Işıklı
excerpt: Rawfeed no longer uses Gravatar for profile pictures. Your email address is no longer hashed and sent to a third-party server just to show an avatar. Instead, we generate a simple initials badge from your name — entirely on our side, with no external requests.
---

## What Changed

Until now, Rawfeed used Gravatar to show profile pictures. Gravatar is a service run by Automattic. You give it your email address, it returns a profile photo. It works, and it's easy to integrate — which is why most apps use it.

But it comes with a cost that's easy to overlook.

## The Problem

Every time someone viewed a profile on Rawfeed, we sent a hashed version of that user's email address to Gravatar's servers in an image request. The hash was MD5, which is not a secure hashing algorithm. Given a known email address, reversing an MD5 hash is straightforward.

This means Gravatar could, in principle, link a request back to a specific user. A third party could observe that a particular email was active on Rawfeed, when their profile was viewed, and from which IP addresses. That's not acceptable for a platform that takes user privacy seriously.

## What We Do Instead

Profile pictures are now initials badges — a coloured circle with the first two letters of your name. "Özgür Adem" becomes "ÖA". "John" becomes "JO".

The colour is picked from a small set of flat tones based on your username, so it stays consistent. The whole thing is a plain HTML element. No image files, no external requests, no third-party servers involved.

It's simpler. It's faster. And it doesn't leak anything to anyone.

## What You Need to Do

Nothing. The change is already live. If you had a Gravatar set up, it will no longer appear on Rawfeed, but your account and all your content are unaffected.
