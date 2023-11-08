import SkeletonCard from '@/components/skeleton-card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div className="col-span-full">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-4 w-1/2 mt-4" />
        <Separator className="mt-4" />
      </div>
      {'abcdef'.split('').map((item) => (
        <SkeletonCard key={item} />
      ))}
    </div>
  );
};

export default Loading;
