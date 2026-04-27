'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  const t = useTranslations('success');
  const params = useSearchParams();
  const orderId = params.get('id') ?? '—';
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ['#1B7A3A', '#D4A017', '#E8F5EC', '#0E5226', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-brand-light flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-brand" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h1 className="font-heading font-extrabold text-3xl text-balance mb-3">
            {t('title')}
          </h1>
          <p className="text-muted-foreground">{t('subtitle')}</p>
          <div className="mt-6 px-4 py-3 rounded-xl bg-brand-light border border-brand/10">
            <p className="text-xs text-muted-foreground mb-1">{t('orderId')}</p>
            <p className="font-mono font-bold text-brand text-lg">{orderId}</p>
          </div>
          <div className="mt-8">
            <Link href="/">
              <Button className="bg-brand hover:bg-brand-deep text-white gap-2">
                {t('backHome')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
