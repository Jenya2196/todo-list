import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Headre from '@/Components/Layout/Header/Headre';
import Footer from '@/Components/Layout/Footer/Footer';

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
    <html lang="en">
      <body
        className={`bg-white dark:bg-zinc-900 text-black dark:text-white h-screen ${geistSans.variable} ${geistMono.variable}`}
      >
        <div className="grid grid-rows-[60px_1fr_30px] h-full">
          <Headre />
          <main className="p-2 sm:p-4 md:px-20 lg:px-40 overflow-auto">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
