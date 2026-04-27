'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ImageIcon, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  images: string[];
  videoUrls?: string[];
  alt: string;
};

export function ProductGallery({ images, videoUrls = [], alt }: Props) {
  const t = useTranslations('product');
  const [active, setActive] = useState(0);
  const activeImage = images[active] ?? images[0] ?? '/placeholder.webp';

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-border shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 md:p-6"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            <ImageIcon className="h-3.5 w-3.5 text-brand" />
            {active + 1}/{images.length}
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-6 gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`${t('galleryImage')} ${i + 1}`}
              className={cn(
                'relative aspect-square rounded-lg overflow-hidden border-2 bg-white transition-all',
                active === i
                  ? 'border-brand'
                  : 'border-border hover:border-brand/40'
              )}
            >
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                sizes="96px"
                className="object-cover p-1"
              />
              {active === i && (
                <motion.div
                  layoutId="thumb-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {videoUrls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {videoUrls.map((url, i) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand"
            >
              <PlayCircle className="h-4 w-4" />
              {t('video')} {i + 1}
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
