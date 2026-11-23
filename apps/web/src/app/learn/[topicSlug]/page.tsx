import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle2, PlayCircle, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/navigation';

const mockTopicDetails: Record<string, any> = {
  'system-design-foundations': {
    title: 'Foundations & Requirements Engineering',
    description: 'Learn how to approach any open-ended system design prompt, clarify scope, distinguish functional from non-functional requirements, and perform rapid back-of-the-envelope capacity estimations.',
    level: 'BEGINNER',
    lessons: [
      { slug: 'functional-vs-nonfunctional', title: '1. Functional vs Non-Functional Requirements', minutes: 15, completed: true },
      { slug: 'back-of-the-envelope-math', title: '2. Back-of-the-Envelope Math & QPS Estimations', minutes: 20, completed: true },
      { slug: 'availability-and-slas', title: '3. Availability, Latency Targets & SLA Math', minutes: 15, completed: false },
      { slug: 'monolith-vs-microservices', title: '4. Monolith vs Microservices Trade-offs', minutes: 20, completed: false },
    ],
  },
  'networking-and-routing': {
    title: 'Networking, DNS & Ingress Topologies',
    description: 'Understand how internet requests travel from mobile apps and web browsers through GeoDNS, Edge CDNs, Layer 4/Layer 7 Load Balancers, and API Gateways.',
    level: 'BEGINNER',
    lessons: [
      { slug: 'dns-and-anycast-routing', title: '1. DNS, Anycast & Global Request Routing', minutes: 15, completed: true },
      { slug: 'cdn-topologies-and-edge-caching', title: '2. Content Delivery Networks & Edge Caching', minutes: 20, completed: false },
      { slug: 'layer-4-vs-layer-7-load-balancing', title: '3. Layer 4 vs Layer 7 Load Balancing', minutes: 20, completed: false },
      { slug: 'api-gateway-architecture', title: '4. API Gateway, Rate Limiting & Auth Offload', minutes: 25, completed: false },
    ],
  },
  'database-partitioning': {
    title: 'Database Sharding & Replication',
    description: 'Horizontal database partitioning, consistent hashing algorithms, primary-replica replication lag, and distributed transaction boundaries.',
    level: 'INTERMEDIATE',
    lessons: [
      { slug: 'sql-vs-nosql-taxonomy', title: '1. SQL vs NoSQL: Making the Pragmatic Trade-off', minutes: 20, completed: true },
      { slug: 'replication-and-lag', title: '2. Replication Strategies & Read-Your-Own-Writes', minutes: 25, completed: true },
      { slug: 'horizontal-sharding-patterns', title: '3. Horizontal Sharding & Shard Key Selection', minutes: 25, completed: false },
      { slug: 'consistent-hashing-deep-dive', title: '4. Consistent Hashing & Virtual Nodes', minutes: 30, completed: false },
    ],
  },
  'distributed-caching': {
    title: 'Distributed Caching Topologies',
    description: 'Deep dive into Cache-aside, Read-through, Write-through, Write-behind, and Cache Stampede / Thundering herd mitigation.',
    level: 'INTERMEDIATE',
    lessons: [
      { slug: 'caching-fundamentals', title: '1. Caching Fundamentals & Eviction Policies', minutes: 15, completed: true },
      { slug: 'cache-aside-vs-write-through', title: '2. Cache-Aside vs Write-Through Topologies', minutes: 20, completed: true },
      { slug: 'cache-stampede-mitigation', title: '3. Cache Stampede & Thundering Herd Solutions', minutes: 25, completed: false },
      { slug: 'redis-clustering-and-replication', title: '4. Redis Clustering & Sentinel Failover', minutes: 30, completed: false },
    ],
  },
  'async-messaging-kafka': {
    title: 'Asynchronous Processing & Event Streams',
    description: 'Decoupling heavy architectures with Message Queues (RabbitMQ/SQS) and durable distributed event commit logs (Apache Kafka).',
    level: 'INTERMEDIATE',
    lessons: [
      { slug: 'queues-vs-event-streams', title: '1. Message Queues vs Distributed Event Streams', minutes: 20, completed: true },
      { slug: 'kafka-architecture-and-offsets', title: '2. Kafka Partitions, Consumer Groups & Offsets', minutes: 25, completed: false },
      { slug: 'at-least-once-and-idempotency', title: '3. At-Least-Once Delivery & Idempotent Consumers', minutes: 20, completed: false },
      { slug: 'dead-letter-queues-and-retries', title: '4. Dead Letter Queues & Poison Pill Handling', minutes: 20, completed: false },
    ],
  },
  'rate-limiting-algorithms': {
    title: 'Distributed Rate Limiting & Resilience',
    description: 'Token Bucket, Leaky Bucket, Sliding Window Counter, Redis Lua script atomicity, and Circuit Breaker patterns with full jitter.',
    level: 'ADVANCED',
    lessons: [
      { slug: 'rate-limiting-algorithms-comparison', title: '1. Token Bucket vs Sliding Window Counter', minutes: 20, completed: true },
      { slug: 'redis-lua-atomic-rate-limiter', title: '2. Implementing Sliding Windows with Redis Lua', minutes: 25, completed: false },
      { slug: 'circuit-breaker-hystrix-pattern', title: '3. Circuit Breaker Pattern (Closed/Open/Half-Open)', minutes: 20, completed: false },
      { slug: 'exponential-backoff-and-jitter', title: '4. Exponential Backoff with Full Jitter', minutes: 15, completed: false },
    ],
  },
};

export default async function TopicDetailPage({ params }: { params: Promise<{ topicSlug: string }> }) {
  const { topicSlug } = await params;
  const topic = mockTopicDetails[topicSlug] || {
    title: topicSlug.replace(/-/g, ' ').toUpperCase(),
    description: 'Comprehensive curriculum lessons on this distributed systems topic.',
    level: 'INTERMEDIATE',
    lessons: [
      { slug: 'overview', title: '1. Architecture Overview & Principles', minutes: 15, completed: false },
      { slug: 'deep-dive', title: '2. Deep Dive & Implementation Patterns', minutes: 25, completed: false },
      { slug: 'trade-offs', title: '3. Scalability Trade-offs & Failure Modes', minutes: 20, completed: false },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
      <Navigation />

      <div className="max-w-4xl mx-auto px-6 py-12 w-full">
        <Link href="/learn" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Curriculum
        </Link>

        <div className="mb-8 p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              {topic.level}
            </span>
            <span className="text-xs text-slate-500">{topic.lessons.length} lessons in this module</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2 mb-3">{topic.title}</h1>
          <p className="text-slate-300 text-sm leading-relaxed">{topic.description}</p>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Module Lessons
          </div>
          {topic.lessons.map((lesson: any) => (
            <Link
              key={lesson.slug}
              href={`/learn/${topicSlug}/${lesson.slug}`}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                {lesson.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-teal-400" />
                ) : (
                  <PlayCircle className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                )}
                <span className="text-sm font-semibold text-white group-hover:text-sky-300 transition">
                  {lesson.title}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" /> {lesson.minutes} mins
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl border border-slate-800 bg-slate-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Compass className="w-4 h-4 text-sky-400" /> Want a high-level view of all stages?
          </div>
          <Link
            href="/learn/roadmap"
            className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
          >
            Open Roadmap <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
