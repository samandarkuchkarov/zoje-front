'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import type { ProductCategory } from '@/types/product';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CATEGORIES: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'industrial', label: 'industrial' },
  { key: 'overlock', label: 'overlock' },
  { key: 'buttonhole', label: 'buttonhole' },
  { key: 'bartack', label: 'bartack' },
  { key: 'pattern', label: 'pattern' },
  { key: 'embroidery', label: 'embroidery' },
  { key: 'heavy-duty', label: 'heavy-duty' },
  { key: 'domestic', label: 'domestic' },
];

export function CatalogFilters() {
  const t = useTranslations('catalog');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const currentCat = params.get('category') ?? 'all';
  const inStock = params.get('inStock') === '1';

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null) next.delete(key);
    else next.set(key, value);
    router.push(`${pathname}?${next.toString()}` as never);
  };

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-sm mb-3">{t('filters')}</h3>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() =>
                setParam('category', cat.key === 'all' ? null : cat.key)
              }
              className={cn(
                'text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                currentCat === cat.key || (cat.key === 'all' && currentCat === 'all')
                  ? 'bg-brand-light text-brand'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {t(`categories.${cat.label}`)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="inStock"
            checked={inStock}
            onCheckedChange={(v) => setParam('inStock', v ? '1' : null)}
          />
          <Label htmlFor="inStock" className="text-sm cursor-pointer">
            {t('filters_label.inStock')}
          </Label>
        </div>
      </div>
    </aside>
  );
}
