'use client';

import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex items-center border border-border rounded-xl overflow-hidden',
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none text-muted-foreground hover:text-brand hover:bg-brand-light"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="w-10 text-center font-semibold text-sm select-none">
        {value}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none text-muted-foreground hover:text-brand hover:bg-brand-light"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
