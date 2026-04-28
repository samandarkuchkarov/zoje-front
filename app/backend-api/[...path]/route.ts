const BACKEND_URL = process.env.ZOJE_API_URL ?? 'http://87.106.190.187:11286';

type ApiRouteContext = {
  params: Promise<{ path: string[] }>;
};

const BODY_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function requestHeaders(headers: Headers) {
  const nextHeaders = new Headers(headers);
  nextHeaders.delete('host');
  nextHeaders.delete('content-length');
  nextHeaders.delete('connection');
  return nextHeaders;
}

function responseHeaders(headers: Headers) {
  const nextHeaders = new Headers(headers);
  nextHeaders.delete('content-encoding');
  nextHeaders.delete('content-length');
  nextHeaders.delete('connection');
  nextHeaders.set('cache-control', 'no-store');
  return nextHeaders;
}

async function proxy(request: Request, context: ApiRouteContext) {
  const { path } = await context.params;
  const target = new URL(`/${path.map(encodeURIComponent).join('/')}`, BACKEND_URL);
  target.search = new URL(request.url).search;

  const response = await fetch(target, {
    method: request.method,
    headers: requestHeaders(request.headers),
    body: BODY_METHODS.has(request.method) ? await request.arrayBuffer() : undefined,
    cache: 'no-store',
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders(response.headers),
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204 });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
