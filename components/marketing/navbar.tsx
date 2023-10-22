'use client';

import Link from 'next/link';
import { useConvexAuth } from 'convex/react';
import { SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { useScrollTop } from '@/hooks/use-scroll-top';

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        'z-30 bg-background dark:bg-[#1F1F1F] sticky top-0 flex items-center w-[calc(100%_-_32px)] py-[15px] mx-auto inset-x-0',
        scrolled && 'border-b dark:border-zinc-600'
      )}
    >
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button variant='ghost' size='sm'>
                Log in
              </Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button size='sm'>Get Motion free</Button>
            </SignUpButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/documents'>Enter Motion</Link>
            </Button>
            <UserButton afterSignOutUrl='/' />
          </>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
