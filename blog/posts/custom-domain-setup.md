---
title: How to Set Up a Custom Domain on Rawfeed
date: 2026-03-04
author: Özgür Adem Işıklı
excerpt: Rawfeed lets you serve your profile and feed from your own domain name. Here's a step-by-step guide to connecting a custom domain, verifying it with a DNS TXT record, and pointing it with a CNAME.
---

## What Custom Domains Give You

Every Rawfeed account is reachable at `{username}.rawfeed.social`. That works fine, but if you have your own domain — or want your feed to feel like a proper part of your personal site — you can point it directly at your Rawfeed profile.

Once set up, visiting `blog.example.com` (or whatever domain you choose) shows your full Rawfeed profile and RSS feed, exactly as it would appear on the main site.

The setup takes two DNS records and about five minutes of work. DNS propagation may add some waiting time, but the steps themselves are straightforward.

---

## Prerequisites

Before you begin, make sure you have:

- A Rawfeed account
- A domain name you control (a root domain like `example.com` or a subdomain like `feed.example.com`)
- Access to your domain registrar or DNS provider's control panel

---

## Step 1 — Open the Custom Domain Settings

Log in to Rawfeed and go to **Settings**. In the settings menu, find the **Custom Domain** option.

![Settings page showing the Custom Domain navigation item](/public/images/blog/01.png)

You'll land on the Custom Domain setup page, which explains the process and has a single input field for your domain name.

![Custom Domain setup page with domain input field](/public/images/blog/02.png)

---

## Step 2 — Enter Your Domain Name

Type your domain into the input field. Enter it without any protocol prefix — no `http://`, no `www`. Just the bare domain:

```
feed.example.com
```

or

```
example.com
```

Click **Continue**. Rawfeed will generate a unique verification token and save your domain as pending. You will be redirected to the verification page automatically.

---

## Step 3 — Add a DNS TXT Record

The verification page shows you the exact DNS record to add. It looks like this:

| Field | Value                                |
| ----- | ------------------------------------ |
| Type  | `TXT`                                |
| Name  | `_rawfeed.feed.example.com`          |
| Value | `rawfeed-verify-<your-unique-token>` |
| TTL   | `3600` (or your provider's default)  |

![Domain verification page showing the TXT record to add](/public/images/blog/03.png)

A few provider-specific notes:

- **Some providers only want the subdomain part** of the Name field. If your domain is `feed.example.com`, try `_rawfeed.feed` or just `_rawfeed` if the full form is rejected.
- **The Value must be copied exactly**, including the `rawfeed-verify-` prefix. Use the copy button next to the field to avoid typos.
- **TTL of 3600** (one hour) is fine. If your provider has a lower default, that works too.

Log in to your DNS provider's control panel and add the record. If you're not sure where to find this, look for "DNS Management", "Zone Editor", or "Advanced DNS" in your registrar's dashboard. Common providers:

- **Namecheap** — Advanced DNS tab on the domain
- **Cloudflare** — DNS → Records → Add record
- **GoDaddy** — My Products → DNS → Add
- **Google Domains / Squarespace Domains** — DNS → Resource records

---

## Step 4 — Verify the Domain

After adding the TXT record, go back to the Rawfeed verification page and click **Verify Domain**.

Rawfeed performs a live DNS lookup for `_rawfeed.{yourdomain}` and checks that your token is present. If it is, the domain status changes to **Verified**.

![Verify Domain button and success state with verified badge](/public/images/blog/04.png)

If verification fails, the page will show an error. The most common reasons:

- The TXT record hasn't propagated yet — wait 5–10 minutes and try again.
- The record name has a typo. Double-check that it starts with `_rawfeed.`.
- The value was copied with extra whitespace. Re-copy using the clipboard button.

DNS changes can technically take up to 48 hours to propagate worldwide, though in practice most providers update within minutes.

---

## Step 5 — Add a CNAME Record

Once your domain is verified, the page moves on to the final step: pointing your domain to Rawfeed with a CNAME record.

| Field | Value                            |
| ----- | -------------------------------- |
| Type  | `CNAME`                          |
| Name  | `feed.example.com` (your domain) |
| Value | `{username}.rawfeed.social`      |

Add this record in the same DNS control panel where you added the TXT record. Again, some providers only want the subdomain portion of the Name field — try `feed` instead of `feed.example.com` if the full form isn't accepted.

> **Important for root domains:** If you're pointing a root domain (e.g. `example.com` rather than `feed.example.com`), some DNS providers don't allow a CNAME on the root apex. In that case, look for an `ALIAS` or `ANAME` record type, which behaves the same way and works at the root.

---

## Step 6 — You're Done

That's it. Once the CNAME record propagates, anyone visiting your domain will see your Rawfeed profile — including your posts, your RSS feed, and your public profile data.

Your feed URL at the custom domain will be:

```
https://feed.example.com/u/{username}/rss
```

And your profile:

```
https://feed.example.com
```

Both will work exactly as they do on `{username}.rawfeed.social`.

---

## Removing a Custom Domain

If you ever want to disconnect your custom domain, go to **Settings → Custom Domain** and scroll to the bottom of the verification page. There's a **Remove Domain** link.

You'll be taken to a confirmation page that shows your current domain and status. To confirm removal, type your domain name exactly as shown and click **Remove Domain**.

![Domain removal confirmation page](/public/images/blog/05.png)

Removing the domain disconnects it immediately. Visitors using your custom domain will no longer reach your profile. If you want to reconnect the same domain later, you'll need to go through the full setup again — the verification token is regenerated each time.

---

## Summary

The full process in one place:

1. **Settings → Custom Domain** — enter your domain name and click Continue
2. **Add a TXT record** — Name: `_rawfeed.{yourdomain}`, Value: the token shown on screen
3. **Click Verify Domain** — wait for DNS propagation if needed
4. **Add a CNAME record** — point your domain to `{username}.rawfeed.social`
5. Done — your profile is live at your custom domain
