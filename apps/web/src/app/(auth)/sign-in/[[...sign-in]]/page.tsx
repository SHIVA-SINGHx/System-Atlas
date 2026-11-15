import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
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
