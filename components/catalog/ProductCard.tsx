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
import type { Product } from '@/types/product';

type Props = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: Props) {
  const t = useTranslations('product');
  const locale = useLocale() as 'uz' | 'ru';
  const addItem = useCartStore((s) => s.addItem);

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

            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.oldPrice && (
                <Badge className="bg-accent-gold text-white text-[10px] px-1.5 py-0.5">
                  SALE
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
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
            <p className="text-xs text-muted-foreground font-medium mb-1">
              {product.model}
            </p>
            <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-foreground group-hover:text-brand transition-colors flex-1">
              {product.name[locale]}
            </h3>
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
