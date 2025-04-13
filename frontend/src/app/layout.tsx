'use client';

import { metadata } from '../../metadata'; // Import the metadata from the separate file
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/layout/navbar';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
            <div className='relative min-h-screen flex flex-col'>
              <div className='flex items-center justify-between px-4 sm:px-6 h-16 border-b sm:hidden'>
                <div className='flex items-center gap-2'>
                  <span className='font-bold flex items-center'>
                    <span className='text-primary'>Groq</span>It
                  </span>
                </div>
              </div>
              <Navbar />
              <main className='flex-1'>{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
