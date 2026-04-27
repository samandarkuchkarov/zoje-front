'use client';

import { useTranslations } from 'next-intl';
import { formatPriceRaw, formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';

type Props = {
  price: number;
  oldPrice?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export function PriceTag({ price, oldPrice, className, size = 'md' }: Props) {
  const t = useTranslations('common');

  const sizes = {
    sm: 'text-base font-semibold',
    md: 'text-xl font-bold',
    lg: 'text-3xl font-extrabold',
  };

  return (
    <div className={cn('flex items-baseline gap-2 flex-wrap', className)}>
      <span className={cn('text-brand', sizes[size])}>
        {formatPriceRaw(price)}{' '}
        <span className="text-sm font-medium">{t('uzs')}</span>
      </span>
      {oldPrice && (
        <span className="text-muted-foreground line-through text-sm">
          {formatPrice(oldPrice)}
        </span>
      )}
    </div>
  );
}
