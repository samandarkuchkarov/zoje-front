'use client';

import { useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import type { Product } from '@/types/product';

const SPEC_LABELS: Record<string, { uz: string; ru: string }> = {
  motor:        { uz: 'Motor',               ru: 'Мотор' },
  stitchType:   { uz: 'Tikiш turi',          ru: 'Вид строчки' },
  maxSpeed:     { uz: 'Maksimal tezlik',     ru: 'Макс. скорость' },
  needleSystem: { uz: 'Igna tizimi',         ru: 'Система иглы' },
  needleCount:  { uz: 'Igna soni',           ru: 'Кол-во игл' },
  stitchLength: { uz: 'Tikiш uzunligi',      ru: 'Длина стежка' },
  presserFoot:  { uz: 'Bosuvchi oyoq',       ru: 'Подъём лапки' },
  maxThickness: { uz: 'Maks. qalinlik',      ru: 'Макс. толщина' },
  differential: { uz: 'Differensial',        ru: 'Дифференциал' },
  lubrication:  { uz: "Moylash",             ru: 'Смазка' },
  workingArea:  { uz: 'Ish maydoni',         ru: 'Рабочая зона' },
  patternStorage:{ uz: 'Naqsh xotirasi',     ru: 'Память узоров' },
  headRotation: { uz: 'Bosh aylanishi',      ru: 'Поворот головки' },
  positioning:  { uz: 'Pozitsiyalash',       ru: 'Позиционирование' },
  cuttingArea:  { uz: 'Kesish maydoni',      ru: 'Зона раскроя' },
  heads:        { uz: 'Boshlar soni',        ru: 'Кол-во головок' },
  fileFormats:  { uz: 'Fayl formatlari',     ru: 'Форматы файлов' },
  application:  { uz: 'Qo\'llanish sohasi', ru: 'Применение' },
  voltage:      { uz: 'Kuchlanish',          ru: 'Напряжение' },
  weight:       { uz: 'Vazn',               ru: 'Вес' },
};

type Props = {
  specs: Product['specs'];
};

export function SpecsTable({ specs }: Props) {
  const locale = useLocale() as 'uz' | 'ru';
  const shouldReduce = useReducedMotion();
  const entries = Object.entries(specs).filter(
    ([, v]) => v !== undefined && v !== '—'
  );

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {entries.map(([key, value], i) => (
        <motion.div
          key={key}
          initial={shouldReduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            delay: i * 0.04,
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`flex items-center px-4 py-3 text-sm ${
            i % 2 === 0 ? 'bg-muted/40' : 'bg-white'
          }`}
        >
          <span className="w-44 shrink-0 text-muted-foreground font-medium">
            {SPEC_LABELS[key]?.[locale] ?? key}
          </span>
          <span className="text-foreground font-medium">{value}</span>
        </motion.div>
      ))}
    </div>
  );
}
