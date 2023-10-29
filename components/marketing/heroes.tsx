import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Heroes = () => {
  return (
    <div>
      <div className='flex justify-center'>
        <Image
          src='/home-hero-light.png'
          width={852}
          height={260}
          alt='hero'
          className='dark:hidden'
        />
        <Image
          src='/home-hero-dark.png'
          width={852}
          height={260}
          alt='hero-dark'
          className='hidden dark:block'
        />
      </div>
      <div className='relative'>
        <Image
          src='/desktop-light.png'
          width={1080}
          height={672}
          alt='desktop'
          className='border rounded-xl shadow-xl dark:hidden'
        />
        <Image
          src='/desktop-dark.png'
          width={1080}
          height={672}
          alt='desktop-dark'
          className='border border-zinc-600 rounded-xl shadow-xl hidden dark:block dark:shadow-gray-500/5'
        />
        <Image
          src='/phone-mockup-light.png'
          width={230}
          height={481}
          alt='phone-mockup'
          className='absolute bottom-0 -right-14 hidden lg:block dark:hidden'
        />
        <Image
          src='/phone-mockup-dark.png'
          width={230}
          height={481}
          alt='phone-mockup'
          className='absolute bottom-0 -right-14 hidden dark:lg:block'
        />
      </div>
      <div className='flex flex-col justify-center items-center pt-28'>
        <h2 className='text-6xl font-bold'>Get started for free</h2>
        <p className='pt-4'>
          Play around with it first. Get used to it for yourself.
        </p>
        <div className='flex justify-center space-x-3 pt-5'>
          <Button asChild>
            <Link href='/documents'>Try Motion free</Link>
          </Button>
          <Button variant='link' asChild>
            <Link href='/documents' className='text-sky-500'>
              Use Motion now <ArrowRight className='h-4 w-4 ml-2' />
            </Link>
          </Button>
        </div>
        <Image
          src='/motion-parade-light.png'
          width={670}
          height={330}
          alt='hero'
          className='pt-7 dark:hidden'
        />
        <Image
          src='/motion-parade-dark.png'
          width={670}
          height={330}
          alt='hero'
          className='pt-7 hidden dark:block'
        />
      </div>
    </div>
  );
};

export default Heroes;
