const ASSET_BASE_URL =
  process.env.NEXT_PUBLIC_ZOJE_ASSET_URL ?? 'http://localhost:4000/assets';

export function backendAsset(path: string) {
  const base = ASSET_BASE_URL.endsWith('/')
    ? ASSET_BASE_URL
    : `${ASSET_BASE_URL}/`;
  const normalized = path.replace(/^\/+/, '');
  return new URL(normalized, base).toString();
}
