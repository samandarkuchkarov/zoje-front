'use client';

import { useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import type { Product } from '@/types/product';

// Translates Uzbek spec values → Russian. Keys are exactly as stored in the DB.
const UZ_TO_RU: Record<string, string> = {
  // Speed
  '3500 tikuv/daqiqa': '3500 ст/мин',
  '4000 tikuv/daqiqa': '4000 ст/мин',
  '5000 tikuv/daqiqa': '5000 ст/мин',
  '5000-6000 tikuv/daqiqa': '5000–6000 ст/мин',
  '1200 chok/daqiqa': '1200 ст/мин',
  '1500 chok/daqiqa': '1500 ст/мин',
  '2000 chok/daqiqa': '2000 ст/мин',
  '2200 chok/daqiqa': '2200 ст/мин',
  '2500 chok/daqiqa': '2500 ст/мин',
  '3000 chok/daqiqa': '3000 ст/мин',
  '3200 chok/daqiqa': '3200 ст/мин',
  '3600 chok/daqiqa': '3600 ст/мин',
  '5000 chok/daqiqa': '5000 ст/мин',
  '5500 chok/daqiqa': '5500 ст/мин',
  '6500 chok/daqiqa': '6500 ст/мин',
  '999 / 50000 tikish': '999 / 50000 стежков',
  // Needle / thread count
  '2 ta igna': '2 иглы',
  '3 ta igna': '3 иглы',
  '4 ta igna': '4 иглы',
  '12 ta igna': '12 игл',
  '4 ip': '4 нити',
  '5 ip': '5 нитей',
  // Stitch type
  'Bir ignali zanjir tikuv': 'Одноигольный цепной стежок',
  'Bir ignali zanjir tikuv (igna uzatgichli)': 'Одноигольный цепной стежок (с игловодителем)',
  'Zanjir chok': 'Цепной стежок',
  'Ichki chok': 'Внутренний шов',
  'Zig-zag': 'Зигзаг',
  '3in1 rashma': '3 в 1 распошивалка',
  'Avtomat overlok': 'Автоматический оверлок',
  // Lubrication
  'Markaziy avtomatik moylash': 'Центральная автоматическая смазка',
  'Yopiq avtomatik moylash': 'Закрытая автоматическая смазка',
  'Yopiq avtomatik moylash tizimi': 'Закрытая система автоматической смазки',
  'Avtomatik': 'Автоматическая',
  'Moylanmaydigan': 'Безмасляная',
  'Yopiq moy kuvashi': 'Закрытый масляный поддон',
  // Motor
  "AC Servo motor (o'rnatilgan)": 'AC серво мотор (встроенный)',
  'Ichki motor': 'Встроенный мотор',
  'Stepper intellektual': 'Шаговый интеллектуальный',
  'Qadamlovchi avtomat': 'Шаговый автомат',
  'Germetik moy idishi (W)': 'Герметичный масляный картридж (W)',
  // Application / material
  'Qalin va ingichka matolar': 'Толстые и тонкие ткани',
  'Qalin matolar': 'Плотные ткани',
  "Yupqa, o'rta qalin matolar": 'Тонкие, средние и плотные ткани',
  'Oyoq kiyim': 'Обувь',
  'Oyoq kiyim, qalin matolar': 'Обувь, плотные ткани',
  "Kamar va belbog' tikish": 'Шитьё поясов и ремней',
  'Sumkalar': 'Сумки',
  'Tikuvchilik ishlab chiqarishi': 'Швейное производство',
  'Mato kesish': 'Раскрой ткани',
  'Pichoqli kesish': 'Ножевой раскрой',
  "Diskli bichuv pichog'i": 'Дисковый раскройный нож',
  'Bachokli dazmol': 'Паровой утюг',
};

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
          <span className="text-foreground font-medium">
            {locale === 'ru' && value && UZ_TO_RU[value] ? UZ_TO_RU[value] : value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
