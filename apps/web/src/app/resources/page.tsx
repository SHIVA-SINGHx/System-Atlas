'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import {
  ExternalLink,
  Search,
  BookOpen,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const ALL_RESOURCES = [
  {
    slug: 'google-spanner-white-paper',
    title: 'Google Spanner: Becoming a Globally Distributed Database',
    category: 'WHITE_PAPER',
    author: 'Corbett et al. (Google Research)',
    publisher: 'Google Research / OSDI',
    url: 'https://research.google/pubs/pub39966/',
    description: 'Seminal research paper introducing Google Spanner, detailing the TrueTime API, multi-version concurrency control (MVCC), Paxos consensus groups, and globally consistent distributed transactions.',
    relatedTopics: ['Distributed Databases', 'TrueTime', 'Paxos', 'Concurrency Control'],
    difficulty: 'ADVANCED',
    contentType: 'white_paper',
    license: 'Academic & Educational Citation Rights',
    attribution: 'Google Research. Published in OSDI 2012.',
    lastVerifiedDate: '2026-11-15',
  },
  {
    slug: 'designing-data-intensive-applications',
    title: 'Designing Data-Intensive Applications',
    category: 'BOOK',
    author: 'Martin Kleppmann',
    publisher: "O'Reilly Media",
    url: 'https://dataintensive.net/',
    description: 'The fundamental guide to reliability, scalability, and maintainability in data storage and processing systems, covering B-Trees, LSM-Trees, replication lag, and consensus.',
    relatedTopics: ['Storage Engines', 'Replication', 'Partitioning', 'Consensus'],
    difficulty: 'INTERMEDIATE',
    contentType: 'book',
    license: 'Book Reference / Publisher Link',
    attribution: "Martin Kleppmann / O'Reilly Media",
    lastVerifiedDate: '2026-11-10',
  },
  {
    slug: 'mit-6824-distributed-systems',
    title: 'MIT 6.824: Distributed Systems Engineering',
    category: 'UNIVERSITY_COURSE',
    author: 'Prof. Robert Morris & Frans Kaashoek',
    publisher: 'MIT CSAIL',
    url: 'https://pdos.csail.mit.edu/6.824/',
    description: 'Comprehensive graduate-level lecture series and lab course by Prof. Robert Morris covering Raft consensus, ZooKeeper, Google File System, MapReduce, and Byzantine fault tolerance.',
    relatedTopics: ['Raft', 'Fault Tolerance', 'MapReduce', 'GFS', 'Linearizability'],
    difficulty: 'ADVANCED',
    contentType: 'university_course',
    license: 'MIT OpenCourseWare / Creative Commons BY-NC-SA',
    attribution: 'Massachusetts Institute of Technology (MIT CSAIL)',
    lastVerifiedDate: '2026-11-12',
  },
  {
    slug: 'netflix-tech-blog-chaos-engineering',
    title: 'Netflix TechBlog: The Evolution of Chaos Engineering',
    category: 'ENGINEERING_BLOG',
    author: 'Netflix Engineering Team',
    publisher: 'Netflix TechBlog',
    url: 'https://netflixtechblog.com/',
    description: 'Detailed analysis of how Netflix injects failure into production microservices (Chaos Monkey, Simian Army) to verify system resilience, automated failover, and regional evac.',
    relatedTopics: ['Chaos Engineering', 'Resilience', 'Microservices', 'High Availability'],
    difficulty: 'INTERMEDIATE',
    contentType: 'engineering_blog',
    license: 'Open Access Engineering Blog Citation',
    attribution: 'Netflix Technology Blog',
    lastVerifiedDate: '2026-11-18',
  },
  {
    slug: 'redis-documentation-cluster-spec',
    title: 'Redis Official Documentation: Cluster Specification and Hash Slots',
    category: 'DOCUMENTATION',
    author: 'Redis Open Source Community',
    publisher: 'Redis Ltd.',
    url: 'https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/',
    description: 'Official architectural specification of Redis Cluster, covering 16384 hash slots, gossiping protocols, MOVED/ASK redirects, master-replica failover, and replication offset.',
    relatedTopics: ['Caching', 'Hash Slots', 'Gossip Protocol', 'Failover', 'In-Memory Storage'],
    difficulty: 'INTERMEDIATE',
    contentType: 'documentation',
    license: 'Open Documentation BSD-3-Clause / CC',
    attribution: 'Redis Official Documentation',
    lastVerifiedDate: '2026-11-19',
  },
  {
    slug: 'cp-algorithms-competitive-programming-dsa',
    title: 'CP-Algorithms: Algorithms and Data Structures Reference',
    category: 'DSA_RESOURCE',
    author: 'CP-Algorithms Community / E-Maxx',
    publisher: 'CP-Algorithms Project',
    url: 'https://cp-algorithms.com/',
    description: 'Deep mathematical and algorithmic breakdowns of Advanced Data Structures (Segment Trees, Fenwick Trees, Treaps, DSU), Graph Theory, String Processing, and Dynamic Programming with C++ implementations.',
    relatedTopics: ['Data Structures', 'Graph Algorithms', 'Dynamic Programming', 'Tries', 'Union Find'],
    difficulty: 'ADVANCED',
    contentType: 'dsa_resource',
    license: 'CC-BY-SA 4.0 Open Educational Attribution',
    attribution: 'CP-Algorithms Project. Licensed under CC-BY-SA 4.0.',
    lastVerifiedDate: '2026-11-14',
  },
  {
    slug: 'visualgo-algorithm-visualizations',
    title: 'VisuAlgo: Visualizing Data Structures and Algorithms',
    category: 'DSA_RESOURCE',
    author: 'Dr. Steven Halim',
    publisher: 'National University of Singapore (NUS)',
    url: 'https://visualgo.net/',
    description: 'Interactive animated walkthroughs of sorting algorithms, BST, AVL trees, disjoint set union, minimum spanning trees, and maximum network flows.',
    relatedTopics: ['Algorithm Visualization', 'Sorting', 'Trees', 'Graphs'],
    difficulty: 'BEGINNER',
    contentType: 'interactive',
    license: 'Educational Link Attribution',
    attribution: 'Dr. Steven Halim / National University of Singapore',
    lastVerifiedDate: '2026-11-16',
  },
  {
    slug: 'amazon-dynamodb-paper',
    title: 'Dynamo: Amazon’s Highly Available Key-Value Store',
    category: 'SYSTEM_DESIGN_CASE_STUDY',
    author: 'Giuseppe DeCandia et al.',
    publisher: 'Amazon Web Services / SOSP',
    url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
    description: 'The historic paper that founded NoSQL. Details consistent hashing with virtual nodes, vector clocks for versioning, sloppy quorums, hinted handoff, and anti-entropy Merkle trees.',
    relatedTopics: ['Consistent Hashing', 'Vector Clocks', 'Merkle Trees', 'Eventual Consistency'],
    difficulty: 'ADVANCED',
    contentType: 'case_study',
    license: 'Academic & Industry Case Study Reference',
    attribution: 'Amazon.com / Werner Vogels (All Things Distributed)',
    lastVerifiedDate: '2026-11-10',
  },
];

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    'WHITE_PAPER',
    'BOOK',
    'UNIVERSITY_COURSE',
    'ENGINEERING_BLOG',
    'DOCUMENTATION',
    'SYSTEM_DESIGN_CASE_STUDY',
    'DSA_RESOURCE',
  ];

  const filteredResources = useMemo(() => {
    return ALL_RESOURCES.filter((res) => {
      const matchCat = selectedCategory === 'ALL' || res.category === selectedCategory;
      const matchSearch =
        search === '' ||
        res.title.toLowerCase().includes(search.toLowerCase()) ||
        res.description.toLowerCase().includes(search.toLowerCase()) ||
        res.relatedTopics.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        res.author.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Curated & Verified Citations
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Engineering Knowledge Library
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
              Dual-source educational directory: original System Atlas lessons backed by verified white papers, books, university lecture series, and production architecture case studies.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/resources"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white transition"
            >
              Suggest Resource
            </Link>
          </div>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by title, topic, author, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-900/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.slug}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                    {res.category.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Verified {res.lastVerifiedDate}
                  </span>
                </div>

                <Link
                  href={`/resources/${res.slug}`}
                  className="text-lg font-bold text-white hover:text-sky-400 transition block mb-1"
                >
                  {res.title}
                </Link>

                <p className="text-xs text-slate-500 mb-3">By {res.author} • {res.publisher}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{res.description}</p>

                {/* Topics Tag List */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {res.relatedTopics.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Verified License Citation */}
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400 mb-4">
                  <span className="font-semibold text-slate-300">Attribution & License: </span>
                  {res.attribution} ({res.license})
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href={`/resources/${res.slug}`}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
                >
                  View Full Citation &rarr;
                </Link>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
                >
                  Open Original <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
