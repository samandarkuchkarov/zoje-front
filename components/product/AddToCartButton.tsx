'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations, useLocale } from 'next-intl';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/product';

type Props = {
  product: Product;
};

export function AddToCartButton({ product }: Props) {
  const t = useTranslations('product');
  const locale = useLocale() as 'uz' | 'ru';
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (added) return;
    addItem(product);
    toast.success(t('addedToCart'), { description: product.name[locale] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={!product.inStock}
      size="lg"
      className="w-full sm:w-auto bg-brand hover:bg-brand-deep text-white font-semibold gap-2 min-w-48 relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {t('addedToCart')}
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? t('addToCart') : t('outOfStock')}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
