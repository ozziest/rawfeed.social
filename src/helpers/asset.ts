const assetBaseUrl = (process.env.ASSET_BASE_URL || "").replace(/\/$/, "");

export const asset = (path: string): string =>
  `${assetBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
