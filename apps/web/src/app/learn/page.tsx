'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Compass,
  Briefcase,
  Layers,
  Cpu,
  Database,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';

const systemDesignModules = [
  {
    slug: 'system-design-foundations',
    title: '1. Foundations & Requirements Engineering',
    description: 'Master functional vs non-functional requirements, back-of-the-envelope capacity estimations, and defining out-of-scope boundaries.',
    level: 'BEGINNER',
    lessonsCount: 4,
    readTime: '35 mins',
    topics: ['Functional vs Non-Functional', 'Math & QPS Calculations', 'Pareto 80/20 Rule', 'Monolith vs Microservices'],
  },
  {
    slug: 'networking-and-routing',
    title: '2. Networking, DNS & Ingress Topologies',
    description: 'How traffic flows from user devices to servers using Anycast BGP, Global CDNs, Layer 4/7 Load Balancing, and API Gateways.',
    level: 'BEGINNER',
    lessonsCount: 5,
    readTime: '45 mins',
    topics: ['DNS & Geo-Routing', 'Push vs Pull CDNs', 'L4 vs L7 Load Balancers', 'API Gateway Security'],
  },
  {
    slug: 'database-partitioning',
    title: '3. Database Sharding & Replication',
    description: 'Horizontal partitioning, consistent hashing rings, read replica lag, and distributed transaction boundaries.',
    level: 'INTERMEDIATE',
    lessonsCount: 6,
    readTime: '55 mins',
    topics: ['SQL vs NoSQL Trade-offs', 'Master-Slave vs Multi-Leader', 'Consistent Hashing with Vnodes', 'Cross-Shard Joins'],
  },
  {
    slug: 'distributed-caching',
    title: '4. Distributed Caching Topologies',
    description: 'Deep dive into Cache-aside, Read-through, Write-through, Write-behind, and Cache Stampede / Thundering herd mitigation.',
    level: 'INTERMEDIATE',
    lessonsCount: 5,
    readTime: '50 mins',
    topics: ['Cache-Aside vs Write-Through', 'Eviction (LRU/LFU/TTL)', 'Cache Stampede & Bloom Filters', 'Redis Clustering'],
  },
  {
    slug: 'async-messaging-kafka',
    title: '5. Asynchronous Processing & Event Streams',
    description: 'Decoupling heavy architectures with Message Queues (RabbitMQ/SQS) and durable distributed event commit logs (Apache Kafka).',
    level: 'INTERMEDIATE',
    lessonsCount: 5,
    readTime: '45 mins',
    topics: ['Queues vs Event Streams', 'Consumer Groups & Offsets', 'At-Least-Once Delivery', 'Idempotent Consumer Design'],
  },
  {
    slug: 'rate-limiting-algorithms',
    title: '6. Distributed Rate Limiting & Resilience',
    description: 'Token Bucket, Leaky Bucket, Sliding Window Counter, Redis Lua script atomicity, and Circuit Breaker patterns with full jitter.',
    level: 'ADVANCED',
    lessonsCount: 4,
    readTime: '40 mins',
    topics: ['Sliding Window Counter', 'Redis Atomic Lua Scripts', 'Circuit Breakers (Hystrix)', 'Exponential Backoff + Jitter'],
  },
];

export default function LearnPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
      <Navigation />

      {/* Hero Header */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5" /> High-Scale Distributed Systems
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            System Design{' '}
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Curriculum & Guides
            </span>
          </h1>
          <p className="mt-3 text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed">
            Curated from industry-defining sources including Grokking System Design, Interviewing.io, HelloInterview, and real production engineering blogs at Netflix, Meta, and Uber.
          </p>

          {/* Quick Action Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Link
              href="/learn/roadmap"
              className="p-5 rounded-2xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/15 transition flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-extrabold text-white">Interactive 8-Phase Roadmap</span>
                </div>
                <p className="text-xs text-slate-400">
                  Step-by-step beginner-to-advanced curriculum with progress tracking.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/interviews"
              className="p-5 rounded-2xl border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/15 transition flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-teal-400" />
                  <span className="text-sm font-extrabold text-white">FAANG Interview Problem Bank</span>
                </div>
                <p className="text-xs text-slate-400">
                  Study TinyURL, Instagram, YouTube, WhatsApp, and Rate Limiter case studies.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-10 w-full space-y-12">
        {/* The 4-Step Framework Callout */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 blur-3xl pointer-events-none" />
          <h2 className="text-xl font-bold text-white mb-2">
            The 45-Minute Interview Delivery Framework
          </h2>
          <p className="text-xs text-slate-400 mb-6 max-w-2xl">
            Adopted by Senior and Staff engineers to systematically structure any ambiguous system design prompt:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1.5">
              <div className="text-xs font-mono font-bold text-sky-400">01. 5-7 Mins</div>
              <div className="text-sm font-bold text-white">Scope & Requirements</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clarify 3 core functional features, non-functional targets, QPS math, and explicit out-of-scope boundaries.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1.5">
              <div className="text-xs font-mono font-bold text-teal-400">02. 10-12 Mins</div>
              <div className="text-sm font-bold text-white">High-Level Design</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Draw client to storage data flow. Define REST/gRPC endpoints and initial database schema.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1.5">
              <div className="text-xs font-mono font-bold text-indigo-400">03. 18-20 Mins</div>
              <div className="text-sm font-bold text-white">Deep-Dive Bottlenecks</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tackle hard challenges: database sharding, celebrity fan-out, cache stampede, and concurrency race conditions.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1.5">
              <div className="text-xs font-mono font-bold text-amber-400">04. 3-5 Mins</div>
              <div className="text-sm font-bold text-white">Failure Modes & Rubric</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Review single points of failure (SPOFs), monitoring alerts, telemetry, and architectural trade-offs.
              </p>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Core Learning Modules</h2>
            <Link
              href="/learn/roadmap"
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              View Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {systemDesignModules.map((module) => (
              <div
                key={module.slug}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                        module.level === 'BEGINNER'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : module.level === 'INTERMEDIATE'
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      }`}
                    >
                      {module.level}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{module.lessonsCount} lessons</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {module.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">{module.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{module.description}</p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {module.topics.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/learn/${module.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
                  >
                    Start Module <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
