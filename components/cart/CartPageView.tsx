'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { QuantityInput } from '@/components/shared/QuantityInput';
import { PriceTag } from '@/components/shared/PriceTag';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';

export function CartPageView() {
  const t = useTranslations();
  const locale = useLocale() as 'uz' | 'ru';
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 flex flex-col items-center text-center gap-6">
        <div className="w-24 h-24 rounded-full bg-brand-light flex items-center justify-center">
          <ShoppingCart className="w-10 h-10 text-brand/30" />
        </div>
        <div>
          <h1 className="font-heading font-extrabold text-2xl">{t('cart.empty')}</h1>
          <p className="text-muted-foreground mt-2">{t('cart.emptyDesc')}</p>
        </div>
        <Link href="/catalog">
          <Button className="bg-brand hover:bg-brand-deep text-white gap-2">
            {t('common.backToCatalog')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-heading font-extrabold text-3xl mb-8">{t('cart.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-2">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-3 p-3 sm:p-4 rounded-2xl border border-border bg-white hover:shadow-sm transition-shadow"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                  <Image
                    src={item.product.images[0] ?? '/placeholder.webp'}
                    alt={item.product.name[locale]}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">{item.product.model}</p>
                      <h3 className="font-semibold text-sm line-clamp-2 mt-0.5">
                        {item.product.name[locale]}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <PriceTag price={item.product.price} size="sm" />
                    <QuantityInput
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.product.id, q)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-24">
            <h2 className="font-heading font-bold text-lg mb-4">{t('cart.subtotal')}</h2>
            <div className="space-y-3">
              {items.map((i) => (
                <div key={i.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">
                    {i.product.model} × {i.quantity}
                  </span>
                  <PriceTag price={i.product.price * i.quantity} size="sm" />
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-bold">{t('cart.subtotal')}</span>
                <PriceTag price={totalPrice()} size="md" />
              </div>
            </div>
            <Link href="/checkout" className="block mt-6">
              <Button className="w-full bg-brand hover:bg-brand-deep text-white font-semibold gap-2">
                {t('cart.checkout')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/catalog" className="block mt-2">
              <Button variant="outline" className="w-full text-sm">
                {t('cart.continueShopping')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
