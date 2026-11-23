'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';

export default function LessonReaderPage({ params }: { params: Promise<{ topicSlug: string; lessonSlug: string }> }) {
  const { topicSlug, lessonSlug } = use(params);
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
      <Navigation />

      <div className="max-w-4xl mx-auto px-6 py-10 w-full flex-1">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <Link href={`/learn/${topicSlug}`} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Module Lessons
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition ${
                bookmarked
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" /> {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
            <button
              onClick={() => setCompleted(!completed)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-semibold transition ${
                completed
                  ? 'bg-teal-500/15 border-teal-500/30 text-teal-300'
                  : 'bg-sky-500 hover:bg-sky-400 text-slate-950 border-transparent'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> {completed ? 'Lesson Completed' : 'Mark as Complete'}
            </button>
          </div>
        </div>

        {/* Lesson Header */}
        <div className="border-b border-slate-800 pb-6 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
            {topicSlug.replace(/-/g, ' ')}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2 capitalize">
            {lessonSlug.replace(/-/g, ' ')}
          </h1>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 20 min comprehensive read</span>
            <span>•</span>
            <span className="text-teal-400 font-semibold">Production Architecture Guide</span>
          </div>
        </div>

        {/* Lesson Content Body */}
        <article className="space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" /> 1. Core Architectural Concept
            </h2>
            <p>
              In large-scale distributed systems, system performance is bounded by network I/O, disk seek latencies, and cross-node coordination.
              Designing a resilient service requires understanding where bottlenecks arise and placing intelligent caching, queue buffering, or database partitioning in front of physical storage limits.
            </p>
            <p>
              When evaluating high-concurrency systems (100,000+ QPS), synchronous blocking operations must be eliminated in favor of asynchronous event-driven pipelines and memory-first data structures.
            </p>
          </section>

          {/* Key Rule Box */}
          <div className="p-5 rounded-2xl border border-sky-500/20 bg-sky-500/5 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <Lightbulb className="w-4 h-4" /> Golden Rule of Scalability
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              &quot;Never scale stateful components until you have decoupled stateless execution.&quot; Application servers should remain completely stateless so any incoming request can be served by any node behind a Layer 7 Load Balancer. All state must live in specialized, horizontally partitioned data stores or caches.
            </p>
          </div>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400" /> 2. Real-World Engineering Scenario
            </h2>
            <p>
              Consider a viral social platform experiencing an unexpected 10x traffic spike. If the database executes synchronous join queries on every user page load, database connection pools exhaust in seconds, causing HTTP 504 Gateway Timeouts across the entire site.
            </p>
            <p>
              By inserting a distributed cache cluster (Redis/Memcached) using the <strong>Cache-Aside pattern</strong>, 95% of read queries are resolved in memory in sub-5ms, completely isolating the primary database from read traffic storms.
            </p>
          </section>

          {/* Architecture Visual Callout */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 font-mono text-xs overflow-x-auto text-sky-300 space-y-2">
            <div className="text-[11px] font-sans text-slate-400 font-bold uppercase tracking-wider mb-2">
              Architectural Request Flow:
            </div>
            <pre className="leading-snug">
{`Client App ===> [GeoDNS / Anycast CDN]
                     |
                     v (HTTPS / TLS Terminated)
             [L7 Load Balancer / API Gateway]
                     |
                     +---> [Redis In-Memory Cache] (Hit: < 3ms)
                     |              |
                     | (Miss: 5%)   v
                     +---> [Primary Sharded DB (PostgreSQL / Cassandra)]`}
            </pre>
          </div>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-400" /> 3. Common Failure Modes & Antipatterns
            </h2>
            <ul className="space-y-2 text-xs md:text-sm text-slate-300 list-disc pl-5">
              <li>
                <strong className="text-rose-400">Cache Stampede (Thundering Herd):</strong> When a hot key expires and thousands of simultaneous requests all attempt to recompute the value against the database at the same instant. Solution: Mutex locking or probabilistic early expiration.
              </li>
              <li>
                <strong className="text-rose-400">Single Point of Failure (SPOF):</strong> Deploying a single Redis master without automatic Sentinel failover or Multi-AZ replica clusters.
              </li>
              <li>
                <strong className="text-rose-400">Unbounded TTLs:</strong> Writing keys without an expiration TTL, eventually causing Redis Out-Of-Memory (OOM) evictions of critical business session state.
              </li>
            </ul>
          </section>

          {/* Senior Interview Tip */}
          <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              🎯 FAANG Interviewer Delivery Tip
            </div>
            <p className="text-xs text-amber-200 leading-relaxed">
              When an interviewer asks you about this component, never just name the technology (e.g. &quot;I will use Redis&quot;). Always specify the eviction strategy, the cache sizing calculation (20% hot daily read volume), and how you handle cache misses and database failover.
            </p>
          </div>
        </article>

        {/* Footer Next Actions */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/learn/${topicSlug}`}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {topicSlug.replace(/-/g, ' ')}
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/learn/roadmap"
              className="text-xs font-semibold px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 transition"
            >
              Roadmap Overview
            </Link>
            <Link
              href="/interviews"
              className="text-xs font-bold px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 transition flex items-center gap-1.5"
            >
              Practice Interview Case Studies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
