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
      {/* ...existing code... */}
    </head>
  );
}
