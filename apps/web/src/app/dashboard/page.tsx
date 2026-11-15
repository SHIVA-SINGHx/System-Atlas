import Link from 'next/link';
import { Layers, Flame, Trophy, Clock, CheckCircle2, Bookmark, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Engineer Learning Dashboard</h1>
          <p className="text-slate-400 mt-1">Track your system design curriculum, active architecture projects, and problem attempts.</p>
        </div>
        <Link
          href="/playground"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition text-sm self-start md:self-auto"
        >
          <Layers className="w-4 h-4" /> New Architecture Project
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Lessons Completed</span>
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-white">12</div>
          <span className="text-xs text-teal-400 mt-1 inline-block">+3 this week</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Streak</span>
            <Flame className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-3xl font-black text-white">5 Days</div>
          <span className="text-xs text-orange-400 mt-1 inline-block">Best: 14 days</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Learning Time</span>
            <Clock className="w-5 h-5 text-sky-400" />
          </div>
          <div className="text-3xl font-black text-white">8.5 hrs</div>
          <span className="text-xs text-slate-500 mt-1 inline-block">Across 3 modules</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Playground Projects</span>
            <Layers className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">4</div>
          <span className="text-xs text-indigo-400 mt-1 inline-block">2 simulated</span>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Continue Learning & Recent Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">In-Progress Module</h2>
              <Link href="/learn" className="text-xs text-sky-400 hover:text-sky-300 font-medium">Browse All</Link>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                  DISTRIBUTED CACHING
                </span>
                <h3 className="text-base font-bold text-white mt-2">Lesson 3: Cache Invalidation & Stampede Mitigation</h3>
                <p className="text-xs text-slate-400 mt-1">Estimated: 20 mins</p>
              </div>
              <Link
                href="/learn/distributed-caching/cache-invalidation"
                className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition inline-flex items-center gap-1 self-start sm:self-auto"
              >
                Resume <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Architecture Projects</h2>
              <Link href="/playground" className="text-xs text-sky-400 hover:text-sky-300 font-medium">Open Canvas</Link>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Multi-Region Global Messenger', nodes: 8, updated: '2 hours ago' },
                { name: 'URL Shortener with Read Replicas', nodes: 5, updated: 'Yesterday' },
              ].map((proj, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{proj.name}</h4>
                      <p className="text-xs text-slate-500">{proj.nodes} components • {proj.updated}</p>
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

        {/* Right Col: Bookmarks & Interview Recommended */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-sky-400" /> Saved Bookmarks
            </h2>
            <div className="space-y-3">
              <Link href="/learn/distributed-caching" className="block p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 transition">
                <p className="text-xs font-semibold text-white">Cache Invalidation Topologies</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Distributed Caching</p>
              </Link>
              <Link href="/interviews/design-rate-limiter" className="block p-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 transition">
                <p className="text-xs font-semibold text-white">Design a Distributed Rate Limiter</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Interview Prep</p>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" /> Recommended Challenge
            </h2>
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <span className="text-[11px] font-bold text-amber-400">HARD • UBER</span>
              <h3 className="text-sm font-bold text-white mt-1 mb-2">Design an Scalable Notification System</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">Handling millions of push, email, and SMS events with strict deduplication.</p>
              <Link
                href="/interviews/design-notification-system"
                className="text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                Start Challenge &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
