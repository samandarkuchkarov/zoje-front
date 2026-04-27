'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ProductCard } from '@/components/catalog/ProductCard';
import type { Product } from '@/types/product';
import type { ProductCategory } from '@/types/product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Package } from 'lucide-react';

type CatalogViewProps = {
  products: Product[];
};

export function CatalogView({ products }: CatalogViewProps) {
  const t = useTranslations('catalog');
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = params.get('category') as ProductCategory | null;
  const inStock = params.get('inStock') === '1';
  const sort = params.get('sort') ?? 'newest';

  let filtered = products;
  if (category) filtered = filtered.filter((p) => p.category === category);
  if (inStock) filtered = filtered.filter((p) => p.inStock);

  if (sort === 'priceAsc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'priceDesc') filtered = [...filtered].sort((a, b) => b.price - a.price);

  const setSort = (value: string | null) => {
    if (!value) return;
    const next = new URLSearchParams(params.toString());
    next.set('sort', value);
    router.push(`${pathname}?${next.toString()}` as never);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {t('resultsCount', { count: filtered.length })}
        </p>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-40 text-sm">
            <span className="truncate">
              {t(`sortOptions.${sort as 'newest' | 'priceAsc' | 'priceDesc'}`)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t('sortOptions.newest')}</SelectItem>
            <SelectItem value="priceAsc">{t('sortOptions.priceAsc')}</SelectItem>
            <SelectItem value="priceDesc">{t('sortOptions.priceDesc')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Package className="w-7 h-7 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground">{t('noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 items-stretch">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
