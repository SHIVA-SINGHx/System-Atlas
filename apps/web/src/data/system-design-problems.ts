export interface SystemDesignProblem {
  slug: string;
  title: string;
  subtitle: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  companies: string[];
  estimatedTime: string;
  summary: string;
  requirements: {
    functional: string[];
    nonFunctional: string[];
    outOfScope: string[];
  };
  estimations: {
    assumptions: string[];
    readWriteRatio: string;
    trafficQps: {
      averageWrite: string;
      peakWrite: string;
      averageRead: string;
      peakRead: string;
    };
    storage: {
      perRecord: string;
      daily: string;
      fiveYear: string;
    };
    bandwidth: {
      incoming: string;
      outgoing: string;
    };
    cacheMemory: {
      dailyReadTraffic: string;
      eightyTwentyRule: string;
    };
  };
  architecture: {
    diagram: string;
    components: { name: string; role: string; tech: string }[];
    readFlow: string[];
    writeFlow: string[];
  };
  apiDesign: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    endpoint: string;
    description: string;
    requestBody?: string;
    responseBody: string;
  }[];
  dataModel: {
    storageChoice: string;
    rationale: string;
    tables: {
      name: string;
      primaryKey: string;
      indexes: string[];
      columns: { name: string; type: string; notes?: string }[];
    }[];
  };
  deepDives: {
    title: string;
    challenge: string;
    solution: string;
    keyTakeaway: string;
  }[];
  rubric: {
    mustHave: string[];
    goodToHave: string[];
    redFlags: string[];
    followUpQuestions: string[];
  };
}

export const SYSTEM_DESIGN_PROBLEMS: SystemDesignProblem[] = [
  {
    slug: 'design-url-shortener',
    title: 'Design a High-Throughput URL Shortener (TinyURL)',
    subtitle: 'A classic distributed systems interview problem focusing on ID generation and caching',
    difficulty: 'EASY',
    companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
    estimatedTime: '45 mins',
    summary: 'Design a scalable URL shortening service like TinyURL or Bitly that converts long URLs into compact 7-character aliases, redirects users with sub-10ms latency, and survives billions of records.',
    requirements: {
      functional: [
        'Given a long URL, generate a unique, short URL alias (e.g. https://tiny.url/7bX9qZ).',
        'When a user accesses a short URL, redirect them to the original long URL with HTTP 301/302.',
        'Users can optionally provide a custom alias (e.g. https://tiny.url/my-portfolio).',
        'Links expire after a default TTL (e.g. 2 years) or custom expiration date.',
      ],
      nonFunctional: [
        'Ultra-Low Latency: Redirection must complete in < 15ms (p99).',
        'High Availability: 99.99% uptime (redirections must never fail).',
        'Read-Heavy Workload: 100:1 read-to-write ratio.',
        'Unpredictable URL generation: Short aliases must not be easily guessable (anti-scraping).',
      ],
      outOfScope: ['Real-time click analytics & heatmaps', 'User billing and paid custom domain mapping'],
    },
    estimations: {
      assumptions: [
        '100 Million new URLs created per month (Writes).',
        '100:1 Read-to-Write ratio = 10 Billion URL redirections per month (Reads).',
        'Service lifetime = 5 years.',
        'Average URL mapping entry size = 500 bytes (long URL + short hash + timestamp + metadata).',
      ],
      readWriteRatio: '100:1 (Read-Heavy)',
      trafficQps: {
        averageWrite: '100M / (30 days × 86,400s) ≈ 40 writes/sec',
        peakWrite: '40 × 2 ≈ 80 writes/sec',
        averageRead: '10B / (30 days × 86,400s) ≈ 3,850 reads/sec',
        peakRead: '3,850 × 2 ≈ 7,700 reads/sec',
      },
      storage: {
        perRecord: '500 bytes',
        daily: '3.3M URLs/day × 500 bytes ≈ 1.65 GB/day',
        fiveYear: '100M/month × 12 × 5 = 6 Billion URLs × 500 bytes ≈ 3 Terabytes',
      },
      bandwidth: {
        incoming: '40 writes/sec × 500 bytes ≈ 20 KB/sec',
        outgoing: '3,850 reads/sec × 500 bytes ≈ 1.9 MB/sec',
      },
      cacheMemory: {
        dailyReadTraffic: '10B / 30 = ~330 Million requests per day',
        eightyTwentyRule: '20% hot URLs account for 80% traffic: 330M × 20% × 500 bytes ≈ 33 GB RAM needed for Redis.',
      },
    },
    architecture: {
      diagram: `
  +--------------+         +------------------+         +-------------------------+
  | Client App / | ------> |   Global CDN     | ------> |  L7 Reverse Proxy       |
  | Web Browser  | <------ | (Edge Redirects) | <------ |  (NGINX / API Gateway)  |
  +--------------+         +------------------+         +-------------------------+
                                                                     |
                                             +-----------------------+-----------------------+
                                             |                                               |
                                             v (Read Flow)                                   v (Write Flow)
                                    +--------------------+                          +--------------------+
                                    | URL Redirect Svc   |                          | URL Generation Svc |
                                    +--------------------+                          +--------------------+
                                             |                                               |
                             +---------------+---------------+               +---------------+---------------+
                             |                               |               |                               |
                             v                               v               v                               v
                    +------------------+           +--------------------+ +--------------------+    +--------------------+
                    |  Redis Cluster   |           | Primary NoSQL DB   | | Key Gen Svc (KGS)  |    | Distributed Lock   |
                    | (LRU Cache 33GB) |           | (Dynamo / MongoDB) | | (Pre-gen Base62)   |    | (Redis / ZK)       |
                    +------------------+           +--------------------+ +--------------------+    +--------------------+
      `,
      components: [
        { name: 'API Gateway / NGINX', role: 'SSL termination, rate limiting, and request routing', tech: 'NGINX / Envoy' },
        { name: 'Key Generation Service (KGS)', role: 'Pre-generates random 7-character Base62 keys in batches to eliminate runtime collisions', tech: 'Custom Go/Rust Service + ZooKeeper' },
        { name: 'Redis Cache Cluster', role: 'In-memory cache for hot short-to-long URL mappings with LRU eviction', tech: 'Redis Cluster' },
        { name: 'NoSQL Database', role: 'Persistent key-value storage with horizontal sharding on shortKey', tech: 'Amazon DynamoDB / ScyllaDB' },
      ],
      readFlow: [
        '1. User clicks https://tiny.url/7bX9qZ -> Request reaches nearest CDN edge PoP.',
        '2. If cached at edge, CDN immediately issues HTTP 301/302 redirect.',
        '3. If edge cache misses, request reaches API Gateway -> URL Redirect Service.',
        '4. Service queries Redis cache. If HIT (95%+ likelihood), return long URL in < 5ms.',
        '5. If cache MISS, query DynamoDB by short_url key, write entry to Redis, and redirect.',
      ],
      writeFlow: [
        '1. User submits long URL -> API Gateway verifies rate limit and input validity.',
        '2. URL Generation Service requests a pre-generated 7-character key from Key Generation Service (KGS).',
        '3. Service inserts { shortKey: "7bX9qZ", originalUrl, userId, createdAt, expiresAt } into DynamoDB.',
        '4. Service warms Redis cache with the new mapping.',
        '5. Returns shortened URL to user with HTTP 201 Created.',
      ],
    },
    apiDesign: [
      {
        method: 'POST',
        endpoint: '/api/v1/urls',
        description: 'Create a new shortened URL alias',
        requestBody: '{\n  "originalUrl": "https://example.com/very/long/article?id=9876",\n  "customAlias": "my-article", // optional\n  "expiresAt": "2028-01-01T00:00:00Z" // optional\n}',
        responseBody: '{\n  "shortUrl": "https://tiny.url/7bX9qZ",\n  "originalUrl": "https://example.com/very/long/article?id=9876",\n  "createdAt": "2026-11-23T11:00:00Z",\n  "expiresAt": "2028-11-23T11:00:00Z"\n}',
      },
      {
        method: 'GET',
        endpoint: '/:shortKey',
        description: 'Redirects user to original long URL',
        responseBody: 'HTTP/1.1 302 Found\nLocation: https://example.com/very/long/article?id=9876\nCache-Control: private, max-age=300',
      },
    ],
    dataModel: {
      storageChoice: 'NoSQL Key-Value Store (DynamoDB / Cassandra)',
      rationale: 'We only require simple primary-key lookups (shortKey -> originalUrl). No relational joins or complex transactions are needed, and NoSQL provides predictable single-digit millisecond horizontal scaling for 6 Billion records.',
      tables: [
        {
          name: 'url_mappings',
          primaryKey: 'short_key (Partition Key)',
          indexes: ['user_id-created_at-index (GSI)'],
          columns: [
            { name: 'short_key', type: 'VARCHAR(7)', notes: 'Base62 encoded unique primary key' },
            { name: 'original_url', type: 'VARCHAR(2048)', notes: 'Full original destination' },
            { name: 'user_id', type: 'UUID', notes: 'Creator identifier' },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'expires_at', type: 'TIMESTAMP', notes: 'TTL for automatic deletion' },
          ],
        },
      ],
    },
    deepDives: [
      {
        title: 'Key Generation: Base62 vs MD5 Hashing vs KGS',
        challenge: 'Using MD5 or SHA256 of the long URL produces a 128-bit hash. Taking the first 7 chars leads to high collision probability. Checking the DB for collisions on every write requires costly read-before-write cycles.',
        solution: 'Implement a standalone Key Generation Service (KGS). KGS pre-generates billions of 7-char Base62 combinations (62^7 = 3.52 Trillion combinations) and stores them in memory/data store with two tables: "used_keys" and "unused_keys". When a URL arrives, KGS hands out an unused key instantly in O(1) with zero collisions.',
        keyTakeaway: 'KGS completely decouples key creation from request handling, turning write operations into guaranteed conflict-free single inserts.',
      },
      {
        title: 'HTTP 301 (Permanent) vs HTTP 302 (Temporary) Redirects',
        challenge: 'Interviewers always ask whether to return HTTP 301 or 302.',
        solution: 'HTTP 301 redirects are cached permanently by browsers, subsequent clicks never reach our servers (reducing server load, but making click analytics impossible). HTTP 302 redirects force the browser to check our server every single time, enabling click tracking at the expense of higher server load.',
        keyTakeaway: 'State to the interviewer: "Use 302 if real-time click metrics are required; use 301 if maximizing server offload is the top priority."',
      },
    ],
    rubric: {
      mustHave: [
        'Correct Base62 math: 62^7 = ~3.5 Trillion combinations.',
        'Explaining the 301 vs 302 redirect trade-off.',
        'Redis cache sizing using the 80/20 Pareto principle (~33 GB).',
        'Collision handling strategy (KGS or distributed Snowflake sequence).',
      ],
      goodToHave: [
        'Bloom filters to eliminate DB hits for non-existent short URLs.',
        'CDN edge redirect caching with short Cache-Control headers.',
        'Database TTL attributes for zero-cost expiration.',
      ],
      redFlags: [
        'Using auto-increment integer IDs without encoding (exposes business volume to competitors).',
        'Hashing the URL with MD5 and ignoring hash collision loops in database.',
        'Suggesting a relational DB with complex joins for simple key-value lookups.',
      ],
      followUpQuestions: [
        'How do you prevent a malicious user from generating millions of URLs and exhausting all Base62 keys?',
        'How do you handle custom aliases that collide with pre-generated KGS keys?',
        'If the Redis cache crashes, how do you prevent a cache stampede against the database?',
      ],
    },
  },
  {
    slug: 'design-instagram',
    title: 'Design Instagram / Photo Sharing & Social Newsfeed',
    subtitle: 'Master feed generation, fan-out on write vs read, and object storage',
    difficulty: 'HARD',
    companies: ['Meta', 'Pinterest', 'ByteDance', 'Twitter'],
    estimatedTime: '45 mins',
    summary: 'Design a photo sharing social platform where 500 million daily active users upload photos, follow other users, and view a personalized chronological/ranked home feed with sub-200ms latency.',
    requirements: {
      functional: [
        'Users can upload photos with captions.',
        'Users can follow other users.',
        'Users have a home feed showing recent photos from people they follow.',
        'Users can search for photos based on captions or tags.',
      ],
      nonFunctional: [
        'Low Feed Latency: Generating and rendering the home feed in < 200ms.',
        'High Availability: 99.99% uptime for feed reads.',
        'Reliability: Uploaded photos must never be lost (11 nines durability).',
        'Eventual Consistency: Followers can see new posts within 5 seconds.',
      ],
      outOfScope: ['Live video streaming', 'Direct messaging / chat', 'Stories with 24-hr ephemerality'],
    },
    estimations: {
      assumptions: [
        '500 Million Daily Active Users (DAU).',
        '50 Million new photos uploaded per day (10% of users post daily).',
        'Average photo file size after compression = 2 MB.',
        'Each user views their feed 5 times a day (2.5 Billion feed queries/day).',
      ],
      readWriteRatio: '50:1 (Read-Heavy)',
      trafficQps: {
        averageWrite: '50M / 86,400s ≈ 580 photo uploads/sec',
        peakWrite: '580 × 2 ≈ 1,200 uploads/sec',
        averageRead: '2.5B / 86,400s ≈ 29,000 feed requests/sec',
        peakRead: '29,000 × 2 ≈ 58,000 requests/sec',
      },
      storage: {
        perRecord: '2 MB image + 1 KB metadata',
        daily: '50M × 2 MB ≈ 100 Terabytes / day',
        fiveYear: '100 TB/day × 365 × 5 ≈ 182 Petabytes across 5 years',
      },
      bandwidth: {
        incoming: '580 uploads/sec × 2 MB ≈ 1.16 GB/sec ingress',
        outgoing: '29,000 reads/sec × 200 KB (feed thumbnails) ≈ 5.8 GB/sec egress',
      },
      cacheMemory: {
        dailyReadTraffic: '500M users × 5 feed views',
        eightyTwentyRule: 'Cache top 20% of users pre-computed feeds in Redis: 100M users × 800 post IDs × 8 bytes ≈ 640 GB RAM across a Redis cluster.',
      },
    },
    architecture: {
      diagram: `
  +--------------+         +------------------+         +-----------------------+
  | Client App   | ------> |   Global CDN     | ------> |  API Gateway & Auth   |
  | (iOS/Android)| <------ | (Image Delivery) | <------ |  (Envoy / Rate Limit) |
  +--------------+         +------------------+         +-----------------------+
                                                                    |
                                        +---------------------------+---------------------------+
                                        |                                                       |
                                        v (Photo Upload Flow)                                   v (Feed View Flow)
                              +--------------------+                                  +--------------------+
                              |  Upload Service    |                                  |    Feed Service    |
                              +--------------------+                                  +--------------------+
                                        |                                                       |
                                        | Direct S3 Upload                                      | Checks Redis
                                        v                                                       v
                             +---------------------+                                  +--------------------+
                             | Object Storage (S3) |                                  | Redis Feed Cache   |
                             | (Original & Thumbs) |                                  | (Sorted Sets)      |
                             +---------------------+                                  +--------------------+
                                        |                                                       ^
                                        v (Publishes Event)                                     | Updates Feed
                             +---------------------+                                            |
                             | Apache Kafka        | -------------------------------------------+
                             | (photo_uploaded)    | (Fanout Workers: write to active followers)
                             +---------------------+
                                        |
                                        v
                             +---------------------+
                             | Photo & User DB     |
                             | (PostgreSQL / TiDB) |
                             +---------------------+
      `,
      components: [
        { name: 'Amazon S3 / Blob Storage', role: 'Immutable photo storage with multi-region replication and 99.999999999% durability', tech: 'AWS S3 / GCS' },
        { name: 'Apache Kafka', role: 'Event broker buffering photo uploads and triggering asynchronous fan-out workers', tech: 'Apache Kafka' },
        { name: 'Redis Feed Cache', role: 'Stores pre-computed user feed timelines as Sorted Sets (key=userId, score=timestamp, value=photoId)', tech: 'Redis Cluster' },
        { name: 'Metadata Database', role: 'Sharded database storing users, posts, and followers graph', tech: 'PostgreSQL with Citus / CockroachDB' },
      ],
      readFlow: [
        '1. User opens app -> Request hits API Gateway -> Feed Service.',
        '2. Feed Service queries Redis Feed Cache: ZREVRANGEBYSCORE feed:userId +inf -inf LIMIT 0 20.',
        '3. If cache HIT, returns top 20 photo IDs in < 10ms.',
        '4. Client fetches photo image binaries directly from CDN edge caches.',
        '5. If cache MISS, Feed Service fetches user followings from DB, pulls latest posts, merges & hydrates Redis.',
      ],
      writeFlow: [
        '1. Client requests a pre-signed S3 URL from Upload Service.',
        '2. Client uploads raw photo binary directly to S3 (bypassing app servers).',
        '3. S3 triggers Lambda to generate 3 thumbnails (small, medium, web).',
        '4. Upload Service saves post metadata to database and publishes "photo_created" event to Kafka.',
        '5. Feed Fan-out Workers consume Kafka event: look up author followers. For active followers, append photo ID to their Redis feed timeline.',
      ],
    },
    apiDesign: [
      {
        method: 'POST',
        endpoint: '/api/v1/posts',
        description: 'Upload post metadata after client sends binary to S3 pre-signed URL',
        requestBody: '{\n  "s3Key": "photos/2026/11/abc-123.jpg",\n  "caption": "Exploring distributed systems!",\n  "tags": ["tech", "architecture"]\n}',
        responseBody: '{\n  "postId": "p_8849201",\n  "photoUrl": "https://cdn.instagram.com/photos/2026/11/abc-123.jpg",\n  "createdAt": "2026-11-23T11:00:00Z"\n}',
      },
      {
        method: 'GET',
        endpoint: '/api/v1/feed?page=1&limit=20',
        description: 'Fetch personalized home feed',
        responseBody: '{\n  "posts": [\n    {\n      "postId": "p_8849201",\n      "author": { "userId": "u_99", "username": "alex" },\n      "photoUrl": "https://cdn.instagram.com/photos/2026/11/abc-123.jpg",\n      "likesCount": 142,\n      "createdAt": "2026-11-23T11:00:00Z"\n    }\n  ],\n  "nextCursor": "eyJ0aW1lIjoxNz..."\n}',
      },
    ],
    dataModel: {
      storageChoice: 'Hybrid: PostgreSQL (Sharded by UserID) + S3 (Images) + Redis (Feeds)',
      rationale: 'User profiles and follower relations are relational. Pre-signed S3 URLs take heavy image payloads off application servers. Redis Sorted Sets store feed timelines for O(log(N)+M) retrieval.',
      tables: [
        {
          name: 'users',
          primaryKey: 'user_id',
          indexes: ['username_unique_idx'],
          columns: [
            { name: 'user_id', type: 'UUID' },
            { name: 'username', type: 'VARCHAR(50)' },
            { name: 'email', type: 'VARCHAR(100)' },
            { name: 'created_at', type: 'TIMESTAMP' },
          ],
        },
        {
          name: 'posts',
          primaryKey: 'post_id',
          indexes: ['user_id_created_at_idx'],
          columns: [
            { name: 'post_id', type: 'UUID' },
            { name: 'user_id', type: 'UUID', notes: 'Author FK' },
            { name: 'image_s3_url', type: 'VARCHAR(512)' },
            { name: 'caption', type: 'TEXT' },
            { name: 'created_at', type: 'TIMESTAMP' },
          ],
        },
        {
          name: 'follows',
          primaryKey: '(follower_id, followee_id)',
          indexes: ['followee_id_idx'],
          columns: [
            { name: 'follower_id', type: 'UUID' },
            { name: 'followee_id', type: 'UUID' },
            { name: 'created_at', type: 'TIMESTAMP' },
          ],
        },
      ],
    },
    deepDives: [
      {
        title: 'Feed Generation: Fan-out on Write vs Fan-out on Read (The Celebrity Problem)',
        challenge: 'When a regular user posts, writing to 200 followers feeds (Fan-out on Write / Push) is fast. But when Cristiano Ronaldo (600M followers) posts, pushing 600M Redis writes creates a massive write stampede that chokes the pipeline.',
        solution: 'Implement a Hybrid Model: Regular users (followers < 25,000) use Fan-out on Write. Celebrity users (followers > 25,000) DO NOT fan out. Instead, when a user opens their feed, the Feed Service reads their personal pre-computed timeline AND pulls recent posts from celebrities they follow (Fan-out on Read), then merges them in memory.',
        keyTakeaway: 'The Hybrid Push/Pull model is the gold standard answer that top Meta/Twitter interviewers look for.',
      },
      {
        title: 'Direct Client Uploads via Pre-signed S3 URLs',
        challenge: 'If 580 users upload 2MB photos per second through application servers, the app cluster must handle 1.16 GB/sec of ingress traffic, tying up connection threads.',
        solution: 'Clients ask the server for a cryptographically signed Amazon S3 pre-signed URL with a 5-minute expiration. The client uploads the binary directly to S3. S3 emits an S3:ObjectCreated event to Kafka/SQS to trigger asynchronous processing.',
        keyTakeaway: 'Always offload media upload binaries directly to Object Storage rather than proxying through application servers.',
      },
    ],
    rubric: {
      mustHave: [
        'Separating photo storage (S3) from metadata (DB).',
        'Comparing Fan-out on write vs Fan-out on read.',
        'Explaining the Celebrity / Hot User problem and the Hybrid solution.',
        'Using Redis Sorted Sets with epoch timestamps as scores for chronological feeds.',
      ],
      goodToHave: [
        'Pre-signed S3 URLs for zero-proxy media uploads.',
        'Cursor-based pagination instead of Offset-based pagination.',
        'Client-side image compression before upload.',
      ],
      redFlags: [
        'Storing image binaries directly in a relational database BLOB column.',
        'Querying `SELECT * FROM posts WHERE user_id IN (SELECT followee_id FROM follows)` in real time on every feed view.',
        'Using Fan-out on write for users with 50+ million followers.',
      ],
      followUpQuestions: [
        'How would you transition from a pure chronological feed to a machine learning ranked feed?',
        'How do you handle users who have been inactive for over 3 months so they don\'t consume Redis memory?',
        'How would you implement Instagram Stories that disappear after 24 hours?',
      ],
    },
  },
  {
    slug: 'design-youtube',
    title: 'Design YouTube / Video Streaming Platform',
    subtitle: 'Video chunking, async transcoding pipelines, and adaptive bitrate streaming (HLS)',
    difficulty: 'HARD',
    companies: ['Google', 'Netflix', 'Amazon Prime', 'Hulu'],
    estimatedTime: '45 mins',
    summary: 'Design a global video streaming platform like YouTube or Netflix supporting video uploads, background chunked transcoding into multiple resolutions, global CDN distribution, and smooth adaptive bitrate streaming.',
    requirements: {
      functional: [
        'Content creators can upload long videos (up to 4K resolution, 10 GB size).',
        'Viewers can stream videos smoothly with minimal buffering.',
        'Viewers can search videos by title and keywords.',
        'Viewers can like, comment, and view video view counts.',
      ],
      nonFunctional: [
        'Minimal Playback Buffering: Video playback must start in < 500ms.',
        'Adaptive Bitrate: Automatically switch resolution (360p, 720p, 1080p, 4K) based on client network bandwidth.',
        'High Durability: Uploaded master video files must never be corrupted or lost.',
        'High Read Availability: 99.99% availability for video playback.',
      ],
      outOfScope: ['Live video broadcasting (WebRTC / RTMP)', 'Content copyright fingerprinting (Content ID)', 'Recommendation algorithm deep dive'],
    },
    estimations: {
      assumptions: [
        '1 Billion Daily Active Users (DAU).',
        '10 Million hours of video watched per day.',
        '500,000 new videos uploaded per day.',
        'Average video length = 10 minutes. Average master video size = 500 MB.',
      ],
      readWriteRatio: '200:1 (Extreme Read-Heavy)',
      trafficQps: {
        averageWrite: '500,000 / 86,400s ≈ 6 video uploads/sec',
        peakWrite: '6 × 3 ≈ 18 uploads/sec',
        averageRead: '10M hours / 24 hrs ≈ 416,000 concurrent streaming users',
        peakRead: '416,000 × 2 ≈ 830,000 concurrent video streams',
      },
      storage: {
        perRecord: '500 MB master + 1 GB across transcoded formats (240p, 360p, 720p, 1080p, 4K) ≈ 1.5 GB total',
        daily: '500,000 videos × 1.5 GB ≈ 750 Terabytes / day',
        fiveYear: '750 TB/day × 365 × 5 ≈ 1.36 Exabytes across 5 years',
      },
      bandwidth: {
        incoming: '6 uploads/sec × 500 MB ≈ 3 GB/sec',
        outgoing: '416,000 streams × 3 Mbps (average 1080p stream) ≈ 1.25 Terabits/sec (handled by CDN)',
      },
      cacheMemory: {
        dailyReadTraffic: 'Top 10-20% trending videos cached at regional CDN Edge Points of Presence (PoPs)',
        eightyTwentyRule: 'CDNs offload 95% of video chunk traffic from origin storage.',
      },
    },
    architecture: {
      diagram: `
  +--------------+         +-------------------------+         +-----------------------+
  | Client App   | ------> |      Cloud CDN          | ------> |  API Gateway & Auth   |
  | (Web/TV/App) | <------ | (HLS Video Chunks .ts)  | <------ |  (Envoy / Rate Limit) |
  +--------------+         +-------------------------+         +-----------------------+
                                                                            |
                                                +---------------------------+---------------------------+
                                                |                                                       |
                                                v (Video Upload Flow)                                   v (Metadata / Search)
                                      +--------------------+                                  +--------------------+
                                      |  Upload Service    |                                  |  Metadata Service  |
                                      +--------------------+                                  +--------------------+
                                                |                                                       |
                                                v Multipart Upload                                      v
                                     +----------------------+                                 +--------------------+
                                     | Master S3 Storage    |                                 | Sharded DB & ES    |
                                     | (Raw .mp4 / .mov)    |                                 | (Cassandra + ES)   |
                                     +----------------------+                                 +--------------------+
                                                |
                                                v (Upload Complete Event)
                                     +----------------------+
                                     | Apache Kafka Queue   |
                                     +----------------------+
                                                |
                                                v (Chunking & Transcoding)
                                     +----------------------+
                                     | Transcoder Workers   | =====> Splits into 5s chunks (.ts)
                                     | (FFmpeg on GPU/K8s)  | =====> Encodes 360p, 720p, 1080p, 4K
                                     +----------------------+ =====> Generates master .m3u8 playlist
                                                |
                                                v
                                     +----------------------+
                                     | Transcoded Video S3  |
                                     | (Chunks + Playlists) |
                                     +----------------------+
      `,
      components: [
        { name: 'S3 Raw Storage', role: 'Receives multipart uploads of raw master video files', tech: 'AWS S3 Glacier / Standard' },
        { name: 'Distributed Transcoding Cluster', role: 'Splits raw videos into 5-second segments and encodes into multiple bitrates/resolutions', tech: 'FFmpeg + Kubernetes GPU Workers' },
        { name: 'Transcoded S3 Bucket', role: 'Hosts segmented .ts chunk files and HLS .m3u8 manifest files', tech: 'AWS S3 Standard' },
        { name: 'Global Video CDN', role: 'Caches 5-second video chunks at global edge locations close to viewers', tech: 'Cloudflare / Akamai / Fastly' },
      ],
      readFlow: [
        '1. User clicks video -> Client requests master playlist: GET /api/v1/videos/:id/master.m3u8.',
        '2. Master playlist returns available resolutions (360p, 720p, 1080p) and chunk playlist URLs.',
        '3. Video player detects user connection speed and requests initial 720p chunks from CDN.',
        '4. CDN serves static 5-second .ts segments directly from edge memory.',
        '5. If client network slows down, player seamlessly requests the next 5-second segment at 360p.',
      ],
      writeFlow: [
        '1. Creator initiates upload -> Upload Service initializes S3 Multipart Upload.',
        '2. Client uploads video in 10 MB chunks directly to S3 with resume capability.',
        '3. S3 emits completion event to Kafka topic "video_uploaded".',
        '4. Transcoding DAG Worker chunks video into 5-second slices and transcodes in parallel across GPU worker pods.',
        '5. Generated chunks and .m3u8 manifests are stored in S3 and pushed to CDN.',
      ],
    },
    apiDesign: [
      {
        method: 'POST',
        endpoint: '/api/v1/videos/upload-session',
        description: 'Initialize a multipart upload session for large video files',
        requestBody: '{\n  "title": "System Design Masterclass",\n  "fileSize": 4294967296,\n  "contentType": "video/mp4"\n}',
        responseBody: '{\n  "uploadId": "up_771829",\n  "chunkSize": 10485760,\n  "signedUrls": ["https://s3...part=1", "https://s3...part=2"]\n}',
      },
      {
        method: 'GET',
        endpoint: '/api/v1/videos/:id/manifest.m3u8',
        description: 'Returns HLS master playlist for adaptive bitrate streaming',
        responseBody: '#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360\n360p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720\n720p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080\n1080p.m3u8',
      },
    ],
    dataModel: {
      storageChoice: 'Polyglot: Object Storage (Videos) + Apache Cassandra (Metadata) + Elasticsearch (Search)',
      rationale: 'Video files are strictly binary blobs requiring distributed object storage. Video metadata (views, comments, likes) has high write velocity suited for Cassandra. Search queries require full-text inverted indexes in Elasticsearch.',
      tables: [
        {
          name: 'videos',
          primaryKey: 'video_id',
          indexes: ['channel_id_idx', 'created_at_idx'],
          columns: [
            { name: 'video_id', type: 'UUID' },
            { name: 'channel_id', type: 'UUID' },
            { name: 'title', type: 'VARCHAR(255)' },
            { name: 'description', type: 'TEXT' },
            { name: 'duration_seconds', type: 'INT' },
            { name: 'status', type: 'VARCHAR(20)', notes: 'PROCESSING | READY | FAILED' },
            { name: 'hls_manifest_url', type: 'VARCHAR(512)' },
          ],
        },
        {
          name: 'video_stats',
          primaryKey: 'video_id',
          indexes: [],
          columns: [
            { name: 'video_id', type: 'UUID' },
            { name: 'views_count', type: 'COUNTER', notes: 'Distributed counter' },
            { name: 'likes_count', type: 'COUNTER' },
          ],
        },
      ],
    },
    deepDives: [
      {
        title: 'Adaptive Bitrate Streaming (HLS & MPEG-DASH)',
        challenge: 'A single monolithic MP4 file cannot adapt to fluctuating mobile connections, causing perpetual buffering wheels.',
        solution: 'Use HTTP Live Streaming (HLS). Videos are broken into hundreds of small 5-second chunk files (.ts) encoded at varying bitrates. A master .m3u8 manifest lists all bitrates. The client video player constantly measures download speeds: if bandwidth drops, it fetches the next 5-second chunk at 480p instead of 1080p, guaranteeing zero buffering.',
        keyTakeaway: 'Always explain HLS/DASH chunking rather than serving static MP4 files directly.',
      },
      {
        title: 'View Count Counter Scaling: Solving Lock Contention',
        challenge: 'When a viral video receives 100,000 views per second, executing `UPDATE video SET views = views + 1` in SQL causes catastrophic row lock contention.',
        solution: 'Use buffered distributed counting: Client view beacons hit an API Gateway that writes to a Kafka topic. Stream processing workers (e.g. Apache Flink) aggregate view counts in memory windows (e.g., 5 seconds) and flush batch increments (`UPDATE video SET views = views + 5000`) to Cassandra/Redis.',
        keyTakeaway: 'Never execute synchronous database writes for high-frequency counters. Always batch via message queues.',
      },
    ],
    rubric: {
      mustHave: [
        'Explaining HLS or MPEG-DASH with master playlists and chunking.',
        'Decoupling raw video upload from transcoding via message queues.',
        'Using CDN edge caching for static video segments.',
        'S3 multipart uploads with resume capability.',
      ],
      goodToHave: [
        'Distributed counter buffering for viral view counts.',
        'Cold storage tiering (moving old unviewed videos from S3 Standard to S3 Glacier).',
        'Elasticsearch cluster for fast video title/tag search.',
      ],
      redFlags: [
        'Attempting to transcode a 10 GB video synchronously in the HTTP upload request.',
        'Serving raw 1080p MP4 files directly from application servers instead of a CDN.',
        'Storing video binaries in a database.',
      ],
      followUpQuestions: [
        'How would you implement deduplication so identical uploaded videos are not transcoded twice?',
        'How do you handle geographical content licensing and DRM (Widevine / FairPlay)?',
        'How would you design a thumbnail scrubber preview bar for the video seeker?',
      ],
    },
  },
  {
    slug: 'design-whatsapp',
    title: 'Design WhatsApp / Real-Time Messaging & Chat',
    subtitle: 'Persistent WebSockets, presence servers, and end-to-end encryption delivery',
    difficulty: 'HARD',
    companies: ['Meta', 'Discord', 'Slack', 'Telegram'],
    estimatedTime: '45 mins',
    summary: 'Design a highly reliable, low-latency messaging platform like WhatsApp or Discord supporting 1-on-1 and group chats, online/offline presence tracking, and message delivery receipts (Sent, Delivered, Read).',
    requirements: {
      functional: [
        'Real-time 1-on-1 instant messaging with < 100ms delivery.',
        'Message delivery receipts: Sent (single check), Delivered (double check), Read (blue check).',
        'Support for small group chats (up to 256 members).',
        'Online presence tracking (Online, Last seen at...).',
      ],
      nonFunctional: [
        'Ultra-Low Latency: Message delivery in < 100ms when both users are online.',
        'Guaranteed Delivery: Messages must never be lost, even if recipient is offline.',
        'High Concurrency: Support 100+ Million simultaneous open WebSocket connections.',
        'End-to-End Encryption: Server acts as a blind relay and cannot read plaintext content.',
      ],
      outOfScope: ['Voice/Video calling (WebRTC media relay)', 'Channel broadcast feeds like Telegram'],
    },
    estimations: {
      assumptions: [
        '1 Billion Daily Active Users (DAU).',
        'Each user sends an average of 40 messages per day (40 Billion messages/day).',
        'Average message text size = 100 bytes.',
        '100 Million peak concurrent connections.',
      ],
      readWriteRatio: '1:1 (Each sent message is read once)',
      trafficQps: {
        averageWrite: '40B / 86,400s ≈ 460,000 messages/sec',
        peakWrite: '460,000 × 2 ≈ 920,000 messages/sec',
        averageRead: '460,000 messages/sec delivered to recipients',
        peakRead: '920,000 messages/sec delivered at peak',
      },
      storage: {
        perRecord: '100 bytes text + 100 bytes metadata ≈ 200 bytes',
        daily: '40B × 200 bytes ≈ 8 Terabytes / day',
        fiveYear: '8 TB/day × 365 × 5 ≈ 14.6 Petabytes across 5 years',
      },
      bandwidth: {
        incoming: '460,000 msg/sec × 200 bytes ≈ 92 MB/sec',
        outgoing: '460,000 msg/sec × 200 bytes ≈ 92 MB/sec',
      },
      cacheMemory: {
        dailyReadTraffic: 'Session state for 100M concurrent users: { userId -> connectionServerId }',
        eightyTwentyRule: '100M entries × 64 bytes ≈ 6.4 GB RAM in Redis cluster for user connection mappings.',
      },
    },
    architecture: {
      diagram: `
  +--------------+                                      +--------------+
  | Sender App   |                                      | Recipient App|
  +--------------+                                      +--------------+
        |                                                     ^
        | WebSocket                                           | WebSocket
        v                                                     |
  +------------------+                                  +------------------+
  | Chat Gateway Svc |                                  | Chat Gateway Svc |
  | (Gateway Pod #1) |                                  | (Gateway Pod #2) |
  +------------------+                                  +------------------+
        |                                                     ^
        |                                                     | Pushes message
        v                                                     |
  +------------------------------------------------------------------------+
  |                      Distributed Message Router                        |
  +------------------------------------------------------------------------+
        |                                     |
        v (Lookup recipient's gateway)        v (If recipient is offline)
  +--------------------+             +--------------------+
  | User Session Store |             | Offline Message DB |
  | (Redis / DynamoDB) |             | (Cassandra / Scylla|
  +--------------------+             +--------------------+
        |                                     |
        v                                     v
  +--------------------+             +--------------------+
  | Presence Service   |             | Push Notification  |
  | (Heartbeat Monitor)|             | (Apple APNs / FCM) |
  +--------------------+             +--------------------+
      `,
      components: [
        { name: 'Chat Gateway (WebSocket)', role: 'Maintains persistent duplex TCP/WebSocket connections with mobile clients', tech: 'Node.js / Go / Erlang BEAM' },
        { name: 'Session & Connection Registry', role: 'Maintains mapping of active userId to the specific Gateway Pod holding their socket', tech: 'Redis Cluster' },
        { name: 'Message Storage Engine', role: 'Durable write-optimized message log for offline delivery and historical sync', tech: 'Apache Cassandra / ScyllaDB' },
        { name: 'Presence Service', role: 'Heartbeat-based online/last-seen tracking engine', tech: 'Redis Sorted Sets + Pub/Sub' },
      ],
      readFlow: [
        '1. When recipient reconnects to WebSocket, Chat Gateway queries Offline Message DB for unread messages.',
        '2. Messages are delivered in batches sorted by timestamp.',
        '3. Client acknowledges receipt -> Gateway updates status to "Delivered" and notifies sender.',
      ],
      writeFlow: [
        '1. Sender sends message over WebSocket -> Gateway Pod #1 assigns monotonic MessageID and timestamp.',
        '2. Gateway checks Session Registry: "Where is Recipient connected?".',
        '3. If ONLINE on Gateway Pod #2: Message is routed to Pod #2 and pushed down Recipient socket immediately.',
        '4. If OFFLINE: Message is saved to Offline Message DB and a push notification is queued via APNs/FCM.',
        '5. Gateway Pod #1 sends "Sent" receipt back to Sender.',
      ],
    },
    apiDesign: [
      {
        method: 'POST',
        endpoint: '/api/v1/messages (WebSocket Frame)',
        description: 'Send a direct message over active WebSocket connection',
        requestBody: '{\n  "recipientId": "usr_9981",\n  "contentPayload": "encrypted_base64_ciphertext...",\n  "clientMsgId": "uuid-v4-client"\n}',
        responseBody: '{\n  "msgId": "msg_001928491",\n  "status": "SENT",\n  "timestamp": 1774332900\n}',
      },
      {
        method: 'GET',
        endpoint: '/api/v1/presence/:userId',
        description: 'Fetch user online status and last seen timestamp',
        responseBody: '{\n  "userId": "usr_9981",\n  "isOnline": true,\n  "lastSeen": "2026-11-23T11:00:00Z"\n}',
      },
    ],
    dataModel: {
      storageChoice: 'Apache Cassandra / ScyllaDB (Wide-Column Store)',
      rationale: 'Chat messages are write-heavy, immutable append-only logs queried by (conversation_id, message_id). Cassandra\'s LSM-tree architecture provides sub-millisecond writes with zero row lock contention.',
      tables: [
        {
          name: 'messages',
          primaryKey: '(conversation_id) WITH CLUSTERING ORDER BY (message_id ASC)',
          indexes: [],
          columns: [
            { name: 'conversation_id', type: 'UUID', notes: 'Partition Key' },
            { name: 'message_id', type: 'TIMEUUID', notes: 'Clustering Key (chronological)' },
            { name: 'sender_id', type: 'UUID' },
            { name: 'encrypted_content', type: 'BLOB' },
            { name: 'status', type: 'VARCHAR(20)', notes: 'SENT | DELIVERED | READ' },
          ],
        },
        {
          name: 'user_sessions',
          primaryKey: 'user_id',
          indexes: [],
          columns: [
            { name: 'user_id', type: 'UUID' },
            { name: 'gateway_host', type: 'VARCHAR(100)' },
            { name: 'last_heartbeat', type: 'TIMESTAMP' },
          ],
        },
      ],
    },
    deepDives: [
      {
        title: 'Maintaining 100M Concurrent WebSocket Connections',
        challenge: 'A single standard Linux server running Node or Java exhausts ephemeral ports and memory at ~50,000-100,000 open TCP connections.',
        solution: 'Scale horizontally using a Gateway Farm. Tune OS socket settings (`sysctl -w fs.file-max=2097152`, increase `ulimit -n`). Use lightweight connection runtimes (Go Goroutines or Erlang/Elixir BEAM processes consume only 2-4 KB per socket, allowing 1M connections per 64 GB server). Load balance incoming TCP connections with HAProxy / AWS NLB using Least Connections.',
        keyTakeaway: 'Layer 4 Load Balancers with long keep-alive timeouts are mandatory for persistent WebSocket architectures.',
      },
      {
        title: 'Presence Engine: Preventing Fan-out Stampedes',
        challenge: 'If a user has 500 contacts and goes online, broadcasting 500 status notifications for every connection toggle overwhelms the network.',
        solution: 'Do not broadcast presence changes eagerly. Use a Heartbeat + Pull Model: Client sends a heartbeat ping every 30 seconds to Redis (`SETEX presence:userId 40 "online"`). When a user opens a chat screen with a friend, the app pulls the friend\'s presence on demand.',
        keyTakeaway: 'Replace push presence broadcasts with ephemeral heartbeat keys and lazy on-demand lookups.',
      },
    ],
    rubric: {
      mustHave: [
        'Explaining persistent bi-directional WebSockets vs HTTP polling.',
        'Session Registry (Redis) mapping userId -> Gateway Pod.',
        'Offline message storage and replay flow.',
        'Message delivery status transitions (Sent -> Delivered -> Read).',
      ],
      goodToHave: [
        'Erlang/Elixir BEAM or Go concurrency model for massive socket counts.',
        'Heartbeat mechanism with TTL for presence status.',
        'Group messaging fan-out optimizations for large groups.',
      ],
      redFlags: [
        'Using HTTP short-polling for chat messages.',
        'Storing chat history in a traditional relational database without sharding.',
        'Assuming the recipient is always connected to the same server as the sender.',
      ],
      followUpQuestions: [
        'How would you support group chats with 1,000+ members without causing socket broadcast bottlenecks?',
        'How do you guarantee end-to-end encryption using the Signal Protocol (Double Ratchet)?',
        'How do you guarantee message ordering when mobile clients have clock drift?',
      ],
    },
  },
  {
    slug: 'design-rate-limiter',
    title: 'Design a Distributed Rate Limiting Engine',
    subtitle: 'Sliding window algorithms, multi-region synchronization, and DDoS mitigation',
    difficulty: 'MEDIUM',
    companies: ['Stripe', 'Cloudflare', 'AWS', 'GitHub'],
    estimatedTime: '45 mins',
    summary: 'Design a high-throughput, low-latency distributed rate limiter capable of evaluating millions of API requests per second against configurable quota tiers with sub-2ms overhead.',
    requirements: {
      functional: [
        'Limit requests based on client IP, authenticated User ID, or API Key.',
        'Return HTTP 429 Too Many Requests with informative headers (`Retry-After`, `X-RateLimit-Remaining`).',
        'Support multiple tier policies (e.g. 10 req/sec for Free tier, 1,000 req/sec for Enterprise).',
        'Support configurable window sizes (per second, per minute, per hour).',
      ],
      nonFunctional: [
        'Sub-Millisecond Overhead: The rate limiter must add < 2ms latency to API requests.',
        'Fault Tolerance (Fail Open): If the rate limiting cluster crashes, requests must pass through to avoid breaking the core business.',
        'Distributed Consistency: Accurate enforcement across multi-region edge gateways.',
      ],
      outOfScope: ['Web Application Firewall (WAF) rule inspection', 'Captchas and bot verification challenges'],
    },
    estimations: {
      assumptions: [
        '100 Million daily active API consumers.',
        '1 Billion total API requests per day.',
        'Peak traffic: 50,000 requests per second across all gateways.',
      ],
      readWriteRatio: '1:1 (Every request requires reading and incrementing counters)',
      trafficQps: {
        averageWrite: '1B / 86,400s ≈ 11,500 requests/sec',
        peakWrite: '11,500 × 4 ≈ 50,000 requests/sec',
        averageRead: '11,500 reads/sec',
        peakRead: '50,000 reads/sec',
      },
      storage: {
        perRecord: 'Key (client_id:window) + counter integer ≈ 64 bytes in Redis',
        daily: '100M active clients × 64 bytes ≈ 6.4 GB RAM',
        fiveYear: 'Ephemeral keys with 1-minute to 1-hour TTL, no long-term storage required.',
      },
      bandwidth: {
        incoming: '50,000 req/sec × 100 bytes ≈ 5 MB/sec internal Redis bandwidth',
        outgoing: '50,000 req/sec × 50 bytes ≈ 2.5 MB/sec',
      },
      cacheMemory: {
        dailyReadTraffic: '100M active users',
        eightyTwentyRule: 'A 3-node Redis cluster with 32 GB RAM easily holds all active rate limit windows.',
      },
    },
    architecture: {
      diagram: `
  +--------------+          +-------------------------------------------------+
  | Client App / | -------> |       API Gateway / Envoy Reverse Proxy         |
  | Third-Party  | <------- |  (Extracts Client IP / API Key / User Token)    |
  +--------------+          +-------------------------------------------------+
                                                     |
                                                     v (gRPC Check < 2ms)
                                            +--------------------+
                                            | Rate Limiter Svc   |
                                            +--------------------+
                                                     |
                                   +-----------------+-----------------+
                                   |                                   |
                                   v (Fast Path)                       v (Config Path)
                          +--------------------+              +--------------------+
                          | Redis Cluster      |              | Policy Database    |
                          | (Sliding Window    |              | (Tier Quota Rules  |
                          | Lua Scripts)       |              | PostgreSQL)        |
                          +--------------------+              +--------------------+
      `,
      components: [
        { name: 'API Gateway Middleware', role: 'Intercepts incoming HTTP requests, invokes rate check via gRPC before forwarding to microservices', tech: 'Envoy Proxy / NGINX' },
        { name: 'Rate Limiter Service', role: 'Stateless worker evaluating rate algorithms using atomic Redis Lua scripts', tech: 'Go / Rust' },
        { name: 'Redis Cluster', role: 'In-memory data store holding sliding window counters and token buckets with TTL', tech: 'Redis Cluster' },
        { name: 'Policy DB', role: 'Stores customer subscription tier quotas (e.g. Free=60/min, Pro=1000/min)', tech: 'PostgreSQL' },
      ],
      readFlow: [
        '1. Request hits API Gateway -> Middleware extracts client identifier (e.g. `client:usr_4492`).',
        '2. Gateway sends synchronous check to Rate Limiter Service.',
        '3. Rate Limiter executes atomic Lua script on Redis: `EVALSHA <sliding_window_script> 1 client:usr_4492 <limit> <window_size> <now>`.',
        '4. If counter <= limit: Redis increments counter, returns ALLOWED.',
        '5. Gateway attaches `X-RateLimit-Remaining: 42` and forwards to downstream microservices.',
      ],
      writeFlow: [
        '1. If counter > limit: Redis returns DENIED with retry timestamp.',
        '2. Gateway immediately terminates request, returning HTTP 429 Too Many Requests.',
        '3. Response includes `Retry-After: 12` header indicating seconds until window reset.',
      ],
    },
    apiDesign: [
      {
        method: 'POST',
        endpoint: '/api/v1/rate-limit/check (gRPC Internal)',
        description: 'Internal RPC called by API Gateway to evaluate request permission',
        requestBody: '{\n  "clientId": "usr_9981",\n  "tier": "PRO",\n  "cost": 1\n}',
        responseBody: '{\n  "allowed": true,\n  "limit": 1000,\n  "remaining": 842,\n  "resetInSeconds": 38\n}',
      },
    ],
    dataModel: {
      storageChoice: 'In-Memory Key-Value (Redis with Lua Scripting)',
      rationale: 'Sub-millisecond latency is the primary non-functional requirement. In-memory data structures with atomic Redis scripts guarantee thread safety and high throughput.',
      tables: [
        {
          name: 'Redis Keys',
          primaryKey: 'ratelimit:{clientId}:{window_timestamp}',
          indexes: [],
          columns: [
            { name: 'Key', type: 'STRING', notes: 'e.g. ratelimit:usr_9981:1774332900' },
            { name: 'Value', type: 'INTEGER', notes: 'Incremented atomically via INCR' },
            { name: 'TTL', type: 'EXPIRE', notes: 'Auto-evicted after window duration' },
          ],
        },
      ],
    },
    deepDives: [
      {
        title: 'Comparing Algorithms: Token Bucket vs Sliding Window Counter',
        challenge: 'Fixed Window counters suffer from the "Boundary Burst" flaw: if the limit is 100/min, a user sending 100 requests at 00:59 and 100 requests at 01:01 executes 200 requests in 2 seconds without violating the limit.',
        solution: 'Use the Sliding Window Counter algorithm. Calculate request weight by blending current window count with previous window count: `Count = (previous_count * (1 - time_into_current_window)) + current_count`. It provides smooth approximation with minimal memory (only 2 integer counters per user).',
        keyTakeaway: 'Always explain the boundary burst flaw of Fixed Window and why Sliding Window Counter is standard in production.',
      },
      {
        title: 'Atomic Execution with Redis Lua Scripts',
        challenge: 'Executing `GET counter` followed by `if counter < limit: INCR counter` has a critical race condition under concurrency: two simultaneous requests both read 99 and both increment to 100.',
        solution: 'Execute the logic inside an atomic Redis Lua script. Redis processes Lua scripts single-threaded in memory, guaranteeing zero race conditions without costly distributed locks.',
        keyTakeaway: 'Always use Redis Lua scripts or atomic transactions for rate limiter check-and-increment operations.',
      },
    ],
    rubric: {
      mustHave: [
        'Comparing algorithms: Token Bucket, Leaky Bucket, Fixed Window, Sliding Window.',
        'Explaining the Race Condition between GET and INCR and solving with Redis Lua.',
        'Handling Fail-Open policy: if rate limiter fails, traffic must not be blocked.',
        'Correct HTTP 429 response headers (`Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining`).',
      ],
      goodToHave: [
        'Sliding Window Counter mathematical approximation formula.',
        'Local in-memory token bucket cache in Envoy proxy to offload 80% of Redis calls.',
        'Multi-region synchronization strategies.',
      ],
      redFlags: [
        'Using a relational SQL database for rate limiting counters.',
        'Failing closed: dropping all user traffic when the Redis cache cluster is unavailable.',
        'Not addressing the boundary burst problem of Fixed Window.',
      ],
      followUpQuestions: [
        'How do you synchronize rate limit counters across multi-region datacenters (US-East and EU-West)?',
        'How would you allow burst traffic for microservices while keeping a strict average limit?',
        'How do you protect the rate limiter itself from being DDoSed by spoofed IP addresses?',
      ],
    },
  },
  {
    slug: 'design-notification-system',
    title: 'Design a Scalable Multi-Channel Notification Engine',
    subtitle: 'Priority queues, template engines, and deduplication for billions of messages',
    difficulty: 'HARD',
    companies: ['Uber', 'Airbnb', 'DoorDash', 'Netflix'],
    estimatedTime: '45 mins',
    summary: 'Design a centralized notification platform like Uber or Airbnb that sends millions of transactional and promotional push notifications, emails, and SMS messages with strict rate limits and deduplication.',
    requirements: {
      functional: [
        'Send notifications across 3 channels: Mobile Push (APNs/FCM), Email (SendGrid/SES), and SMS (Twilio).',
        'Support priority queues: Transactional (OTP, ride updates) delivered in < 5s; Promotional (discounts) can be delayed.',
        'User preference center: Users can opt in/out of specific channels and topics.',
        'Message deduplication: Prevent sending duplicate OTPs or payment notifications.',
      ],
      nonFunctional: [
        'High Reliability: Transactional notifications must have 99.999% delivery guarantee.',
        'Deduplication: No user receives the same notification twice within a short window.',
        'Extensibility: Easy to add new notification channels (e.g. WhatsApp, Slack) without rewriting core logic.',
      ],
      outOfScope: ['End-user chat messaging', 'Rich email WYSIWYG editor design'],
    },
    estimations: {
      assumptions: [
        '100 Million Daily Active Users.',
        '50 Million notifications sent per day.',
        '70% Push, 20% Email, 10% SMS.',
      ],
      readWriteRatio: 'Write-heavy pipeline',
      trafficQps: {
        averageWrite: '50M / 86,400s ≈ 580 notifications/sec',
        peakWrite: '580 × 5 ≈ 3,000 notifications/sec (during promotional bursts)',
        averageRead: 'N/A (Push/Outbound)',
        peakRead: 'N/A',
      },
      storage: {
        perRecord: 'Notification log entry: 500 bytes',
        daily: '50M × 500 bytes ≈ 25 GB / day',
        fiveYear: '25 GB × 365 × 5 ≈ 45 Terabytes across 5 years',
      },
      bandwidth: {
        incoming: '580 req/sec × 1 KB payload ≈ 580 KB/sec',
        outgoing: '3,000 req/sec to external third-party providers (APNs, SendGrid, Twilio)',
      },
      cacheMemory: {
        dailyReadTraffic: 'User notification preferences and device tokens',
        eightyTwentyRule: '100M active device tokens in Redis cache ≈ 10 GB RAM.',
      },
    },
    architecture: {
      diagram: `
  +------------------+          +------------------------+
  | Internal Services| -------> |  Notification Service  |
  | (Orders, Auth)   |          |  (Validation & Auth)   |
  +------------------+          +------------------------+
                                             |
                                +------------+------------+
                                |                         |
                                v                         v
                      +-------------------+     +-------------------+
                      | Deduplication Svc |     | User Prefs Cache  |
                      | (Redis Set with   |     | (Opt-in / Channels|
                      |  Idempotency Key) |     |  Redis + DB)      |
                      +-------------------+     +-------------------+
                                             |
                                             v
                      +---------------------------------------------+
                      |         Priority Message Queues (Kafka)     |
                      |   - High Priority: OTP, Security Alerts     |
                      |   - Medium Priority: Order Updates          |
                      |   - Low Priority: Marketing & Newsletters   |
                      +---------------------------------------------+
                                             |
                   +-------------------------+-------------------------+
                   |                         |                         |
                   v                         v                         v
        +--------------------+    +--------------------+    +--------------------+
        | Push Worker Pool   |    | Email Worker Pool  |    | SMS Worker Pool    |
        +--------------------+    +--------------------+    +--------------------+
                   |                         |                         |
                   v                         v                         v
          [ Apple APNs / FCM ]       [ SendGrid / AWS SES ]         [ Twilio ]
      `,
      components: [
        { name: 'Deduplication Guard', role: 'Checks Redis for recent duplicate notification fingerprints using idempotency keys', tech: 'Redis with TTL' },
        { name: 'Priority Kafka Queues', role: 'Separates time-critical OTP alerts from low-priority marketing blasts', tech: 'Apache Kafka' },
        { name: 'Channel Worker Pools', role: 'Dedicated autoscaling worker clusters managing third-party API rate limits and retries', tech: 'Node.js / Go on K8s' },
        { name: 'Notification Analytics DB', role: 'Audits every dispatch, delivery callback, and failure event', tech: 'PostgreSQL / ClickHouse' },
      ],
      readFlow: [
        '1. Third-party providers (SendGrid, Twilio) invoke webhook callbacks with delivery status.',
        '2. Webhook handler logs event (Delivered, Bounced, Opened) to ClickHouse analytics store.',
      ],
      writeFlow: [
        '1. Microservice invokes POST /api/v1/notifications with payload and idempotencyKey.',
        '2. Notification Service checks Redis for duplicate key. If key exists, reject duplicate.',
        '3. Check user preferences: verify recipient has not opted out of this topic or channel.',
        '4. Route message to high, medium, or low priority Kafka topic based on alert category.',
        '5. Dedicated channel worker consumes message, renders localized template, and calls vendor API with exponential backoff.',
      ],
    },
    apiDesign: [
      {
        method: 'POST',
        endpoint: '/api/v1/notifications',
        description: 'Dispatch a multi-channel notification',
        requestBody: '{\n  "recipientId": "usr_9981",\n  "type": "TRANSACTIONAL",\n  "templateId": "ORDER_CONFIRMATION",\n  "channels": ["PUSH", "EMAIL"],\n  "templateData": { "orderId": "ORD-9912", "amount": "$45.00" },\n  "idempotencyKey": "order_confirm_ORD-9912"\n}',
        responseBody: '{\n  "notificationId": "notif_7781920",\n  "status": "QUEUED",\n  "acceptedChannels": ["PUSH", "EMAIL"]\n}',
      },
    ],
    dataModel: {
      storageChoice: 'PostgreSQL (User Prefs & Templates) + Redis (Deduplication) + ClickHouse (Logs)',
      rationale: 'User preferences and template variables require relational integrity. Deduplication requires ultra-fast O(1) Redis SETNX checks. Delivery audit logs require columnar ClickHouse for aggregate delivery reports.',
      tables: [
        {
          name: 'notification_logs',
          primaryKey: 'id',
          indexes: ['recipient_id_created_at_idx', 'status_idx'],
          columns: [
            { name: 'id', type: 'UUID' },
            { name: 'recipient_id', type: 'UUID' },
            { name: 'channel', type: 'VARCHAR(20)' },
            { name: 'status', type: 'VARCHAR(20)', notes: 'QUEUED | SENT | DELIVERED | FAILED' },
            { name: 'idempotency_key', type: 'VARCHAR(128)' },
            { name: 'created_at', type: 'TIMESTAMP' },
          ],
        },
      ],
    },
    deepDives: [
      {
        title: 'Deduplication Engine: Preventing Double OTPs',
        challenge: 'Network timeouts between upstream services and the notification engine cause clients to retry, risking duplicate SMS and payment alerts.',
        solution: 'Generate a deterministic fingerprint: `hash(recipientId + eventType + entityId)`. When a request arrives, run `SET notification:fingerprint "1" NX EX 300` in Redis. If the key already exists, Redis returns null and the notification engine immediately drops the duplicate with HTTP 200 OK.',
        keyTakeaway: 'Always use Redis SETNX with an explicit TTL for idempotency deduplication.',
      },
      {
        title: 'Priority Inversion & Worker Starvation',
        challenge: 'A marketing team queues 10 million promotional emails. If all messages share one queue, critical OTP password reset emails wait hours behind marketing spam.',
        solution: 'Isolate queues by priority into separate Kafka topics: `notifications.high`, `notifications.medium`, `notifications.low`. Allocate dedicated worker pools to high-priority topics so OTP alerts are dispatched in milliseconds regardless of marketing volume.',
        keyTakeaway: 'Never mix high-urgency transactional traffic with bulk promotional traffic in the same queue.',
      },
    ],
    rubric: {
      mustHave: [
        'Separating queues by priority (Transactional vs Promotional).',
        'Deduplication mechanism with Redis idempotency keys.',
        'User preference opt-in/opt-out checking before queuing.',
        'Handling third-party provider rate limits with exponential backoff.',
      ],
      goodToHave: [
        'Circuit breakers for third-party vendors (e.g. failing over from SendGrid to AWS SES).',
        'Template hydration engine with i18n localization.',
        'Delivery receipt webhook callbacks.',
      ],
      redFlags: [
        'Calling external SMS/Email APIs synchronously in the HTTP request handler.',
        'Putting all messages in a single FIFO queue without priority separation.',
        'No retry strategy or dead letter queue (DLQ) for failed dispatches.',
      ],
      followUpQuestions: [
        'What happens when Twilio or SendGrid goes down? How do you implement automated vendor failover?',
        'How do you prevent a notification storm when a high-profile event occurs?',
        'How do you manage device token invalidation when users uninstall the app?',
      ],
    },
  },
];
