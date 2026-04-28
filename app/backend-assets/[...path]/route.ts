const BACKEND_URL = process.env.ZOJE_API_URL ?? 'http://87.106.190.187:11286';

type AssetRouteContext = {
  params: Promise<{ path: string[] }>;
};

function responseHeaders(headers: Headers) {
  const nextHeaders = new Headers(headers);
  nextHeaders.delete('content-encoding');
  nextHeaders.delete('content-length');
  nextHeaders.delete('connection');
  nextHeaders.set('cache-control', 'public, max-age=31536000, immutable');
  return nextHeaders;
}

export async function GET(request: Request, context: AssetRouteContext) {
  const { path } = await context.params;
  const target = new URL(`/assets/${path.map(encodeURIComponent).join('/')}`, BACKEND_URL);
  target.search = new URL(request.url).search;

  const response = await fetch(target, {
    cache: 'force-cache',
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders(response.headers),
  });
}
