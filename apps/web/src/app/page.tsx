import Link from 'next/link';
import { Layers, Terminal, Sparkles, BookOpen, Compass, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
            ⚡
          </div>
          <span className="text-xl font-bold tracking-tight text-white">System Atlas</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link href="/learn" className="hover:text-white transition">Curriculum</Link>
          <Link href="/playground" className="hover:text-white transition">Playground</Link>
          <Link href="/interviews" className="hover:text-white transition">Interview Prep</Link>
          <Link href="/resources" className="hover:text-white transition">Resources</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-medium text-slate-300 hover:text-white">Sign In</Link>
          <Link href="/sign-up" className="text-sm font-semibold px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition">
            Start Learning
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Domain-Driven Distributed Architecture
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight">
          Master Modern System Design{' '}
          <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            by Designing Systems
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Interactive architecture diagrams, guided distributed systems curriculum, real-world mock interview challenges, and resource guards — built for modern engineers.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link href="/learn" className="px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Explore Curriculum
          </Link>
          <Link href="/playground" className="px-8 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold transition flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" /> Open Architecture Playground
          </Link>
        </div>

        {/* Pillars Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <Compass className="w-8 h-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Guided Learning Paths</h3>
            <p className="text-sm text-slate-400">Step-by-step topics from rate limiters and caching topologies to global multi-region consensus.</p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <Layers className="w-8 h-8 text-teal-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Interactive Canvas</h3>
            <p className="text-sm text-slate-400">Drag, drop, configure, and inspect traffic simulations on full React Flow visual architecture boards.</p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <ShieldCheck className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Real Interview Rubrics</h3>
            <p className="text-sm text-slate-400">Company-specific prompts with traffic estimation calculations, deep-dive hints, and trade-off scoring.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        System Atlas &copy; 2026. Premium System Design Education. All rights reserved.
      </footer>
    </div>
  );
}
