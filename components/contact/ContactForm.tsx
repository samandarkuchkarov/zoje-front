'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  message: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tCheckout = useTranslations('checkout.form');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success(t('successMessage'));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">{t('name')}</Label>
        <Input id="name" {...register('name')} className={errors.name ? 'border-destructive' : ''} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cphone">{t('phone')}</Label>
        <Input id="cphone" {...register('phone')} placeholder="+998" className={errors.phone ? 'border-destructive' : ''} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea id="message" {...register('message')} rows={4} className={errors.message ? 'border-destructive' : ''} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-brand hover:bg-brand-deep text-white gap-2">
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {tCheckout('submitting')}
            </motion.span>
          ) : (
            <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              {t('submit')}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </form>
  );
}
