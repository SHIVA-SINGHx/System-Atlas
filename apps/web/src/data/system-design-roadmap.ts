export interface RoadmapStep {
  id: string;
  title: string;
  summary: string;
  keyConcepts: string[];
  interviewTips: string;
  formulaOrRule?: string;
  resources?: { name: string; url: string }[];
}

export interface RoadmapPhase {
  id: string;
  title: string;
  subtitle: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  badge: string;
  description: string;
  steps: RoadmapStep[];
}

export const SYSTEM_DESIGN_ROADMAP: RoadmapPhase[] = [
  {
    id: 'foundations',
    title: 'Phase 1: Foundations & Requirements Engineering',
    subtitle: 'Learn the structured framework used by top tech companies',
    level: 'BEGINNER',
    badge: 'Step 01',
    description: 'Every system design interview begins here. Mastering requirements clarification and back-of-the-envelope calculations separates senior candidates from juniors.',
    steps: [
      {
        id: 'functional-vs-nonfunctional',
        title: '1. Functional vs Non-Functional Requirements',
        summary: 'Functional requirements define WHAT the system does (features, APIs). Non-functional requirements define HOW WELL it does it (scalability, latency, availability, consistency).',
        keyConcepts: [
          'Functional Requirements: 3-4 core user actions (e.g., Post tweet, View timeline, Follow user).',
          'Non-Functional: Latency targets (p99 < 100ms), Availability (99.99% "four nines"), Consistency model (Eventual vs Strong).',
          'Scope Definition: Clarify what is OUT of scope (e.g., analytics, payments) to prevent running out of time.',
        ],
        interviewTips: 'Never assume scale. Always ask: "Are we optimizing for lowest latency or highest consistency?" and "What is the expected read-to-write ratio?"',
        formulaOrRule: 'Rule of Thumb: 99.9% uptime allows 8.76 hours of downtime/year; 99.99% allows only 52.6 minutes/year.',
      },
      {
        id: 'back-of-the-envelope',
        title: '2. Back-of-the-Envelope Math & Capacity Estimation',
        summary: 'Quick mental math to estimate traffic volume, storage footprint, network bandwidth, and memory cache requirements.',
        keyConcepts: [
          'Daily Active Users (DAU) & Requests per Second (QPS).',
          'Read vs Write QPS: Social apps are usually read-heavy (100:1 or 10:1 ratio).',
          'Storage Calculation: Size per entity × writes per day × 365 days × 5 years.',
          'Memory Cache Sizing: Cache 20% of hot daily read data (Pareto Principle / 80-20 Rule).',
        ],
        interviewTips: '1 day ≈ 86,400 seconds (round to 100,000 to do quick mental math in live interviews without breaking your stride).',
        formulaOrRule: 'QPS = (DAU × Actions Per User) / 86,400. Peak QPS = Average QPS × 2 (or 3).',
      },
      {
        id: 'architectural-patterns',
        title: '3. Monolith vs Microservices vs Event-Driven',
        summary: 'Understand architectural trade-offs: Monoliths maximize simplicity; Microservices enable autonomous teams; Event-Driven maximizes asynchronous decoupling.',
        keyConcepts: [
          'Monoliths: Fast local function calls, simpler transactions, single deployment boundary.',
          'Microservices: Independent scaling, technology heterogeneity, network overhead & distributed failures.',
          'Event-Driven Architecture: Asynchronous pub/sub, loose coupling, eventual consistency.',
        ],
        interviewTips: 'In interviews, start with a simple modular service before splitting into 10 microservices unnecessarily. Justify every service split.',
      },
    ],
  },
  {
    id: 'networking-ingress',
    title: 'Phase 2: Ingress, DNS & Network Routing',
    subtitle: 'How requests travel from a user device into your infrastructure',
    level: 'BEGINNER',
    badge: 'Step 02',
    description: 'Learn how modern global platforms route incoming traffic securely and with minimum latency using DNS, Anycast, CDNs, and Load Balancers.',
    steps: [
      {
        id: 'dns-and-anycast',
        title: '1. DNS, Anycast Routing & Geo-Distribution',
        summary: 'How domain names resolve to IP addresses and how Anycast routes clients to the closest edge datacenter.',
        keyConcepts: [
          'DNS Hierarchy: Root servers -> TLD servers -> Authoritative nameservers.',
          'GeoDNS & Latency-based Routing: Directing users to regional datacenters.',
          'BGP & Anycast: Single IP advertised from multiple physical locations globally.',
        ],
        interviewTips: 'DNS queries are heavily cached by OS and ISPs. Do not rely on DNS for fast sub-second failover.',
      },
      {
        id: 'cdn-topologies',
        title: '2. Content Delivery Networks (CDNs)',
        summary: 'Geographically distributed network of proxy servers that cache static (and dynamic) content close to users.',
        keyConcepts: [
          'Push vs Pull CDNs: Pull CDNs fetch on demand from origin; Push CDNs receive uploaded content upfront.',
          'Edge caching: Images, videos, HTML, JS, CSS, and API response caching.',
          'Cache Invalidation: Purge by URL, tag-based invalidation, and short TTLs.',
        ],
        interviewTips: 'For any video, image, or media service (YouTube, Instagram), CDN is mandatory in step 1 of your High-Level Design.',
        formulaOrRule: 'Rule of Thumb: CDNs can offload 85-95% of static traffic from origin application servers.',
      },
      {
        id: 'load-balancers',
        title: '3. Layer 4 vs Layer 7 Load Balancing',
        summary: 'Distributing incoming network traffic across multiple application servers to prevent any single point of saturation.',
        keyConcepts: [
          'Layer 4 (Transport / TCP): Fast, routes based on IP & Port without inspecting payload (e.g., AWS NLB).',
          'Layer 7 (Application / HTTP): Inspects HTTP headers, paths, cookies for intelligent routing (e.g., NGINX, AWS ALB).',
          'Algorithms: Round Robin, Least Connections, Weighted Least Connections, IP Hash.',
        ],
        interviewTips: 'Pair L4 load balancers at the entry point for raw throughput with L7 load balancers behind them for routing.',
      },
      {
        id: 'api-gateway',
        title: '4. API Gateway & Reverse Proxy',
        summary: 'The single entry point into microservices managing cross-cutting concerns.',
        keyConcepts: [
          'SSL / TLS Termination: Decrypting HTTPS traffic at the perimeter.',
          'Authentication & Authorization: Validating JWTs before requests reach internal services.',
          'Rate Limiting & IP Whitelisting: Shielding services from abuse & DDoS.',
          'Request Aggregation & Protocol Translation: e.g., HTTP/REST to internal gRPC.',
        ],
        interviewTips: 'Mentioning an API Gateway demonstrates that you know real-world microservices need centralized security and rate limiting.',
      },
    ],
  },
  {
    id: 'data-tier',
    title: 'Phase 3: Database Selection, Sharding & Replication',
    subtitle: 'Designing persistent data storage for immense scale',
    level: 'INTERMEDIATE',
    badge: 'Step 03',
    description: 'Picking the right database and structuring horizontal partitions is the most scrutinized part of any senior architecture interview.',
    steps: [
      {
        id: 'sql-vs-nosql',
        title: '1. SQL vs NoSQL: Making the Right Trade-off',
        summary: 'Understand when to pick Relational (PostgreSQL, MySQL) vs Document (MongoDB) vs Key-Value (Redis, DynamoDB) vs Wide-Column (Cassandra).',
        keyConcepts: [
          'RDBMS: Strong ACID guarantees, complex joins, structured schemas, B-Tree indexes. Scales vertically best.',
          'Key-Value (Redis, DynamoDB): O(1) reads/writes, extreme throughput, simple key lookups.',
          'Wide-Column (Cassandra, ScyllaDB): Write-heavy append-only logs, LSM-trees, linear horizontal scaling.',
          'Document (MongoDB): Flexible schemas, nested hierarchical data, JSON documents.',
        ],
        interviewTips: 'Never say "NoSQL is faster than SQL". Say: "NoSQL trades join capability and ACID transactions for predictable horizontal scaling under high write throughput."',
      },
      {
        id: 'database-replication',
        title: '2. Database Replication Strategies',
        summary: 'Replicating data across multiple machines for high availability and read scalability.',
        keyConcepts: [
          'Single-Leader (Master-Slave): Master handles all writes; Replicas serve read queries.',
          'Replication Lag: The delay between a write on master and appearance on replicas (leads to dirty reads).',
          'Read-Your-Own-Writes Consistency: Routing reads to the master immediately after a user writes.',
          'Multi-Leader & Leaderless (Dynamo style): Quorum reads/writes (W + R > N).',
        ],
        interviewTips: 'When using read replicas, always address replication lag and explain how users see their own immediate posts.',
      },
      {
        id: 'database-sharding',
        title: '3. Database Sharding & Partitioning',
        summary: 'Splitting large datasets across multiple independent database instances horizontally.',
        keyConcepts: [
          'Shard Key Selection: Must provide uniform distribution without hot spots (e.g., hash(userId)).',
          'Range-based Sharding: e.g. A-D on Shard 1, E-H on Shard 2 (leads to uneven skew).',
          'Hash-based Sharding: Using cryptographic hash of key to distribute evenly.',
          'Cross-shard joins & transactions: Highly discouraged; denormalize data to avoid them.',
        ],
        interviewTips: 'Avoid using auto-incrementing sequential integers as shard keys — they direct all new writes to the same newest shard.',
      },
      {
        id: 'consistent-hashing',
        title: '4. Consistent Hashing',
        summary: 'A hashing scheme that minimizes data migration when nodes are added or removed from a cluster.',
        keyConcepts: [
          'Hash Ring: Keys and servers are mapped to positions on a 360° ring using hash(x).',
          'Virtual Nodes (Vnodes): Each physical node maps to 100-250 virtual points on the ring to prevent data skew.',
          'Node additions/removals: Only k/n keys need to be remapped instead of all keys.',
        ],
        interviewTips: 'Consistent hashing is the standard answer for: DynamoDB, Cassandra, Memcached clusters, and L4 load balancers.',
      },
    ],
  },
  {
    id: 'caching-tier',
    title: 'Phase 4: Caching Topologies & Invalidation',
    subtitle: 'Blazing sub-millisecond latencies and protection for your database',
    level: 'INTERMEDIATE',
    badge: 'Step 04',
    description: 'Learn the difference between cache-aside and write-through, how to avoid cache stampedes, and how to scale Redis clusters.',
    steps: [
      {
        id: 'caching-patterns',
        title: '1. Caching Access Patterns',
        summary: 'How applications read and write data between the cache and persistent storage.',
        keyConcepts: [
          'Cache-Aside (Lazy Loading): App reads cache -> on miss reads DB -> writes to cache. Most versatile.',
          'Write-Through: App writes to cache -> cache synchronously writes to DB. Zero stale reads, higher write latency.',
          'Write-Behind (Write-Back): App writes to cache -> cache asynchronously batches writes to DB. High risk of data loss on crash.',
          'Refresh-Ahead: Cache automatically reloads frequently accessed keys before they expire.',
        ],
        interviewTips: 'Cache-Aside is the default in 90% of interview answers. Mention Write-Behind only when write throughput is astronomical (e.g., gaming scoreboards).',
      },
      {
        id: 'eviction-policies',
        title: '2. Eviction Policies & Sizing',
        summary: 'Deciding what data to remove when the cache is full.',
        keyConcepts: [
          'LRU (Least Recently Used): Discards keys not accessed for the longest time (doubly linked list + hash map).',
          'LFU (Least Frequently Used): Discards keys with lowest access counter.',
          'FIFO (First In First Out): Discards oldest added keys regardless of access.',
          'TTL (Time to Live): Automatic key expiration to prevent unbounded cache growth.',
        ],
        interviewTips: 'Always set a TTL on every cache key! Unbounded keys with no expiration are the #1 cause of production OOM crashes.',
      },
      {
        id: 'cache-pitfalls',
        title: '3. Cache Stampede, Penetration & Breakdown',
        summary: 'Critical failure modes of distributed caching under heavy concurrency.',
        keyConcepts: [
          'Cache Stampede (Thundering Herd): Key expires and 10,000 concurrent requests all hit the DB simultaneously. Solution: Mutex locking / probabilistic early expiration (XFetch).',
          'Cache Penetration: Requests for non-existent keys bypass cache and hit DB continuously. Solution: Cache NULL values with short TTL or use Bloom Filters.',
          'Cache Avalanche: Multiple keys expire at the exact same second. Solution: Add random jitter to TTLs (e.g., TTL = 300s ± random(30s)).',
        ],
        interviewTips: 'Bringing up Bloom Filters and TTL jitter demonstrates deep production experience to senior interviewers.',
      },
    ],
  },
  {
    id: 'async-tier',
    title: 'Phase 5: Asynchronous Processing & Messaging',
    subtitle: 'Decoupling heavy workloads and guaranteeing event delivery',
    level: 'INTERMEDIATE',
    badge: 'Step 05',
    description: 'Master message queues, event streaming with Apache Kafka, consumer groups, and idempotency.',
    steps: [
      {
        id: 'queues-vs-streams',
        title: '1. Message Queues (RabbitMQ/SQS) vs Event Streams (Kafka)',
        summary: 'Understanding the fundamental distinction between transient job queues and durable append-only event logs.',
        keyConcepts: [
          'Message Queues (RabbitMQ, AWS SQS): Smart broker, dumb consumer. Deletes message once processed. Great for async tasks.',
          'Event Streams (Apache Kafka): Dumb broker, smart consumer. Retains immutable commit log. Consumers track offsets.',
          'Consumer Groups: Enables parallel processing of partitions by multiple worker instances.',
        ],
        interviewTips: 'Choose Kafka for analytics, activity feeds, and replayable event logs. Choose RabbitMQ/SQS for discrete background jobs (e.g., sending emails, video transcoding tasks).',
      },
      {
        id: 'delivery-semantics-idempotency',
        title: '2. Delivery Guarantees & Idempotency',
        summary: 'Ensuring operations do not execute twice during network retries or worker crashes.',
        keyConcepts: [
          'At-Most-Once: Message may be lost, never redelivered (fire-and-forget).',
          'At-Least-Once: Message never lost, but may be duplicated during retries. (Standard in distributed systems).',
          'Idempotency Keys: Client generates a unique UUID (e.g. idempotency-key header). Backend validates against Redis/DB before executing.',
        ],
        interviewTips: 'Distributed systems always operate under At-Least-Once delivery. Idempotent consumer design is mandatory in payment and order processing.',
      },
    ],
  },
  {
    id: 'consensus-consistency',
    title: 'Phase 6: Distributed Consensus, CAP & PACELC',
    subtitle: 'Navigating consistency models and network partitions',
    level: 'ADVANCED',
    badge: 'Step 06',
    description: 'Learn the theoretical limits of distributed computing and how modern systems balance latency against strict consistency.',
    steps: [
      {
        id: 'cap-and-pacelc',
        title: '1. CAP & PACELC Theorems in Practice',
        summary: 'Understanding that under a network partition, a distributed system must choose between Consistency and Availability.',
        keyConcepts: [
          'CAP: Consistency (every read gets latest write), Availability (every request gets non-error response), Partition Tolerance (tolerates network drops).',
          'Network partitions are inevitable in real hardware: you must choose between CP and AP.',
          'PACELC: If Partition (P): choose Availability (A) or Consistency (C); Else (E): choose Latency (L) or Consistency (C).',
          'Examples: Cassandra is AP / PA/EL; Spanner and ZooKeeper are CP / PC/EC.',
        ],
        interviewTips: 'Never claim a system is "CA". In distributed systems spanning networks, partitions cannot be avoided.',
      },
      {
        id: 'distributed-locking',
        title: '2. Distributed Locking & Consensus',
        summary: 'Coordinating state across independent nodes using consensus algorithms.',
        keyConcepts: [
          'Consensus Protocols: Raft and Paxos ensure agreement across quorum of nodes.',
          'ZooKeeper / etcd: Used for leader election, configuration management, and distributed coordination.',
          'Redis Redlock: Distributed lock using multiple Redis nodes with TTL and fencing tokens.',
        ],
        interviewTips: 'Always use a fencing token (monotonic sequence number) with distributed locks to prevent split-brain writes during GC pauses.',
      },
    ],
  },
  {
    id: 'resilience-observability',
    title: 'Phase 7: Fault Tolerance, Rate Limiting & Resilience',
    subtitle: 'Designing systems that degrade gracefully instead of crashing',
    level: 'ADVANCED',
    badge: 'Step 07',
    description: 'How to build robust systems with circuit breakers, rate limiters, backoff jitter, and complete distributed tracing.',
    steps: [
      {
        id: 'rate-limiting-algorithms',
        title: '1. Rate Limiting Algorithms',
        summary: 'Protecting backend infrastructure from traffic spikes, brute force, and abuse.',
        keyConcepts: [
          'Token Bucket: Centralized bucket of tokens refilled at rate r. Allows burst traffic. (AWS, Stripe).',
          'Leaky Bucket: Requests enter queue and leak out at constant rate. Smooths bursts.',
          'Sliding Window Counter: Combines current and previous minute counters for memory-efficient exact limiting.',
          'Redis implementation: Sliding window log using sorted sets (`ZADD` + `ZREMRANGEBYSCORE`).',
        ],
        interviewTips: 'Explain how rate limiters return HTTP 429 with `Retry-After` header and why token bucket is preferred for public APIs.',
      },
      {
        id: 'circuit-breaker-pattern',
        title: '2. Circuit Breaker & Fallback Patterns',
        summary: 'Preventing cascading failures when a downstream dependency is degraded or down.',
        keyConcepts: [
          'Closed State: Normal operation; requests pass through.',
          'Open State: Failure threshold exceeded; requests fail immediately without calling downstream service.',
          'Half-Open State: Periodically lets test requests through to check if dependency has recovered.',
          'Graceful Degradation: Returning cached data, static fallbacks, or reduced feature sets when open.',
        ],
        interviewTips: 'Always pair retries with exponential backoff AND full jitter (`random_between(0, min(cap, base * 2^attempt))`) to prevent retry stampedes.',
      },
      {
        id: 'observability-telemetry',
        title: '3. Observability: Metrics, Traces & Logs',
        summary: 'The three pillars of telemetry needed to debug distributed microservices.',
        keyConcepts: [
          'Distributed Tracing (OpenTelemetry): Correlation IDs injected into request headers to track a single request across 10 microservices.',
          'Metrics (Prometheus): Counters, Gauges, Histograms measuring p50, p95, p99 latencies and error rates.',
          'Structured Logging (JSON): Machine-parseable logs centralized via ElasticSearch or Loki.',
        ],
        interviewTips: 'Mentioning Correlation IDs and p99 latency metrics demonstrates that you operate production-grade systems.',
      },
    ],
  },
  {
    id: 'interview-blueprint',
    title: 'Phase 8: The 4-Step FAANG Interview Framework',
    subtitle: 'The exact delivery formula from Interviewing.io & HelloInterview',
    level: 'ADVANCED',
    badge: 'Step 08',
    description: 'A 45-minute system design interview requires strict time allocation. Master this 4-step framework to consistently score Senior / Staff level.',
    steps: [
      {
        id: 'step1-scope',
        title: 'Step 1: Understand the Problem & Scope (5-7 Mins)',
        summary: 'Never jump straight into drawing boxes. Align on functional requirements, non-functional targets, and scale.',
        keyConcepts: [
          'Define 3 core functional features.',
          'Define critical non-functional metrics (e.g., latency, availability, consistency).',
          'Calculate QPS (Reads/Writes) and Storage requirements.',
          'State what is OUT OF SCOPE to protect your remaining 35 minutes.',
        ],
        interviewTips: 'Write requirements down on the whiteboard/canvas. Refer back to them as you make architecture decisions.',
      },
      {
        id: 'step2-highlevel',
        title: 'Step 2: High-Level Design & Core APIs (10-12 Mins)',
        summary: 'Draw the end-to-end happy path flow and outline the core API endpoints and data model.',
        keyConcepts: [
          'Draw client -> DNS/CDN -> Load Balancer -> API Gateway -> Core Service -> Database & Cache.',
          'Define 2-3 primary REST/gRPC endpoints with parameters and return payloads.',
          'Define primary database tables / collections with primary keys and relationships.',
          'Trace one end-to-end read and one end-to-end write request.',
        ],
        interviewTips: 'Keep this simple first! Do not prematurely optimize with 15 queues and 8 microservices before the basic flow works.',
      },
      {
        id: 'step3-deepdive',
        title: 'Step 3: Deep Dive into Critical Components (18-20 Mins)',
        summary: 'The meat of the interview. Tackle the hardest technical bottlenecks unique to this problem.',
        keyConcepts: [
          'Address the core bottleneck: How does it scale from 1,000 to 1,000,000 QPS?',
          'Database sharding and hot partitions (e.g. celebrity tweets).',
          'Caching layer: cache invalidation, cache stampede prevention.',
          'Asynchronous background processing with Kafka/RabbitMQ.',
        ],
        interviewTips: 'Lead the conversation! Say: "Now that we have the happy path, let\'s look at the write bottleneck when 100,000 users upload simultaneously."',
      },
      {
        id: 'step4-wrapup',
        title: 'Step 4: Wrap-up, Failure Modes & Trade-offs (3-5 Mins)',
        summary: 'Review single points of failure, edge cases, and future enhancements.',
        keyConcepts: [
          'Single Points of Failure (SPOFs): What happens if the primary DB crashes? What if Redis dies?',
          'Monitoring & Alerting: Key metrics (p99 latency, error rates, queue lag).',
          'Trade-offs made: Why did we pick MongoDB over PostgreSQL? Why eventual consistency?',
        ],
        interviewTips: 'Candidates who proactively discuss failure scenarios and their own architectural trade-offs get ranked highest by Staff+ interviewers.',
      },
    ],
  },
];
