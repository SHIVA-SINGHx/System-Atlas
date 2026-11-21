'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { DSA_CURRICULUM } from '@system-atlas/contracts';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Circle,
  Eye,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function DSARoadmapPage() {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(
    new Set(['arrays-and-strings', 'hashing']),
  );

  const toggleCompleted = (slug: string) => {
    const next = new Set(completedSlugs);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    setCompletedSlugs(next);
  };

  const stages = [
    {
      title: 'Stage 1: Linear Structures & Search Bounds',
      description: 'Master contiguous vs linked memory, pointer invariants, constant-time hashing, and divide-and-conquer binary search.',
      slugs: [
        'arrays-and-strings',
        'hashing',
        'two-pointers-and-sliding-window',
        'linked-lists',
        'stacks-and-queues',
        'binary-search',
      ],
    },
    {
      title: 'Stage 2: Recursive Thinking & Hierarchical Trees',
      description: 'Transition from linear structures into state-space exploration, balanced binary search trees, and priority heaps.',
      slugs: [
        'recursion-and-backtracking',
        'trees-and-bst',
        'heaps-and-priority-queues',
      ],
    },
    {
      title: 'Stage 3: Complex Graphs, Dynamic Programming & Advanced Tries',
      description: 'Master shortest paths, DAG topological sorting, memoization/tabulation optimal substructure, and disjoint set union.',
      slugs: [
        'graphs',
        'greedy-algorithms',
        'dynamic-programming',
        'tries-and-union-find',
      ],
    },
  ];

  const totalTopics = DSA_CURRICULUM.length;
  const completedCount = completedSlugs.size;
  const percent = Math.round((completedCount / totalTopics) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        <Link
          href="/dsa"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to DSA Hub
        </Link>

        {/* Roadmap Header */}
        <div className="border-b border-slate-800 pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20 mb-3">
                <Compass className="w-3.5 h-3.5" /> Structured Learning Path
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                Progressive DSA Curriculum Roadmap
              </h1>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl">
                A systematically ordered journey from fundamental array indices to multi-dimensional dynamic programming and union-find sets.
              </p>
            </div>

            {/* Overall Progress Meter */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 min-w-[220px]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-slate-300">Curriculum Progress</span>
                <span className="font-mono text-sky-400 font-bold">{percent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-teal-400 rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 text-right">
                {completedCount} of {totalTopics} modules marked complete
              </p>
            </div>
          </div>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-12">
          {stages.map((stage, stageIdx) => (
            <section key={stageIdx} className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold flex items-center justify-center text-sm shrink-0 mt-0.5">
                  {stageIdx + 1}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{stage.title}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{stage.description}</p>
                </div>
              </div>

              <div className="ml-4 pl-7 border-l-2 border-slate-800 space-y-4 pt-2">
                {stage.slugs.map((slug) => {
                  const topic = DSA_CURRICULUM.find((t) => t.slug === slug);
                  if (!topic) return null;
                  const isDone = completedSlugs.has(slug);

                  return (
                    <div
                      key={slug}
                      className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isDone
                          ? 'border-teal-500/30 bg-teal-500/5'
                          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleCompleted(slug)}
                          className="mt-0.5 text-slate-500 hover:text-white transition shrink-0"
                          title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-teal-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                          )}
                        </button>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-400">
                              Module {topic.order < 10 ? `0${topic.order}` : topic.order}:
                            </span>
                            <span className="text-sm font-bold text-white">{topic.title}</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {topic.level}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                            {topic.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <Link
                          href={`/dsa/visualizer?algo=${topic.slug}`}
                          className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium inline-flex items-center gap-1 transition"
                        >
                          <Eye className="w-3.5 h-3.5 text-teal-400" /> Visualizer
                        </Link>
                        <Link
                          href={`/dsa/topics/${topic.slug}`}
                          className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold inline-flex items-center gap-1 transition shadow-sm shadow-sky-500/10"
                        >
                          Study <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
