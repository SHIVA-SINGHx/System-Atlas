/**
 * System Atlas - Unified Microservices Database Seeder
 * Populates learning, interview, and resource microservices with realistic educational content.
 */

import { PrismaClient as LearningPrismaClient } from '../services/learning-service/node_modules/@prisma/client';
import { PrismaClient as InterviewPrismaClient } from '../services/interview-service/node_modules/@prisma/client';
import { PrismaClient as ResourcePrismaClient } from '../services/resource-service/node_modules/@prisma/client';

async function main() {
  console.log('⚡ Seeding System Atlas Microservices databases...');

  // 1. Seed Learning Service
  const learningDb = new LearningPrismaClient({
    datasources: {
      db: { url: process.env['LEARNING_DATABASE_URL'] || 'postgresql://learning_user:learning_dev_pwd@localhost:5432/atlas?schema=learning_service' },
    },
  });

  const topicCaching = await learningDb.topic.upsert({
    where: { slug: 'distributed-caching' },
    update: {},
    create: {
      slug: 'distributed-caching',
      title: 'Distributed Caching Topologies',
      description: 'Master Cache-aside, Write-through, Stampede Mitigation, and Redis Sentinel failover.',
      order: 1,
      isPublished: true,
      lessons: {
        create: [
          {
            slug: 'caching-fundamentals',
            title: 'Caching Fundamentals & Eviction Policies',
            description: 'LRU, LFU, FIFO, and memory bounded eviction strategies.',
            contentMarkdown: '# Caching Fundamentals\n\nExplore caching layers...',
            difficulty: 'BEGINNER',
            estimatedMinutes: 15,
            order: 1,
            isPublished: true,
          },
          {
            slug: 'cache-stampede-mitigation',
            title: 'Cache Stampede Mitigation',
            description: 'Probabilistic early expiration and mutex locks.',
            contentMarkdown: '# Cache Stampede Mitigation\n\nHandling the Thundering Herd...',
            difficulty: 'INTERMEDIATE',
            estimatedMinutes: 20,
            order: 2,
            isPublished: true,
          },
        ],
      },
    },
  });
  console.log('✅ Learning Service seeded with topic:', topicCaching.title);
  await learningDb.$disconnect();

  // 2. Seed Interview Service
  const interviewDb = new InterviewPrismaClient({
    datasources: {
      db: { url: process.env['INTERVIEW_DATABASE_URL'] || 'postgresql://interview_user:interview_dev_pwd@localhost:5432/atlas?schema=interview_service' },
    },
  });

  const problem = await interviewDb.interviewProblem.upsert({
    where: { slug: 'design-rate-limiter' },
    update: {},
    create: {
      slug: 'design-rate-limiter',
      title: 'Design a Distributed Rate Limiter',
      summary: 'Design a high-throughput, low-latency distributed rate limiter capable of protecting edge APIs.',
      requirements: 'Support user and IP policies; sub-millisecond overhead; fail-open resilience.',
      trafficEstimation: 'Peak 1M RPS across multi-region edge gateways.',
      difficulty: 'INTERMEDIATE',
      companies: ['Stripe', 'Cloudflare', 'GitHub'],
      tags: ['Rate Limiting', 'Redis', 'API Gateway'],
      hints: [
        'Compare Fixed Window Counter vs Sliding Window Log.',
        'Use Redis Sorted Sets (ZSET) to atomically purge expired entries.',
      ],
      rubricCriteria: [
        { criterion: 'Boundary Placement', weight: 20 },
        { criterion: 'Concurrency & Race Condition Handling', weight: 30 },
      ],
    },
  });
  console.log('✅ Interview Service seeded with problem:', problem.title);
  await interviewDb.$disconnect();

  // 3. Seed Resource Service
  const resourceDb = new ResourcePrismaClient({
    datasources: {
      db: { url: process.env['RESOURCE_DATABASE_URL'] || 'postgresql://resource_user:resource_dev_pwd@localhost:5432/atlas?schema=resource_service' },
    },
  });

  const res = await resourceDb.resource.create({
    data: {
      title: 'Google Spanner: Globally Distributed Relational Database',
      description: 'The TrueTime API, multi-version concurrency control, and Paxos consensus groups.',
      url: 'https://research.google/pubs/pub39966/',
      category: 'WHITE_PAPER',
      author: 'Google Research',
      tags: ['Spanner', 'Distributed Database', 'Paxos'],
      publishedYear: 2012,
    },
  });
  console.log('✅ Resource Service seeded with resource:', res.title);
  await resourceDb.$disconnect();

  console.log('🎉 All microservices databases seeded successfully!');
}

main().catch((err) => {
  console.error('Error seeding databases:', err);
  process.exit(1);
});
