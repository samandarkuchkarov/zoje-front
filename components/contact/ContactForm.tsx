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
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  message: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({
  className,
  phonePlaceholder = '+998 99 097 55 11',
}: { className?: string; phonePlaceholder?: string } = {}) {
  const t = useTranslations('contact.form');
  const tCheckout = useTranslations('checkout.form');
  const tCommon = useTranslations('common');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error ?? 'Unknown error');
      toast.success(t('successMessage'));
      reset();
    } catch {
      toast.error(tCommon('error'), { description: tCommon('tryAgain') });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <div className="space-y-1.5">
        <Label htmlFor="name">{t('name')}</Label>
        <Input id="name" {...register('name')} className={cn("h-11 bg-white", errors.name && "border-destructive")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cphone">{t('phone')}</Label>
        <Input id="cphone" {...register('phone')} placeholder={phonePlaceholder} className={cn("h-11 bg-white", errors.phone && "border-destructive")} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea id="message" {...register('message')} rows={5} className={cn("min-h-32 bg-white", errors.message && "border-destructive")} />
      </div>
      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-brand hover:bg-brand-deep text-white gap-2 font-bold">
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
