import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Resume Builder',
  description: 'Create professional resumes with AI assistance',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </body>
    </html>
  );
} 