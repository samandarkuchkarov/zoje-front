'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { toast } from 'sonner';
import { Link } from '@/i18n/navigation';
import { useCartStore } from '@/store/cart';
import { PriceTag } from '@/components/shared/PriceTag';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NewBadge, BestsellerBadge } from '@/components/catalog/ProductBadges';
import type { Product } from '@/types/product';

type Props = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: Props) {
  const t = useTranslations('product');
  const locale = useLocale() as 'uz' | 'ru';
  const addItem = useCartStore((s) => s.addItem);
  const localizedName = product.name[locale];
  const modelName = product.model.trim();
  const modelIndex = modelName ? localizedName.toLowerCase().indexOf(modelName.toLowerCase()) : -1;
  const titleEnd = modelIndex >= 0 ? modelIndex + modelName.length : localizedName.length;
  const cardTitle = localizedName.slice(0, titleEnd).trim();
  const cardSubtitle = modelIndex >= 0
    ? localizedName.slice(titleEnd).replace(/^[-,: ]+/, '').trim()
    : '';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(t('addedToCart'), {
      description: product.name[locale],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: '200px' }}
      transition={{
        delay: Math.min(index * 0.05, 0.2),
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <Link href={`/product/${product.slug}`} className="group block h-full">
        <div className="h-full flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          {/* Image — fixed aspect ratio */}
          <div className="relative aspect-square overflow-hidden bg-muted shrink-0">
            <Image
              src={product.images[0] ?? '/placeholder.webp'}
              alt={product.name[locale]}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute left-3 top-3 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5">
              {product.newModel && <NewBadge size="sm" label={t('new')} />}
              {product.bestseller && <BestsellerBadge size="sm" label={t('bestseller')} />}
              {product.oldPrice && (
                <Badge className="h-6 rounded-full bg-rose-500 px-2 text-[10px] font-extrabold uppercase tracking-wider text-white ring-1 ring-inset ring-white/25 shadow-sm">
                  SALE
                </Badge>
              )}
              {!product.inStock && (
                <Badge
                  variant="secondary"
                  className="h-6 rounded-full px-2 text-[10px] font-semibold uppercase tracking-wider"
                >
                  {t('outOfStock')}
                </Badge>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-brand hover:bg-brand-deep text-white text-sm font-semibold gap-2 shadow-lg"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4" />
                {t('addToCart')}
              </Button>
            </div>
          </div>

          {/* Info — grows to fill remaining space, price pinned to bottom */}
          <div className="flex flex-col flex-1 p-4">
            <div className="flex-1">
              <h3 className="font-semibold text-base leading-snug line-clamp-1 text-foreground group-hover:text-brand transition-colors">
                {cardTitle}
              </h3>
              {cardSubtitle && (
                <p className="mt-1 text-sm leading-snug line-clamp-2 text-muted-foreground transition-colors group-hover:text-foreground/80">
                  {cardSubtitle}
                </p>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <PriceTag
                price={product.price}
                oldPrice={product.oldPrice}
                size="sm"
              />
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
