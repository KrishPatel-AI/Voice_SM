'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/voice-assistant';
  const isHomePage = pathname === '/';

  return (
    <div className='relative min-h-screen flex flex-col'>
      {!hideNavbar && <Navbar />}
      <main className='flex-1'>
        {isHomePage ? (
          // Home page is accessible to everyone
          children
        ) : (
          // Other pages require authentication
          <>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </main>
    </div>
  );
}
