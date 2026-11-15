'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, Lightbulb, CheckSquare, Building, AlertCircle } from 'lucide-react';

export default function InterviewProblemWorkspace({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link href="/interviews" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Problem Library
      </Link>

      {/* Header */}
      <div className="border-b border-slate-800 pb-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
            MEDIUM DIFFICULTY
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Building className="w-3.5 h-3.5" /> Stripe, Cloudflare
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Requirements & Estimations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <h2 className="text-lg font-bold text-white mb-3">1. Functional & Non-Functional Requirements</h2>
            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <div>
                <h3 className="font-semibold text-sky-400 mb-1">Functional:</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Limit requests based on client IP, user identity, or API token.</li>
                  <li>Return HTTP 429 Too Many Requests when limits are exceeded.</li>
                  <li>Support tier-based policy configurations (e.g. 100 req/min for free, 1000 for enterprise).</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-teal-400 mb-1">Non-Functional:</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Sub-millisecond overhead: The rate limiter must not become a performance bottleneck.</li>
                  <li>Fault Tolerance: If the cache fails, fail open gracefully without crashing traffic.</li>
                  <li>Distributed Consistency: Accurate counts across multi-region gateway instances.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
            <h2 className="text-lg font-bold text-white mb-3">2. Traffic & Capacity Estimations</h2>
            <div className="text-sm text-slate-300 space-y-2">
              <p>• <strong>Peak Traffic:</strong> 1,000,000 requests per second.</p>
              <p>• <strong>Active Rate Limit Keys:</strong> 50,000,000 unique keys per day.</p>
              <p>• <strong>Memory Footprint:</strong> 50M keys × ~32 bytes = ~1.6 GB RAM (Comfortably fits in a modest Redis cluster).</p>
            </div>
          </div>

          {/* Interactive Hints */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" /> Progressive Architectural Hints
            </h2>

            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
              <button
                onClick={() => setShowHint1(!showHint1)}
                className="w-full p-3.5 text-left text-xs font-semibold text-white flex items-center justify-between"
              >
                <span>Hint 1: Choosing between Fixed Window and Sliding Window</span>
                {showHint1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {showHint1 && (
                <div className="p-3.5 pt-0 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed">
                  Fixed window suffers from boundary burst vulnerability (double quota allowed at window edges).
                  Use a Redis Sorted Set (ZSET) sliding window or a sliding window counter approximation to avoid spikes.
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
              <button
                onClick={() => setShowHint2(!showHint2)}
                className="w-full p-3.5 text-left text-xs font-semibold text-white flex items-center justify-between"
              >
                <span>Hint 2: Minimizing Network Latency</span>
                {showHint2 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {showHint2 && (
                <div className="p-3.5 pt-0 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed">
                  Use Redis Lua scripts or pipelined commands (`ZREMRANGEBYSCORE`, `ZCARD`, `ZADD`) in a single round-trip to eliminate race conditions and avoid extra network trips.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Evaluation Rubric */}
        <div>
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 sticky top-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-sky-400" /> Interview Rubric
            </h2>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block mb-1">Architecture Boundary</span>
                Did the candidate position the rate limiter at the API gateway rather than inside downstream microservices?
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block mb-1">Concurrency & Race Conditions</span>
                Did the candidate identify concurrent counter increment race conditions and suggest atomic primitives or Lua scripts?
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block mb-1">Failure Handling</span>
                Did the candidate clarify fail-open vs fail-closed policies if Redis experiences an outage?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
