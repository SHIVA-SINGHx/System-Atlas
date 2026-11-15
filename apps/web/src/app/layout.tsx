import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: 'System Atlas — Master System Design',
  description: 'Interactive system design curriculum, architecture playground, interview problems, and curated knowledge.',
};

const clerkKey = process.env['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'];
const isClerkConfigured = Boolean(
  clerkKey &&
  clerkKey !== 'pk_test_sample' &&
  (clerkKey.startsWith('pk_test_') || clerkKey.startsWith('pk_live_')) &&
  clerkKey.length > 20
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );

  if (isClerkConfigured) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
