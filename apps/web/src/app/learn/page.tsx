import Link from 'next/link';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

const mockTopics = [
  {
    slug: 'distributed-caching',
    title: 'Distributed Caching Topologies',
    description: 'Cache-aside, write-through, cache stampede prevention, eviction policies and Redis clustering.',
    level: 'INTERMEDIATE',
    lessonsCount: 6,
  },
  {
    slug: 'rate-limiting-algorithms',
    title: 'Distributed Rate Limiting',
    description: 'Token Bucket, Leaky Bucket, Sliding Window Log, and sliding window counter using Redis sorted sets.',
    level: 'BEGINNER',
    lessonsCount: 4,
  },
  {
    slug: 'database-partitioning',
    title: 'Database Sharding & Replication',
    description: 'Horizontal partitioning, consistent hashing, replication lag, and distributed transaction isolation.',
    level: 'ADVANCED',
    lessonsCount: 8,
  },
];

export default function LearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white">System Design Curriculum</h1>
        <p className="text-slate-400 mt-2">Comprehensive, self-paced modules to master large-scale distributed systems.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTopics.map((topic) => (
          <div key={topic.slug} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {topic.level}
              </span>
              <span className="text-xs text-slate-500">{topic.lessonsCount} lessons</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{topic.title}</h2>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">{topic.description}</p>
            <Link
              href={`/learn/${topic.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300"
            >
              Start Module <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
