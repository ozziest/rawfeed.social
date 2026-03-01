const assetBaseUrl = (process.env.ASSET_BASE_URL || "").replace(/\/$/, "");
const releaseVersion = process.env.RELEASE_VERSION || "";

export const asset = (path: string): string => {
  const url = `${assetBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  return releaseVersion
    ? `${url}?v=${encodeURIComponent(releaseVersion)}`
    : url;
};
