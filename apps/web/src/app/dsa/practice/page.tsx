'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { DSA_PRACTICE_PROBLEMS } from '@system-atlas/contracts';
import {
  Terminal,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Code2,
} from 'lucide-react';

export default function DSAPracticeDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [solvedSlugs, setSolvedSlugs] = useState<Set<string>>(new Set(['two-sum']));

  // Filter problems
  const filteredProblems = useMemo(() => {
    return DSA_PRACTICE_PROBLEMS.filter((p) => {
      const matchSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.topicSlug.toLowerCase().includes(search.toLowerCase());

      const matchTopic = selectedTopic === 'ALL' || p.topicSlug === selectedTopic;
      const matchDiff = selectedDifficulty === 'ALL' || p.difficulty === selectedDifficulty;

      return matchSearch && matchTopic && matchDiff;
    });
  }, [search, selectedTopic, selectedDifficulty]);

  const uniqueTopics = useMemo(() => {
    const set = new Set(DSA_PRACTICE_PROBLEMS.map((p) => p.topicSlug));
    return ['ALL', ...Array.from(set)];
  }, []);

  const totalProblems = DSA_PRACTICE_PROBLEMS.length;
  const solvedCount = solvedSlugs.size;
  const easyCount = DSA_PRACTICE_PROBLEMS.filter((p) => p.difficulty === 'EASY' && solvedSlugs.has(p.slug)).length;
  const mediumCount = DSA_PRACTICE_PROBLEMS.filter((p) => p.difficulty === 'MEDIUM' && solvedSlugs.has(p.slug)).length;
  const hardCount = DSA_PRACTICE_PROBLEMS.filter((p) => p.difficulty === 'HARD' && solvedSlugs.has(p.slug)).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        {/* Header & Stats Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20 mb-2">
              <Terminal className="w-3.5 h-3.5" /> Isolated Code Execution Sandbox
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              DSA Coding Practice Arena
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Solve topic-wise interview challenges in Python, JavaScript, C++, or Java with progressive hints and automated test case evaluation.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Solved</span>
              <div className="text-2xl font-black text-white">{solvedCount}/{totalProblems}</div>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <div>
                <span className="text-emerald-400 font-bold">Easy</span>
                <p className="text-slate-300 font-bold">{easyCount}</p>
              </div>
              <div>
                <span className="text-sky-400 font-bold">Medium</span>
                <p className="text-slate-300 font-bold">{mediumCount}</p>
              </div>
              <div>
                <span className="text-rose-400 font-bold">Hard</span>
                <p className="text-slate-300 font-bold">{hardCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search problems or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-900/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Difficulty Pills */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              {(['ALL', 'EASY', 'MEDIUM', 'HARD'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedDifficulty === diff
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Topic Select */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs text-slate-300 focus:outline-none focus:border-sky-500 font-medium"
            >
              {uniqueTopics.map((top) => (
                <option key={top} value={top}>
                  {top === 'ALL' ? 'All Topics' : top.replace(/-/g, ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Problem List Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6 w-12 text-center">Status</th>
                <th className="py-3.5 px-6">Problem Title</th>
                <th className="py-3.5 px-6">Topic Category</th>
                <th className="py-3.5 px-6">Difficulty</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 text-sm">
                    No problems match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((prob) => {
                  const isSolved = solvedSlugs.has(prob.slug);
                  const diffColors = {
                    EASY: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                    MEDIUM: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
                    HARD: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
                  };

                  return (
                    <tr
                      key={prob.slug}
                      className="hover:bg-slate-900/70 transition group"
                    >
                      <td className="py-4 px-6 text-center">
                        {isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-400 inline" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          href={`/dsa/problems/${prob.slug}`}
                          className="font-bold text-white group-hover:text-sky-400 transition text-sm"
                        >
                          {prob.title}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                          {prob.topicSlug}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] border ${
                            diffColors[prob.difficulty]
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/dsa/problems/${prob.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 group-hover:translate-x-0.5 transition"
                        >
                          Solve <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
