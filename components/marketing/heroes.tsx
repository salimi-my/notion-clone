import Image from 'next/image';

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
    </div>
  );
};

export default Heroes;
