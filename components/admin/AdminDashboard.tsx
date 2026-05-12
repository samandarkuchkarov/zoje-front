'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import type { Product, ProductCategory } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const DEFAULT_API_URL = '/backend-api';
const CONFIGURED_API_URL =
  process.env.NEXT_PUBLIC_ZOJE_API_URL ?? DEFAULT_API_URL;

function apiUrl() {
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    CONFIGURED_API_URL.startsWith('http://')
  ) {
    return DEFAULT_API_URL;
  }

  return CONFIGURED_API_URL.endsWith('/')
    ? CONFIGURED_API_URL.slice(0, -1)
    : CONFIGURED_API_URL;
}

function apiPath(path: string) {
  return `${apiUrl()}${path}`;
}

const categories: ProductCategory[] = [
  'industrial',
  'overlock',
  'pattern',
  'specialty',
  'spare-parts',
  'accessories',
];

const categoryLabels: Record<ProductCategory, string> = {
  industrial: "To'g'ri chok",
  overlock: 'Overlok',
  buttonhole: 'Mahsus mashinalar',
  bartack: 'Mahsus mashinalar',
  pattern: 'Rashma',
  embroidery: 'Mahsus mashinalar',
  'heavy-duty': 'Mahsus mashinalar',
  domestic: 'Mahsus mashinalar',
  specialty: 'Mahsus mashinalar',
  'spare-parts': 'Ehtiyot qisimlar',
  accessories: 'Aksessuarlar',
};

type AdminSession = {
  token: string;
  email: string;
};

type ProductForm = {
  model: string;
  category: ProductCategory;
  price: string;
  oldPrice: string;
  inStock: boolean;
  featured: boolean;
  hidden: boolean;
  nameUz: string;
  nameRu: string;
  shortUz: string;
  shortRu: string;
  descriptionUz: string;
  descriptionRu: string;
  images: string[];
  videoUrls: string;
  specs: Record<string, string>;
};

type AdminProductPayload = Omit<Product, 'id'> & { id?: string };

type ImageUploadResponse = {
  images: string[];
};

class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const emptyForm: ProductForm = {
  model: '',
  category: 'industrial',
  price: '0',
  oldPrice: '',
  inStock: true,
  featured: false,
  hidden: false,
  nameUz: '',
  nameRu: '',
  shortUz: '',
  shortRu: '',
  descriptionUz: '',
  descriptionRu: '',
  images: [],
  videoUrls: '',
  specs: {},
};

const specFields = [
  { key: 'maxSpeed', label: 'Maksimal tezlik' },
  { key: 'stitchLength', label: 'Tikish uzunligi' },
  { key: 'needleSystem', label: 'Igna tizimi' },
  { key: 'presserFoot', label: 'Bosuvchi oyoq' },
  { key: 'voltage', label: 'Kuchlanish' },
  { key: 'motor', label: 'Motor' },
  { key: 'stitchType', label: 'Tikish turi' },
  { key: 'needleCount', label: 'Igna soni' },
  { key: 'maxThickness', label: 'Maksimal qalinlik' },
  { key: 'differential', label: 'Differensial' },
  { key: 'lubrication', label: 'Moylash' },
  { key: 'workingArea', label: 'Ish maydoni' },
  { key: 'patternStorage', label: 'Naqsh xotirasi' },
  { key: 'headRotation', label: 'Bosh aylanishi' },
  { key: 'positioning', label: 'Pozitsiyalash' },
  { key: 'cuttingArea', label: 'Kesish maydoni' },
  { key: 'heads', label: 'Boshlar soni' },
  { key: 'fileFormats', label: 'Fayl formatlari' },
  { key: 'application', label: "Qo'llanish sohasi" },
  { key: 'weight', label: 'Vazn' },
];

function lines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function slugFromForm(form: ProductForm) {
  return slugify(form.model || form.nameUz || form.nameRu) || `product-${Date.now()}`;
}

function productToForm(product: Product): ProductForm {
  return {
    model: product.model,
    category: product.category,
    price: String(product.price),
    oldPrice: product.oldPrice ? String(product.oldPrice) : '',
    inStock: product.inStock,
    featured: Boolean(product.featured),
    hidden: Boolean(product.hidden),
    nameUz: product.name.uz,
    nameRu: product.name.ru,
    shortUz: product.shortDescription.uz,
    shortRu: product.shortDescription.ru,
    descriptionUz: product.description.uz,
    descriptionRu: product.description.ru,
    images: product.images,
    videoUrls: (product.videoUrls ?? []).join('\n'),
    specs: Object.fromEntries(
      Object.entries(product.specs ?? {}).flatMap(
        ([key, value]) => (typeof value === 'string' ? [[key, value]] : [])
      )
    ) as Record<string, string>,
  };
}

function formSpecsToProductSpecs(specs: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(specs)
      .map(([key, value]) => [key, value.trim()])
      .filter(([, value]) => value)
  ) as Product['specs'];
}

function formToProduct(
  form: ProductForm,
  source: Product | undefined,
  sortOrder: number
): AdminProductPayload {
  return {
    placeholder: source?.placeholder,
    officialUrl: source?.officialUrl,
    manuals: source?.manuals,
    supportMaterialUrl: source?.supportMaterialUrl,
    officialDescriptionRu: source?.officialDescriptionRu,
    officialParameters: source?.officialParameters,
    ...(source?.id ? { id: source.id } : {}),
    slug: source?.slug ?? slugFromForm(form),
    model: form.model.trim(),
    category: form.category,
    price: Number(form.price) || 0,
    oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
    sortOrder,
    inStock: form.inStock,
    featured: form.featured,
    hidden: form.hidden,
    name: { uz: form.nameUz.trim(), ru: form.nameRu.trim() },
    shortDescription: { uz: form.shortUz.trim(), ru: form.shortRu.trim() },
    description: {
      uz: form.descriptionUz.trim(),
      ru: form.descriptionRu.trim(),
    },
    images: form.images,
    videoUrls: lines(form.videoUrls),
    specs: formSpecsToProductSpecs(form.specs),
  };
}

async function request<T>(path: string, options: RequestInit = {}, token?: string) {
  const response = await fetch(apiPath(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = (await response.json()) as T;
  if (!response.ok) {
    throw new ApiError(
      response.status,
      (data as { error?: string }).error ?? "So'rov bajarilmadi"
    );
  }
  return data;
}

async function uploadProductImages(files: FileList, token: string) {
  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('images', file));

  const response = await fetch(apiPath('/api/admin/uploads/images'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  const data = (await response.json()) as ImageUploadResponse | { error?: string };
  if (!response.ok) {
    throw new ApiError(
      response.status,
      ('error' in data && data.error) || 'Rasm yuklashda xatolik'
    );
  }
  return (data as ImageUploadResponse).images;
}

export function AdminDashboard() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [email, setEmail] = useState('samandar8939522@gmail.com');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const selectedSlugRef = useRef<string | null>(null);

  const selectedProduct = useMemo(
    () => products.find((product) => product.slug === selectedSlug),
    [products, selectedSlug]
  );

  const selectProduct = useCallback((product: Product) => {
    selectedSlugRef.current = product.slug;
    setSelectedSlug(product.slug);
    setForm(productToForm(product));
  }, []);

  const logout = useCallback((nextMessage = 'Sessiya tugadi. Qayta kiring.') => {
    localStorage.removeItem('zoje-admin');
    selectedSlugRef.current = null;
    setSession(null);
    setProducts([]);
    setSelectedSlug(null);
    setForm(emptyForm);
    setPassword('');
    setMessage(nextMessage);
  }, []);

  const loadProducts = useCallback(
    async (token: string) => {
      setLoading(true);
      try {
        const nextProducts = await request<Product[]>('/api/admin/products', {}, token);
        setProducts(nextProducts);
        if (!selectedSlugRef.current && nextProducts[0]) selectProduct(nextProducts[0]);
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          logout();
          return;
        }
        setMessage(error instanceof Error ? error.message : 'Mahsulotlar yuklanmadi');
      } finally {
        setLoading(false);
      }
    },
    [logout, selectProduct]
  );

  useEffect(() => {
    queueMicrotask(() => {
      const raw = localStorage.getItem('zoje-admin');
      if (!raw) return;

      try {
        const restoredSession = JSON.parse(raw) as AdminSession;
        setSession(restoredSession);
        void loadProducts(restoredSession.token);
      } catch {
        localStorage.removeItem('zoje-admin');
      }
    });
  }, [loadProducts]);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    setMessage('');
    try {
      const nextSession = await request<AdminSession>('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('zoje-admin', JSON.stringify(nextSession));
      setSession(nextSession);
      await loadProducts(nextSession.token);
    } catch (error) {
      setMessage(
        error instanceof ApiError && error.status === 401
          ? "Email yoki parol noto'g'ri"
          : error instanceof Error
            ? error.message
            : 'Kirishda xatolik'
      );
    }
  }

  async function saveProduct(event: React.FormEvent) {
    event.preventDefault();
    if (!session) return;
    setMessage('');
    try {
      const isNew = !selectedProduct;
      const product = formToProduct(
        form,
        selectedProduct,
        selectedProduct?.sortOrder ?? products.length + 1
      );
      const saved = await request<Product>(
        isNew ? '/api/admin/products' : `/api/admin/products/${selectedProduct.slug}`,
        {
          method: isNew ? 'POST' : 'PUT',
          body: JSON.stringify(product),
        },
        session.token
      );
      setMessage(`${saved.model} saqlandi`);
      selectProduct(saved);
      await loadProducts(session.token);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
        return;
      }
      setMessage(error instanceof Error ? error.message : 'Saqlashda xatolik');
    }
  }

  async function moveProduct(index: number, direction: -1 | 1) {
    if (!session) return;
    const next = [...products];
    const target = index + direction;
    if (!next[index] || !next[target]) return;
    [next[index], next[target]] = [next[target], next[index]];
    const items = next.map((product, i) => ({
      slug: product.slug,
      sortOrder: i + 1,
    }));
    setProducts(next.map((product, i) => ({ ...product, sortOrder: i + 1 })));
    try {
      await request<Product[]>(
        '/api/admin/product-order',
        {
          method: 'PUT',
          body: JSON.stringify({ items }),
        },
        session.token
      );
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
        return;
      }
      setMessage(error instanceof Error ? error.message : "Tartibni o'zgartirishda xatolik");
    }
  }

  function newProduct() {
    selectedSlugRef.current = null;
    setSelectedSlug(null);
    setForm(emptyForm);
  }

  async function uploadImages(files: FileList | null) {
    if (!session || !files?.length) return;
    setUploadingImages(true);
    setMessage('');
    try {
      const images = await uploadProductImages(files, session.token);
      setForm((current) => ({
        ...current,
        images: [...current.images, ...images],
      }));
      setMessage(`${images.length} ta rasm yuklandi`);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        logout();
        return;
      }
      setMessage(error instanceof Error ? error.message : 'Rasm yuklashda xatolik');
    } finally {
      setUploadingImages(false);
    }
  }

  function removeImage(image: string) {
    setForm((current) => ({
      ...current,
      images: current.images.filter((item) => item !== image),
    }));
  }

  function updateSpec(key: string, value: string) {
    setForm((current) => ({
      ...current,
      specs: {
        ...current.specs,
        [key]: value,
      },
    }));
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-muted/40 px-4 py-10">
        <form
          onSubmit={login}
          className="mx-auto max-w-sm rounded-xl border border-border bg-white p-6 shadow-sm"
        >
          <h1 className="font-heading text-2xl font-extrabold">Admin kirish</h1>
          <div className="mt-6 space-y-4">
            <div>
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Parol</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {message && <p className="text-sm text-destructive">{message}</p>}
            <Button type="submit" className="w-full bg-brand hover:bg-brand-deep">
              Kirish
            </Button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-heading text-2xl font-extrabold">Mahsulotlar admini</h1>
            <p className="text-sm text-muted-foreground">{session.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={newProduct}>Mahsulot qo&apos;shish</Button>
            <Button
              variant="outline"
              onClick={() => logout('')}
            >
              Chiqish
            </Button>
          </div>
        </div>

        {message && (
          <div className="mb-4 rounded-lg border border-border bg-white px-4 py-3 text-sm">
            {message}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-[420px_1fr]">
          <section className="rounded-xl border border-border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="font-semibold">Barcha mahsulotlar</h2>
              <Badge variant="secondary">{loading ? 'Yuklanmoqda' : products.length}</Badge>
            </div>
            <div className="max-h-[72vh] overflow-auto">
              {products.map((product, index) => (
                <div
                  key={product.slug}
                  className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-muted ${
                    product.slug === selectedSlug ? 'bg-brand-light' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => selectProduct(product)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.model}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{product.model}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {categoryLabels[product.category]}
                      </p>
                      {product.hidden && (
                        <Badge variant="outline" className="mt-1">
                          Yashirilgan
                        </Badge>
                      )}
                    </div>
                  </button>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={index === 0}
                      onClick={(event) => {
                        event.stopPropagation();
                        void moveProduct(index, -1);
                      }}
                    >
                      Yuqoriga
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={index === products.length - 1}
                      onClick={(event) => {
                        event.stopPropagation();
                        void moveProduct(index, 1);
                      }}
                    >
                      Pastga
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <form onSubmit={saveProduct} className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Model"><Input required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} /></Field>
              <Field label="Kategoriya">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                  className="h-8 w-full rounded-lg border border-input bg-white px-2.5 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{categoryLabels[category]}</option>
                  ))}
                </select>
              </Field>
              <Field label="Narx"><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></Field>
              <Field label="Eski narx"><Input type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} /></Field>
              <div className="flex items-end gap-5">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={form.inStock} onCheckedChange={(checked) => setForm({ ...form, inStock: checked === true })} />
                  Omborda bor
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={form.featured} onCheckedChange={(checked) => setForm({ ...form, featured: checked === true })} />
                  Tavsiya etilgan
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={form.hidden} onCheckedChange={(checked) => setForm({ ...form, hidden: checked === true })} />
                  Saytda yashirish
                </label>
              </div>
              <Field label="Nomi (UZ)"><Input required value={form.nameUz} onChange={(e) => setForm({ ...form, nameUz: e.target.value })} /></Field>
              <Field label="Nomi (RU)"><Input required value={form.nameRu} onChange={(e) => setForm({ ...form, nameRu: e.target.value })} /></Field>
              <Field label="Qisqa ta&apos;rif (UZ)"><Textarea value={form.shortUz} onChange={(e) => setForm({ ...form, shortUz: e.target.value })} /></Field>
              <Field label="Qisqa ta&apos;rif (RU)"><Textarea value={form.shortRu} onChange={(e) => setForm({ ...form, shortRu: e.target.value })} /></Field>
              <Field label="Tavsif (UZ)"><Textarea rows={5} value={form.descriptionUz} onChange={(e) => setForm({ ...form, descriptionUz: e.target.value })} /></Field>
              <Field label="Tavsif (RU)"><Textarea rows={5} value={form.descriptionRu} onChange={(e) => setForm({ ...form, descriptionRu: e.target.value })} /></Field>
              <div className="md:col-span-2">
                <Field label="Rasmlar">
                  <div className="space-y-3">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={uploadingImages}
                      onChange={(event) => {
                        void uploadImages(event.target.files);
                        event.target.value = '';
                      }}
                    />
                    {uploadingImages && (
                      <p className="text-sm text-muted-foreground">Rasmlar yuklanmoqda...</p>
                    )}
                    {form.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {form.images.map((image) => (
                          <div key={image} className="rounded-lg border border-border p-2">
                            <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                              <Image
                                src={image}
                                alt="Mahsulot rasmi"
                                fill
                                sizes="120px"
                                className="object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="mt-2 w-full"
                              onClick={() => removeImage(image)}
                            >
                              O&apos;chirish
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Field>
              </div>
              <Field label="Videolar, har qatorda bitta URL"><Textarea rows={6} value={form.videoUrls} onChange={(e) => setForm({ ...form, videoUrls: e.target.value })} /></Field>
              <div className="md:col-span-2">
                <div className="rounded-lg border border-border p-4">
                  <h3 className="mb-4 text-sm font-semibold">Texnik xususiyatlar</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {specFields.map((field) => (
                      <Field key={field.key} label={field.label}>
                        <Textarea
                          rows={2}
                          value={form.specs[field.key] ?? ''}
                          onChange={(event) => updateSpec(field.key, event.target.value)}
                        />
                      </Field>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <Button type="submit" className="bg-brand hover:bg-brand-deep">Mahsulotni saqlash</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
