import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2, PlayCircle } from 'lucide-react';

const mockTopicDetails: Record<string, any> = {
  'distributed-caching': {
    title: 'Distributed Caching Topologies',
    description: 'Deep dive into Cache-aside, Read-through, Write-through, Write-behind, and Stampede Mitigation.',
    level: 'INTERMEDIATE',
    lessons: [
      { slug: 'caching-fundamentals', title: '1. Caching Fundamentals & Eviction Policies', minutes: 15, completed: true },
      { slug: 'cache-aside-vs-write-through', title: '2. Cache-Aside vs Write-Through Topologies', minutes: 20, completed: true },
      { slug: 'cache-stampede-mitigation', title: '3. Cache Stampede & Thundering Herd Solutions', minutes: 25, completed: false },
      { slug: 'redis-clustering-and-replication', title: '4. Redis Clustering & Sentinel Failover', minutes: 30, completed: false },
    ],
  },
};

export default function TopicDetailPage({ params }: { params: { topicSlug: string } }) {
  const topic = mockTopicDetails[params.topicSlug] || {
    title: params.topicSlug.replace(/-/g, ' ').toUpperCase(),
    description: 'Comprehensive curriculum lessons on this topic.',
    level: 'INTERMEDIATE',
    lessons: [
      { slug: 'overview', title: '1. Architecture Overview', minutes: 15, completed: false },
      { slug: 'deep-dive', title: '2. Deep Dive & Patterns', minutes: 25, completed: false },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/learn" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Curriculum
      </Link>

      <div className="mb-8">
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
          {topic.level}
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-3 mb-2">{topic.title}</h1>
        <p className="text-slate-400 text-sm leading-relaxed">{topic.description}</p>
      </div>

      <div className="space-y-3">
        {topic.lessons.map((lesson: any) => (
          <Link
            key={lesson.slug}
            href={`/learn/${params.topicSlug}/${lesson.slug}`}
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {lesson.completed ? (
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
              ) : (
                <PlayCircle className="w-5 h-5 text-sky-400" />
              )}
              <span className="text-sm font-semibold text-white">{lesson.title}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" /> {lesson.minutes} mins
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
