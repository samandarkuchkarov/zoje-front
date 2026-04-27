'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import Image from 'next/image';
import { useCartStore } from '@/store/cart';
import { PriceTag } from '@/components/shared/PriceTag';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, Loader2 } from 'lucide-react';

const PHONE_REGEX = /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

const CITIES = [
  'toshkent', 'samarqand', 'buxoro', 'namangan',
  'andijon', 'fargona', 'qarshi', 'nukus', 'other',
] as const;

function buildSchema(t: ReturnType<typeof useTranslations<'checkout.validation'>>) {
  return z.object({
    fullName: z.string().min(1, t('nameRequired')).min(2, t('nameMin')),
    phone: z.string().min(1, t('phoneRequired')).regex(PHONE_REGEX, t('phoneInvalid')),
    city: z.string().min(1, t('cityRequired')),
    address: z.string().min(1, t('addressRequired')),
    comment: z.string().optional(),
  });
}

type FormData = {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  comment?: string;
};

export function CheckoutForm() {
  const t = useTranslations('checkout');
  const tV = useTranslations('checkout.validation');
  const tCommon = useTranslations('common');
  const locale = useLocale() as 'uz' | 'ru';
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();

  const schema = buildSchema(tV);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (items.length === 0) router.push('/cart');
  }, [items.length, router]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, items: items.map((i) => ({
          productId: i.product.id,
          model: i.product.model,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
        })) }),
      });
      const json = await res.json() as { ok: boolean; orderId?: string; error?: string };
      if (!json.ok) throw new Error(json.error ?? 'Unknown error');
      clearCart();
      router.push(`/order/success?id=${json.orderId}`);
    } catch {
      toast.error(tCommon('error'), { description: tCommon('tryAgain') });
    }
  };

  if (items.length === 0) return null;

  return (
    <div>
      <h1 className="font-heading font-extrabold text-3xl mb-8">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 space-y-5 order-2 lg:order-1"
        >
          <div className="space-y-1.5">
            <Label htmlFor="fullName">{t('form.fullName')} *</Label>
            <Input
              id="fullName"
              {...register('fullName')}
              placeholder={t('form.namePlaceholder')}
              className={errors.fullName ? 'border-destructive' : ''}
            />
            {errors.fullName && (
              <motion.p
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-destructive"
              >
                {errors.fullName.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">{t('form.phone')} *</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="+998 90 123 45 67"
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-destructive"
              >
                {errors.phone.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>{t('form.city')} *</Label>
            <Select onValueChange={(v: unknown) => setValue('city', String(v))}>
              <SelectTrigger className={errors.city ? 'border-destructive' : ''}>
                <SelectValue placeholder={t('form.city')} />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {t(`cities.${c}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && (
              <p className="text-xs text-destructive">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">{t('form.address')} *</Label>
            <Textarea
              id="address"
              {...register('address')}
              rows={3}
              placeholder={t('form.addressPlaceholder')}
              className={errors.address ? 'border-destructive' : ''}
            />
            {errors.address && (
              <p className="text-xs text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="comment">{t('form.comment')}</Label>
            <Textarea id="comment" {...register('comment')} rows={2} />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-brand hover:bg-brand-deep text-white font-semibold gap-2"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t('form.submitting')}
                </motion.span>
              ) : (
                <motion.span
                  key="submit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  {t('form.submit')}
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </form>

        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="rounded-2xl border border-border bg-white p-5 lg:sticky lg:top-24 space-y-4">
            <h2 className="font-heading font-bold">{t('summary')}</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={item.product.images[0] ?? '/placeholder.webp'}
                      alt={item.product.name[locale]}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.product.model}</p>
                    <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                    <PriceTag price={item.product.price * item.quantity} size="sm" />
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">{tCommon('price')}</span>
              <PriceTag price={totalPrice()} size="md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
