import { asset } from "../../../helpers/asset";

type HeadProps = {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  isProd: boolean;
};

export function Head({
  title,
  description,
  keywords,
  canonical,
  isProd,
}: HeadProps) {
  return (
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title safe>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonical ? <link rel="canonical" href={canonical} /> : ""}
      <link
        rel="icon"
        type="image/svg+xml"
        href={asset("/public/favicon.svg")}
      />
      <link rel="stylesheet" href={asset("/public/css/tailwind.css")} />
      <script src={asset("/public/js/htmx.min.js")}></script>
      <script src={asset("/public/js/simple-cookie-banner.js")}></script>
      <script src={asset("/public/js/app.js")}></script>
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, noarchive" />
      <meta name="googlebot-news" content="nosnippet" />

      <meta property="og:site_name" content="rawfeed.social" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={
          title ||
          "Rawfeed - Chronological Microblogging Without Algorithmic Manipulation"
        }
      />
      <meta
        property="og:description"
        content={
          description ||
          "Open-source microblogging with chronological RSS feeds and no algorithmic manipulation."
        }
      />
      <meta property="og:image" content={asset("/public/images/og.png")} />
      <meta property="og:url" content={canonical || "https://rawfeed.social"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={
          title ||
          "Rawfeed - Chronological Microblogging Without Algorithmic Manipulation"
        }
      />
      <meta
        name="twitter:description"
        content={
          description ||
          "Open-source microblogging with chronological RSS feeds and no algorithmic manipulation."
        }
      />
      <meta name="twitter:image" content={asset("/public/images/og.png")} />

      {isProd ? (
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="b0b55b3f-3a08-4ddd-b775-348ea72445d6"
        ></script>
      ) : (
        ""
      )}
    </head>
  );
}
