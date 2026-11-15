import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const clerkKey = process.env['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'];
const isClerkConfigured = Boolean(
  clerkKey &&
  clerkKey !== 'pk_test_sample' &&
  (clerkKey.startsWith('pk_test_') || clerkKey.startsWith('pk_live_')) &&
  clerkKey.length > 20
);

export default function SignInPage() {
  if (!isClerkConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="max-w-md w-full p-8 rounded-2xl border border-slate-800 bg-slate-900 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Clerk Setup Required</h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            Authentication requires valid Clerk credentials. Copy your keys from{' '}
            <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer" className="text-sky-400 underline">
              dashboard.clerk.com
            </a>{' '}
            and paste them into <code className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-200">apps/web/.env</code>.
          </p>
          <div className="text-left p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 mb-6 space-y-1">
            <p>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...</p>
            <p>CLERK_SECRET_KEY=sk_test_...</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <SignIn
        appearance={{
          elements: {
            card: 'bg-slate-900 border border-slate-800 text-white shadow-2xl',
            headerTitle: 'text-white',
            headerSubtitle: 'text-slate-400',
            socialButtonsBlockButton: 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700',
            formButtonPrimary: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold',
            formFieldInput: 'bg-slate-950 border-slate-800 text-white',
            footerActionLink: 'text-sky-400 hover:text-sky-300',
          },
        }}
      />
    </div>
  );
}
