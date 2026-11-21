import Link from 'next/link';
import {
  Layers,
  Terminal,
  Sparkles,
  BookOpen,
  Compass,
  ShieldCheck,
  Code2,
  Eye,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      <Navigation />

      {/* Hero */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Complete System Design & DSA Engineering Environment
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight">
          Master System Architecture &{' '}
          <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            Algorithmic Problem Solving
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
          From microservices topology and distributed consensus to algorithm visualizers, progressive DSA curriculum, and isolated coding sandboxes — built for modern software engineers.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dsa"
            className="px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition flex items-center gap-2"
          >
            <Code2 className="w-4 h-4" /> Explore DSA Curriculum
          </Link>
          <Link
            href="/dsa/visualizer"
            className="px-8 py-3.5 rounded-xl border border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 font-semibold transition flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Algorithm Visualizer
          </Link>
          <Link
            href="/learn"
            className="px-8 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold transition flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-sky-400" /> System Design
          </Link>
        </div>

        {/* Pillars Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <Code2 className="w-8 h-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">13-Topic DSA Curriculum</h3>
            <p className="text-sm text-slate-400">
              Analogies, step-by-step dry runs, time/space complexities, and code in C++, Java, Python, and JavaScript.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <Eye className="w-8 h-8 text-teal-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Interactive Visualizers</h3>
            <p className="text-sm text-slate-400">
              Actual algorithm execution steps with timeline scrubber, pointer highlights, and step explanations for sorting, trees, graphs, and DP.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <Terminal className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Safe Practice Sandbox</h3>
            <p className="text-sm text-slate-400">
              Topic-wise interview problems with progressive hints, memory-bounded isolated code execution, and test cases.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        System Atlas &copy; 2026. Premium Distributed Systems and DSA Education. All rights reserved.
      </footer>
    </div>
  );
}
