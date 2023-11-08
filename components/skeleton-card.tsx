import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex-row gap-4 items-center">
        <Skeleton className="flex-grow h-40 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 flex-grow mt-4" />
        <Skeleton className="h-4 flex-grow mt-4" />
        <Skeleton className="h-4 w-1/2 mt-4" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-28" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;
