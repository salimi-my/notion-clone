import { Skeleton } from '@/components/ui/skeleton';

export default function PublicLoading() {
  return (
    <div>
      <Skeleton className='w-full h-[12vh]' />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
        <div className='space-y-4 pl-8 pt-4'>
          <Skeleton className='h-14 w-[50%]' />
          <Skeleton className='h-4 w-[80%]' />
          <Skeleton className='h-4 w-[40%]' />
          <Skeleton className='h-4 w-[60%]' />
        </div>
      </div>
    </div>
  );
}
