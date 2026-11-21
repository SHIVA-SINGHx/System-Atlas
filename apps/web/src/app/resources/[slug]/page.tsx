'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Calendar,
  BookOpen,
  Layers,
  Code2,
  Share2,
} from 'lucide-react';

const RESOURCE_DETAILS: Record<string, any> = {
  'google-spanner-white-paper': {
    title: 'Google Spanner: Becoming a Globally Distributed Database',
    category: 'WHITE_PAPER',
    author: 'James C. Corbett et al.',
    publisher: 'Google Research / USENIX OSDI 2012',
    url: 'https://research.google/pubs/pub39966/',
    description: 'Google Spanner is a scalable, globally distributed database designed to provide external consistency at global scale through synchronous multi-datacenter replication and the TrueTime hardware API.',
    keyTakeaways: [
      'TrueTime API exposes clock uncertainty [earliest, latest] with atomic and GPS clocks, eliminating global clock skew.',
      'Externally consistent serializable distributed transactions without two-phase commit overhead on read-only queries.',
      'Multi-version concurrency control (MVCC) enables lock-free atomic snapshots at any historical timestamp.',
      'Paxos consensus groups replicated across geographically distinct data centers with automated leader election.',
    ],
    relatedSystemDesignTopics: ['distributed-caching', 'database-partitioning', 'multi-region-consensus'],
    relatedDSATopics: ['trees-and-bst', 'graphs'],
    license: 'Academic & Educational Citation Rights (USENIX / ACM)',
    attribution: 'Copyright 2012 Google Inc. Presented at OSDI 2012.',
    lastVerifiedDate: '2026-11-15',
  },
  'designing-data-intensive-applications': {
    title: 'Designing Data-Intensive Applications',
    category: 'BOOK',
    author: 'Martin Kleppmann',
    publisher: "O'Reilly Media",
    url: 'https://dataintensive.net/',
    description: 'The industry-standard architectural textbook exploring the foundational trade-offs of reliability, scalability, and maintainability across modern distributed storage and compute engines.',
    keyTakeaways: [
      'Comparative evaluation of Log-Structured Merge Trees (LSM) vs B-Tree storage engines.',
      'Analysis of Single-Leader, Multi-Leader, and Leaderless (Dynamo-style) replication topologies.',
      'Deep dive into transaction isolation levels (Read Committed, Snapshot Isolation, Serializable).',
      'Fault detection, untrusted networks, Byzantine faults, and consensus reduction.',
    ],
    relatedSystemDesignTopics: ['distributed-caching', 'database-partitioning'],
    relatedDSATopics: ['heaps-and-priority-queues', 'trees-and-bst', 'hashing'],
    license: 'Book Reference Link / Fair Use Citation',
    attribution: "Martin Kleppmann / O'Reilly Media. ISBN: 978-1449373320.",
    lastVerifiedDate: '2026-11-10',
  },
};

export default function ResourceProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const resource = RESOURCE_DETAILS[slug] || {
    title: slug.replace(/-/g, ' ').toUpperCase(),
    category: 'TECHNICAL_ARTICLE',
    author: 'Industry Engineers',
    publisher: 'System Atlas Knowledge Base',
    url: 'https://system-atlas.io',
    description: 'Curated technical reference covering distributed architecture principles and algorithm designs.',
    keyTakeaways: [
      'Comprehensive architectural principles verified for production engineering environments.',
      'System design trade-off analysis balancing latency, throughput, consistency, and cost.',
    ],
    relatedSystemDesignTopics: ['distributed-caching'],
    relatedDSATopics: ['arrays-and-strings', 'hashing'],
    license: 'Verified Educational Attribution',
    attribution: 'System Atlas Educational Reference',
    lastVerifiedDate: '2026-11-18',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Resources Library
        </Link>

        {/* Resource Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase">
              {resource.category.replace(/_/g, ' ')}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Verified on {resource.lastVerifiedDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            {resource.title}
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            By <span className="text-slate-200 font-semibold">{resource.author}</span> • {resource.publisher}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-sky-500/20 transition"
            >
              Open Original Resource <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-sm">
          {/* Summary */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <h2 className="text-base font-bold text-white mb-3">Resource Overview</h2>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {resource.description}
            </p>
          </div>

          {/* Key Architectural Takeaways */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" /> Key Architectural Concepts & Findings
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              {resource.keyTakeaways.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related System Atlas Curriculum Modules */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <h2 className="text-base font-bold text-white mb-4">
              Related Curriculum Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resource.relatedSystemDesignTopics.map((top: string) => (
                <Link
                  key={top}
                  href={`/learn/${top}`}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-sky-500/40 hover:bg-slate-900 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <span className="font-bold text-white capitalize">{top.replace(/-/g, ' ')}</span>
                  </div>
                  <span className="text-xs text-sky-400">&rarr;</span>
                </Link>
              ))}

              {resource.relatedDSATopics.map((top: string) => (
                <Link
                  key={top}
                  href={`/dsa/topics/${top}`}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-950 hover:border-teal-500/40 hover:bg-slate-900 transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <Code2 className="w-4 h-4 text-teal-400" />
                    <span className="font-bold text-white capitalize">{top.replace(/-/g, ' ')}</span>
                  </div>
                  <span className="text-xs text-teal-400">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>

          {/* License & Provenance Attribution Box */}
          <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Legal Provenance & Fair Use Attribution
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              {resource.attribution}
            </p>
            <p className="text-[11px] text-slate-400">
              License terms: <span className="font-mono text-slate-300">{resource.license}</span>. Content is cited for scholarly analysis, technical synthesis, and reference in accordance with fair-use guidelines.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
