import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { DSA_CURRICULUM } from '@system-atlas/contracts';
import {
  Code2,
  Compass,
  Eye,
  Terminal,
  ArrowRight,
  Clock,
  Sparkles,
  Layers,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export default function DSAPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      {/* Hero Banner */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Complete DSA Learning & Practice Environment
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl">
            Master Data Structures & Algorithms{' '}
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              from First Principles
            </span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            13 structured curriculum modules, interactive step-by-step visualizers, multi-language code implementations (C++, Java, Python, JS), and safe in-browser practice sandboxing.
          </p>

          {/* Quick Hub Navigation Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <Link
              href="/dsa/roadmap"
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-sky-500/40 hover:bg-slate-900 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-400 transition">Curriculum Roadmap</h4>
                  <p className="text-xs text-slate-400">13 Structured Tracks</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition" />
            </Link>

            <Link
              href="/dsa/visualizer"
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-teal-500/40 hover:bg-slate-900 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-teal-400 transition">Interactive Visualizer</h4>
                  <p className="text-xs text-slate-400">10 Core Algorithms</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition" />
            </Link>

            <Link
              href="/dsa/practice"
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-indigo-500/40 hover:bg-slate-900 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition">Coding Practice</h4>
                  <p className="text-xs text-slate-400">Safe Code Sandbox</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </div>
      </section>

      {/* Curriculum Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Curriculum Modules</h2>
            <p className="text-sm text-slate-400 mt-1">
              Select a module to read the beginner explanation, real-world analogy, dry runs, multi-language code, and quiz.
            </p>
          </div>
          <Link
            href="/dsa/roadmap"
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            View Interactive Roadmap &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DSA_CURRICULUM.map((topic, idx) => {
            const levelColors = {
              BEGINNER: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
              INTERMEDIATE: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
              ADVANCED: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
              EXPERT: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
            };

            return (
              <div
                key={topic.slug}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${levelColors[topic.level]}`}>
                      {topic.level}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Module {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{topic.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {topic.shortDescription}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {topic.lesson.estimatedMinutes} mins
                    </span>
                    <span>•</span>
                    <span>4 Languages</span>
                    <span>•</span>
                    <span>Interactive Quiz</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/dsa/topics/${topic.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
                  >
                    Start Topic <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/dsa/visualizer?algo=${topic.slug}`}
                    className="text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Visualizer &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
