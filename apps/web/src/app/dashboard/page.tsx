'use client';

import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import {
  Layers,
  Flame,
  Trophy,
  Clock,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  Code2,
  Terminal,
  Eye,
  Compass,
  Sparkles,
} from 'lucide-react';

export default function UnifiedDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Engineer Learning Dashboard</h1>
            <p className="text-slate-400 mt-1 text-sm">
              Track your dual mastery: System Design architecture projects alongside Data Structures & Algorithms practice.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dsa/practice"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition text-xs shadow-md shadow-sky-500/20"
            >
              <Terminal className="w-3.5 h-3.5" /> Practice Arena
            </Link>
            <Link
              href="/playground"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold transition text-xs"
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" /> Open Canvas
            </Link>
          </div>
        </div>

        {/* Unified Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Metric 1: System Design Lessons */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Design</span>
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
            </div>
            <div className="text-3xl font-black text-white">12</div>
            <span className="text-xs text-teal-400 mt-1 inline-block">4 modules completed</span>
          </div>

          {/* Metric 2: DSA Problems Solved */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">DSA Problems Solved</span>
              <Terminal className="w-5 h-5 text-sky-400" />
            </div>
            <div className="text-3xl font-black text-white">7 <span className="text-sm font-normal text-slate-500">/ 13 topics</span></div>
            <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold">4 Easy</span>
              <span className="text-slate-600">•</span>
              <span className="text-sky-400 font-bold">2 Med</span>
              <span className="text-slate-600">•</span>
              <span className="text-rose-400 font-bold">1 Hard</span>
            </div>
          </div>

          {/* Metric 3: Active Streak */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Streak</span>
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-black text-white">6 Days</div>
            <span className="text-xs text-orange-400 mt-1 inline-block">Best: 14 days</span>
          </div>

          {/* Metric 4: Total Study Time */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Time Invested</span>
              <Clock className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-white">14.2 hrs</div>
            <span className="text-xs text-slate-500 mt-1 inline-block">Across Design & DSA</span>
          </div>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: In-Progress Modules for both tracks */}
          <div className="lg:col-span-2 space-y-6">
            {/* System Design In-Progress Card */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <h2 className="text-base font-bold text-white">In-Progress System Design Track</h2>
                </div>
                <Link href="/learn" className="text-xs text-sky-400 hover:text-sky-300 font-medium">Browse All</Link>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                    DISTRIBUTED CACHING
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1.5">Lesson 3: Cache Invalidation & Stampede Mitigation</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Estimated time remaining: 20 mins</p>
                </div>
                <Link
                  href="/learn/distributed-caching/cache-stampede-mitigation"
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition inline-flex items-center gap-1 self-start sm:self-auto shrink-0"
                >
                  Resume Lesson <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* DSA In-Progress Card */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <h2 className="text-base font-bold text-white">In-Progress DSA Track</h2>
                </div>
                <Link href="/dsa/roadmap" className="text-xs text-teal-400 hover:text-teal-300 font-medium">View Roadmap</Link>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                    TWO POINTERS & SLIDING WINDOW
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1.5">Topic: Dynamic Window Boundary Invariants</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Recommended practice: Minimum Size Subarray Sum</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <Link
                    href="/dsa/visualizer?algo=two-pointers-and-sliding-window"
                    className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white transition inline-flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-400" /> Visualizer
                  </Link>
                  <Link
                    href="/dsa/topics/two-pointers-and-sliding-window"
                    className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition inline-flex items-center gap-1"
                  >
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Architecture Canvas Projects */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-400" /> Architecture Playground Canvases
                </h2>
                <Link href="/playground" className="text-xs text-sky-400 hover:text-sky-300 font-medium">Launch Playground</Link>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Multi-Region Global Messenger with Redis Cluster', nodes: 8, updated: '2 hours ago' },
                  { name: 'URL Shortener with Read Replicas & Bloom Filter', nodes: 5, updated: 'Yesterday' },
                ].map((proj, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">{proj.name}</h4>
                        <p className="text-[11px] text-slate-500">{proj.nodes} components • {proj.updated}</p>
                      </div>
                    </div>
                    <Link href="/playground" className="text-xs font-medium text-slate-300 hover:text-white">
                      Edit &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Quick Access, Next Recommended Challenge, Bookmarks */}
          <div className="space-y-6">
            {/* Recommended Challenge */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" /> Next Coding Challenge
              </h2>
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                <span className="text-[10px] font-bold text-amber-400">MEDIUM • DYNAMIC PROGRAMMING</span>
                <h3 className="text-sm font-bold text-white mt-1 mb-1">Coin Change</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Compute the minimum number of coins needed to make up a given amount using unbounded knapsack tabulation.
                </p>
                <Link
                  href="/dsa/problems/coin-change"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition"
                >
                  <Terminal className="w-3.5 h-3.5" /> Start Coding
                </Link>
              </div>
            </div>

            {/* Quick Links Hub */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
              <h2 className="text-base font-bold text-white mb-3">Quick Navigation</h2>
              <div className="space-y-2 text-xs">
                <Link
                  href="/dsa/visualizer"
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 flex items-center justify-between text-slate-300 hover:text-white transition"
                >
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-teal-400" /> 10 Algorithm Visualizers
                  </span>
                  <span>&rarr;</span>
                </Link>
                <Link
                  href="/dsa/roadmap"
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 flex items-center justify-between text-slate-300 hover:text-white transition"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-sky-400" /> 13-Topic DSA Roadmap
                  </span>
                  <span>&rarr;</span>
                </Link>
                <Link
                  href="/resources"
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 flex items-center justify-between text-slate-300 hover:text-white transition"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" /> Verified Resource Library
                  </span>
                  <span>&rarr;</span>
                </Link>
                <Link
                  href="/admin/content"
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 flex items-center justify-between text-slate-300 hover:text-white transition"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Admin Content Ingestion
                  </span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
