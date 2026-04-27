import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden">
      <div className="aspect-square">
        <Skeleton className="w-full h-full shimmer" />
      </div>
      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-16 shimmer" />
        <Skeleton className="h-4 w-full shimmer" />
        <Skeleton className="h-4 w-3/4 shimmer" />
        <Skeleton className="h-5 w-24 shimmer mt-2" />
      </div>
    </div>
  );
}
