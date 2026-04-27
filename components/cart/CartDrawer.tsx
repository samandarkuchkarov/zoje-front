'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { X, ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QuantityInput } from '@/components/shared/QuantityInput';
import { PriceTag } from '@/components/shared/PriceTag';
import { Link } from '@/i18n/navigation';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const t = useTranslations();
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-brand" />
                <h2 className="font-heading text-lg font-bold">{t('cart.title')}</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-brand/40" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t('cart.empty')}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t('cart.emptyDesc')}</p>
                </div>
                <Button variant="outline" onClick={onClose} className="mt-2">
                  {t('cart.continueShopping')}
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                          <Image
                            src={item.product.images[0] ?? '/placeholder.webp'}
                            alt={item.product.name.uz}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">
                            {item.product.model}
                          </p>
                          <PriceTag price={item.product.price} size="sm" className="mt-0.5" />
                          <div className="flex items-center gap-2 mt-2">
                            <QuantityInput
                              value={item.quantity}
                              onChange={(q) => updateQuantity(item.product.id, q)}
                              className="scale-90 origin-left"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.product.id)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{t('cart.subtotal')}</span>
                    <PriceTag price={totalPrice()} size="md" />
                  </div>
                  <Separator />
                  <Link href="/checkout" onClick={onClose}>
                    <Button className="w-full bg-brand hover:bg-brand-deep text-white font-semibold gap-2">
                      {t('cart.checkout')}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/cart" onClick={onClose}>
                    <Button variant="outline" className="w-full">
                      {t('cart.title')}
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
