import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'System Atlas — Master System Design',
  description: 'Interactive system design curriculum, architecture playground, interview problems, and curated knowledge.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
