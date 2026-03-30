type ExternalLinkProps = {
  code: string;
  link: string;
};

export function ExternalLink({ code, link }: ExternalLinkProps) {
  const safeCode = encodeURIComponent(code);

  let displayText = link;
  try {
    const url = new URL(link);
    const domain = url.hostname.replace("www.", "");
    const path = url.pathname + url.search;
    if (link.length > 50) {
      displayText =
        path.length > 25
          ? `${domain}${path.substring(0, 22)}...`
          : `${domain}${path}`;
    }
  } catch {
    displayText = link.length > 50 ? link.substring(0, 47) + "..." : link;
  }

  return (
    <a
      href={`/redirect/${safeCode}`}
      target="_blank"
      rel="noopener noreferrer"
      class="relative z-10 transition-colors font-medium text-black dark:text-gray-200 hover:underline hover:text-gray-700 dark:hover:text-gray-400"
    >
      <span safe>{displayText}</span>
    </a>
  );
}
