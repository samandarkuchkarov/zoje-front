import type { Product, ProductCategory } from '@/types/product';

const API_URL = process.env.ZOJE_API_URL ?? 'http://localhost:4000';

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
  console.log(`[zoje frontend] fetch ${url}`);

  const response = await fetch(url, {
    cache: 'no-store',
  });

  console.log(`[zoje frontend] response ${response.status} ${url}`);

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as T;
  console.log('[zoje frontend] result', data);
  return data;
}

export async function getProducts(params?: ProductListParams): Promise<Product[]> {
  return apiFetch<Product[]>('/api/products', params);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const url = buildApiUrl(`/api/products/${slug}`);
  console.log(`[zoje frontend] fetch ${url}`);

  const response = await fetch(url, {
    cache: 'no-store',
  });

  console.log(`[zoje frontend] response ${response.status} ${url}`);

  if (response.status === 404) return undefined;
  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as Product;
  console.log('[zoje frontend] result', data);
  return data;
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
