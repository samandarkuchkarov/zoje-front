const ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ZOJE_ASSET_URL ?? '/backend-assets';

export function backendAsset(path: string) {
  const normalized = path.replace(/^\/+/, '');

  if (ASSET_BASE_URL.startsWith('http://') || ASSET_BASE_URL.startsWith('https://')) {
    const base = ASSET_BASE_URL.endsWith('/')
      ? ASSET_BASE_URL
      : `${ASSET_BASE_URL}/`;
    return new URL(normalized, base).toString();
  }

  const base = ASSET_BASE_URL.endsWith('/')
    ? ASSET_BASE_URL
    : `${ASSET_BASE_URL}/`;
  return `${base}${normalized}`;
}
