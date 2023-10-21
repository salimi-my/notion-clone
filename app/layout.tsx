import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/providers/theme-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Motion — Elevate Productivity: Tasks, Projects, Notes.',
  description:
    'Motion is a freemium productivity and note-taking web application. It offers organizational tools including task management, project tracking, to-do lists, and bookmarking.',
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/motion-dark.ico',
      href: 'motion-dark.ico'
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/motion-light.ico',
      href: 'motion-light.ico'
    }
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
          storageKey='motion-theme'
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
