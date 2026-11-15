import Link from 'next/link';
import { Briefcase, Building, ChevronRight } from 'lucide-react';

const mockProblems = [
  {
    slug: 'design-rate-limiter',
    title: 'Design a Distributed Rate Limiter',
    company: 'Stripe, Cloudflare',
    difficulty: 'MEDIUM',
    summary: 'Design a resilient rate limiting service handling millions of requests per second across multi-region edge gateways.',
  },
  {
    slug: 'design-notification-system',
    title: 'Design an Scalable Notification System',
    company: 'Uber, Airbnb',
    difficulty: 'HARD',
    summary: 'Architect a multi-channel (email, push, SMS) notification engine with deduplication, priority queues, and rate limiting.',
  },
  {
    slug: 'design-url-shortener',
    title: 'Design a High-Throughput URL Shortener',
    company: 'Google, Meta',
    difficulty: 'EASY',
    summary: 'Design TinyURL handling billions of reads with low latency, custom aliases, analytics tracking, and distributed ID generation.',
  },
];

export default function InterviewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">System Design Interview Library</h1>
        <p className="text-slate-400 mt-2">Real engineering interview problems with evaluation rubrics and architectural deep-dives.</p>
      </div>

      <div className="space-y-4">
        {mockProblems.map((prob) => (
          <div key={prob.slug} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex items-center justify-between hover:border-slate-700 transition">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  {prob.difficulty}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> {prob.company}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{prob.title}</h2>
              <p className="text-sm text-slate-400">{prob.summary}</p>
            </div>
            <Link
              href={`/interviews/${prob.slug}`}
              className="p-3 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
