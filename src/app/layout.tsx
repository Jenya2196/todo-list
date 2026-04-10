import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from 'next-themes';
import { Header, Footer } from '@/components/Layout';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Todo list',
  description: 'Todo list',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-sans', inter.variable)}>
      <body
        className={`h-screen bg-white text-black dark:bg-zinc-900 dark:text-white ${geistSans.variable} ${geistMono.variable}`}
      >
        <ThemeProvider attribute="class">
          <div className="grid h-full grid-rows-[60px_1fr_30px]">
            <Header />
            <main className="overflow-auto p-2 sm:p-4 md:px-20 lg:px-40">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
