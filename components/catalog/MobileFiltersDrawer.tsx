'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { CatalogFilters } from './CatalogFilters';
import { useSearchParams } from 'next/navigation';

export function MobileFiltersDrawer() {
  const t = useTranslations('catalog');
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const activeCount = [
    params.get('category') && params.get('category') !== 'all' ? 1 : 0,
    params.get('inStock') === '1' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 w-full">
          <SlidersHorizontal className="w-4 h-4" />
          {t('filters')}
          {activeCount > 0 && (
            <span className="ml-1 w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-8">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle>{t('filters')}</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div onClick={() => setOpen(false)}>
          <CatalogFilters />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
