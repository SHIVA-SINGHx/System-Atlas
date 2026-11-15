'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Bookmark, Clock, ArrowRight } from 'lucide-react';

export default function LessonReaderPage({ params }: { params: { topicSlug: string; lessonSlug: string } }) {
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <Link href={`/learn/${params.topicSlug}`} className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" /> Back to Module Lessons
        </Link>
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
      </div>

      {/* Lesson Header */}
      <div className="border-b border-slate-800 pb-6 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          {params.topicSlug.replace(/-/g, ' ')}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-2 capitalize">
          {params.lessonSlug.replace(/-/g, ' ')}
        </h1>
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 20 min read</span>
          <span>•</span>
          <span>Intermediate Difficulty</span>
        </div>
      </div>

      {/* Lesson Content Body */}
      <article className="prose prose-invert max-w-none text-slate-300 space-y-6 leading-relaxed">
        <h2 className="text-xl font-bold text-white">1. Core Concept Overview</h2>
        <p>
          In high-throughput distributed systems, databases are typically the performance bottleneck.
          Employing an explicit caching layer reduces read latency from milliseconds to sub-millisecond territory
          while protecting backend storage engines from traffic spikes.
        </p>

        <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 my-6">
          <h3 className="text-sm font-bold text-sky-400 mb-1">Key Architectural Rule</h3>
          <p className="text-xs text-slate-300">
            Never use Redis as the single source of truth for critical business data. Always ensure write-through or cache-aside
            maintains consistent persistence in your relational database.
          </p>
        </div>

        <h2 className="text-xl font-bold text-white">2. Cache-Aside Implementation Pattern</h2>
        <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto">
{`async function getEntity(id: string): Promise<Entity> {
  const cacheKey = \`entity:\${id}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const entity = await db.entity.findUnique({ where: { id } });
  if (entity) {
    await redis.set(cacheKey, JSON.stringify(entity), 'EX', 3600);
  }
  return entity;
}`}
        </pre>

        <h2 className="text-xl font-bold text-white">3. Mitigating Thundering Herd</h2>
        <p>
          When a hot cache key expires, thousands of concurrent requests can simultaneously hit the database.
          To mitigate this, implement mutual exclusion (mutex locks via Redis <code>SETNX</code>) or probabilistic early expiration (XFetch algorithm).
        </p>
      </article>

      {/* Completion Action */}
      <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={() => setCompleted(!completed)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition ${
            completed
              ? 'bg-teal-500/10 border border-teal-500/30 text-teal-400'
              : 'bg-sky-500 hover:bg-sky-400 text-slate-950'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {completed ? 'Completed!' : 'Mark as Completed'}
        </button>

        <Link
          href={`/learn/${params.topicSlug}`}
          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
        >
          Next Lesson <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
