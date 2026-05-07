import type { Product, ProductCategory } from '@/types/product';

const API_URL = process.env.ZOJE_API_URL ?? 'http://87.106.190.187:11286';
const PUBLIC_ASSET_URL =
  process.env.NEXT_PUBLIC_ZOJE_ASSET_URL ?? '/backend-assets';

function publicAssetBase() {
  return PUBLIC_ASSET_URL.endsWith('/')
    ? PUBLIC_ASSET_URL
    : `${PUBLIC_ASSET_URL}/`;
}

function apiAssetBase() {
  return new URL('/assets/', API_URL).toString();
}

function rewriteAssetUrls(value: unknown): unknown {
  if (typeof value === 'string') {
    const backendAssets = apiAssetBase();
    if (!value.startsWith(backendAssets)) return value;
    return `${publicAssetBase()}${value.slice(backendAssets.length)}`;
  }

  if (Array.isArray(value)) return value.map(rewriteAssetUrls);

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, rewriteAssetUrls(item)])
    );
  }

  return value;
}

type ProductListParams = {
  category?: ProductCategory;
  featured?: boolean;
  inStock?: boolean;
  sort?: 'newest' | 'priceAsc' | 'priceDesc';
};

function buildApiUrl(path: string, params?: Record<string, string | boolean | undefined>) {
  const url = new URL(path, API_URL);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });
  return url.toString();
}

async function apiFetch<T>(path: string, params?: Record<string, string | boolean | undefined>): Promise<T> {
  const url = buildApiUrl(path, params);

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as T;
  return rewriteAssetUrls(data) as T;
}

export async function getProducts(params?: ProductListParams): Promise<Product[]> {
  return apiFetch<Product[]>('/api/products', params);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const url = buildApiUrl(`/api/products/${slug}`);

  const response = await fetch(url, {
    cache: 'no-store',
  });

  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as Product;
  return rewriteAssetUrls(data) as Product;
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  return getProducts({ category });
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts({ featured: true });
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await apiFetch<Product[]>(`/api/products/${product.slug}/related`);
  return products.slice(0, limit);
}

export async function getAllCategories(): Promise<ProductCategory[]> {
  return apiFetch<ProductCategory[]>('/api/categories');
}
