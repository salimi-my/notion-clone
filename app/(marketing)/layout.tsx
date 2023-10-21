import Navbar from '@/components/marketing/navbar';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className='h-full dark:bg-[#1F1F1F]'>
        <main className='h-full pt-40'>{children}</main>
      </div>
    </>
  );
};

export default MarketingLayout;
