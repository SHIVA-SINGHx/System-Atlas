'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Building,
  ChevronRight,
  Sparkles,
  Clock,
  CheckCircle2,
  Filter,
  Layers,
  ArrowRight,
  Compass,
  Zap,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { SYSTEM_DESIGN_PROBLEMS, SystemDesignProblem } from '@/data/system-design-problems';

export default function InterviewsDirectoryPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');

  const filteredProblems = SYSTEM_DESIGN_PROBLEMS.filter((prob) => {
    if (selectedDifficulty === 'ALL') return true;
    return prob.difficulty === selectedDifficulty;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
      <Navigation />

      {/* Hero */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5" /> FAANG System Design Interview Bank
            </div>
            <Link
              href="/learn/roadmap"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 transition"
            >
              <Compass className="w-3.5 h-3.5 text-sky-400" /> View 8-Phase Learning Roadmap
            </Link>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            System Design{' '}
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Interview Blueprints
            </span>
          </h1>
          <p className="mt-3 text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed">
            Real interview questions asked at Meta, Google, Amazon, Netflix, and Stripe. Every case study includes requirements scoping, capacity math, high-level diagrams, API models, database schemas, and deep-dive bottlenecks.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
              <div className="text-2xl font-black text-sky-400">6</div>
              <div className="text-xs text-slate-400 mt-0.5">Classic Case Studies</div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
              <div className="text-2xl font-black text-teal-400">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">FAANG Caliber Questions</div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
              <div className="text-2xl font-black text-indigo-400">4-Step</div>
              <div className="text-xs text-slate-400 mt-0.5">Interview Rubric Delivery</div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40">
              <div className="text-2xl font-black text-amber-400">Sub-10ms</div>
              <div className="text-xs text-slate-400 mt-0.5">Distributed Scale Focus</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar & Problems Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10 w-full space-y-6">
        {/* Difficulty Filter */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Difficulty:</span>
            <div className="flex items-center gap-1.5 ml-2">
              {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    selectedDifficulty === diff
                      ? 'bg-sky-500 text-slate-950 shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <span className="text-xs text-slate-500">
            Showing {filteredProblems.length} of {SYSTEM_DESIGN_PROBLEMS.length} problems
          </span>
        </div>

        {/* Problems Cards */}
        <div className="space-y-4">
          {filteredProblems.map((prob) => (
            <Link
              key={prob.slug}
              href={`/interviews/${prob.slug}`}
              className="group block p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-sky-500/40 transition duration-200 shadow-sm hover:shadow-sky-500/5 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 max-w-3xl">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded tracking-wide ${
                        prob.difficulty === 'EASY'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : prob.difficulty === 'MEDIUM'
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {prob.difficulty}
                    </span>

                    <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      {prob.companies.join(', ')}
                    </span>

                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {prob.estimatedTime}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-xl font-extrabold text-white group-hover:text-sky-300 transition flex items-center gap-2">
                    {prob.title}
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {prob.summary}
                  </p>

                  {/* Key Highlights preview */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
                      ⚡ Read/Write: {prob.estimations.readWriteRatio}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
                      💾 5-Year Scale: {prob.estimations.storage.fiveYear}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
                      🎯 Deep Dives: {prob.deepDives.length} topics
                    </span>
                  </div>
                </div>

                {/* Right Action Arrow */}
                <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                  <span className="text-xs font-bold text-sky-400 group-hover:text-sky-300 flex items-center gap-1">
                    Study Blueprint <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
