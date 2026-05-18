import { Crown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Size = 'sm' | 'md';

const sizeStyles: Record<Size, { wrapper: string; icon: string; dot: string }> = {
  sm: {
    wrapper: 'h-6 px-2 gap-1 text-[10px]',
    icon: 'h-3 w-3',
    dot: 'h-1.5 w-1.5',
  },
  md: {
    wrapper: 'h-7 px-3 gap-1.5 text-[11px]',
    icon: 'h-3.5 w-3.5',
    dot: 'h-2 w-2',
  },
};

const baseBadge =
  'inline-flex items-center rounded-full font-extrabold uppercase tracking-wider ring-1 ring-inset ring-white/25 shadow-sm select-none';

export function NewBadge({ size = 'sm', label }: { size?: Size; label: string }) {
  const s = sizeStyles[size];
  return (
    <span
      className={cn(
        baseBadge,
        s.wrapper,
        'bg-gradient-to-br from-brand to-brand-deep text-white shadow-brand/25'
      )}
    >
      <span className={cn('relative flex', s.dot)} aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
        <span className={cn('relative inline-flex rounded-full bg-white', s.dot)} />
      </span>
      <Sparkles className={cn(s.icon, 'opacity-90')} strokeWidth={2.5} />
      {label}
    </span>
  );
}

export function BestsellerBadge({ size = 'sm', label }: { size?: Size; label: string }) {
  const s = sizeStyles[size];
  return (
    <span
      className={cn(
        baseBadge,
        s.wrapper,
        'bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 text-white shadow-amber-500/30'
      )}
    >
      <Crown className={cn(s.icon, 'fill-white/95')} strokeWidth={2.25} aria-hidden />
      {label}
    </span>
  );
}
