import Image from 'next/image';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '600']
});

const Logo = () => {
  return (
    <div className='hidden md:flex items-center gap-x-2'>
      <Image
        src='/motion-dark.png'
        height='32'
        width='32'
        alt='Motion Logo'
        className='dark:hidden'
      />
      <Image
        src='/motion-light.png'
        height='32'
        width='32'
        alt='Motion Logo'
        className='hidden dark:block'
      />
      <p className={cn('font-semibold text-lg', font.className)}>Motion</p>
    </div>
  );
};

export default Logo;
