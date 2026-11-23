import Link from 'next/link';
import {
  Layers,
  Terminal,
  Sparkles,
  BookOpen,
  Compass,
  ShieldCheck,
  Code2,
  Eye,
  FileText,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Building,
  Cpu,
  Database,
  Zap,
  Globe,
  Radio,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#060911] text-slate-100 selection:bg-sky-500/30 overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <main className="flex-1 relative">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-sky-600/15 via-teal-500/15 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute top-96 right-10 w-[450px] h-[350px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold mb-6 shadow-sm shadow-sky-500/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Complete System Design & DSA Engineering Environment
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.1] text-white">
            Master Large-Scale Systems &{' '}
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Algorithmic Problem Solving
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
            From functional requirements scoping and back-of-the-envelope capacity estimations to distributed caching, database sharding, and real-time algorithm visualizers.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/learn/roadmap"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition flex items-center gap-2 text-sm"
            >
              <Compass className="w-4 h-4" /> System Design Roadmap
            </Link>
            <Link
              href="/interviews"
              className="px-7 py-3.5 rounded-xl border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-semibold transition flex items-center gap-2 text-sm backdrop-blur-md"
            >
              <Briefcase className="w-4 h-4" /> FAANG Case Studies
            </Link>
            <Link
              href="/dsa/visualizer"
              className="px-7 py-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 text-slate-300 font-semibold transition flex items-center gap-2 text-sm"
            >
              <Eye className="w-4 h-4 text-teal-400" /> Algorithm Visualizer
            </Link>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 w-full max-w-4xl text-left">
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 glass-panel">
              <div className="text-2xl font-black text-sky-400">8 Phases</div>
              <div className="text-xs text-slate-400 mt-0.5">End-to-End SD Roadmap</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 glass-panel">
              <div className="text-2xl font-black text-teal-400">6 Case Studies</div>
              <div className="text-xs text-slate-400 mt-0.5">TinyURL, Instagram, YouTube</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 glass-panel">
              <div className="text-2xl font-black text-indigo-400">13 Topics</div>
              <div className="text-xs text-slate-400 mt-0.5">Complete DSA Curriculum</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 glass-panel">
              <div className="text-2xl font-black text-amber-400">10 Visualizers</div>
              <div className="text-xs text-slate-400 mt-0.5">Step-by-Step Executions</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: SYSTEM DESIGN ROADMAP SPOTLIGHT */}
        <div className="border-t border-slate-800/80 bg-slate-950/50 py-16 px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Beginner to Advanced
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-1">
                  The Complete System Design Roadmap
                </h2>
                <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                  Curated from Grokking System Design, Interviewing.io, and HelloInterview. Every essential building block required to clear L5 / L6 interviews.
                </p>
              </div>
              <Link
                href="/learn/roadmap"
                className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 self-start"
              >
                Explore Full Interactive Roadmap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel glass-panel-hover space-y-2">
                <div className="text-[10px] font-mono font-bold text-sky-400">Phase 01</div>
                <h3 className="text-sm font-bold text-white">Foundations & Math</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Functional vs non-functional requirements, QPS math, daily storage, and Pareto 80/20 cache sizing.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel glass-panel-hover space-y-2">
                <div className="text-[10px] font-mono font-bold text-teal-400">Phase 02</div>
                <h3 className="text-sm font-bold text-white">Ingress, DNS & Routing</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Anycast BGP, Global CDNs, Layer 4 vs Layer 7 load balancing, and API Gateway rate limiting.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel glass-panel-hover space-y-2">
                <div className="text-[10px] font-mono font-bold text-indigo-400">Phase 03</div>
                <h3 className="text-sm font-bold text-white">Sharding & Replication</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  SQL vs NoSQL trade-offs, consistent hashing rings with vnodes, and primary-replica lag mitigation.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel glass-panel-hover space-y-2">
                <div className="text-[10px] font-mono font-bold text-amber-400">Phase 04</div>
                <h3 className="text-sm font-bold text-white">Caching Topologies</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cache-Aside vs Write-Through, LRU eviction, Thundering Herd stampede prevention, and Redis clusters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: POPULAR FAANG CASE STUDIES */}
        <div className="border-t border-slate-800/80 py-16 px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Real FAANG Interview Prompts
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-1">
                  System Design Case Study Blueprints
                </h2>
                <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                  Full end-to-end solutions with capacity calculations, ASCII architecture diagrams, API schemas, and deep-dive bottlenecks.
                </p>
              </div>
              <Link
                href="/interviews"
                className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 self-start"
              >
                View All Case Studies <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: TinyURL */}
              <Link
                href="/interviews/design-url-shortener"
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel glass-panel-hover space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    EASY
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> Google, Meta
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition">
                  Design a URL Shortener (TinyURL)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Focus on Base62 ID generation, Key Generation Service (KGS) collision elimination, and 33 GB Redis LRU cache sizing.
                </p>
                <div className="pt-2 text-xs font-bold text-sky-400 flex items-center gap-1">
                  Read Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Card 2: Instagram */}
              <Link
                href="/interviews/design-instagram"
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel glass-panel-hover space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    HARD
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> Meta, Pinterest
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition">
                  Design Instagram / Photo Feed
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Master the Celebrity problem using the Hybrid Fan-out on Write/Read model, S3 pre-signed direct uploads, and Kafka queues.
                </p>
                <div className="pt-2 text-xs font-bold text-sky-400 flex items-center gap-1">
                  Read Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Card 3: YouTube */}
              <Link
                href="/interviews/design-youtube"
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel glass-panel-hover space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    HARD
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> Google, Netflix
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition">
                  Design YouTube / Video Streaming
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Adaptive bitrate streaming (HLS 5s chunking), distributed transcoding worker pools, and buffered distributed view counters.
                </p>
                <div className="pt-2 text-xs font-bold text-sky-400 flex items-center gap-1">
                  Read Case Study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 3: DSA LEARNING & VISUALIZER */}
        <div className="border-t border-slate-800/80 bg-slate-950/40 py-16 px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Interactive Algorithmic Mastery
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Learn, Visualize, and Code DSA
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                From two pointers and sliding window to binary trees, graph algorithms, and dynamic programming with step-by-step state animations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel space-y-3">
                <Code2 className="w-7 h-7 text-sky-400" />
                <h3 className="text-base font-bold text-white">13-Topic DSA Curriculum</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-world analogies, step-by-step dry runs, time/space complexity analysis, and multi-language code snippets in C++, Java, Python, and JavaScript.
                </p>
                <Link href="/dsa" className="text-xs font-semibold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 pt-2">
                  Browse Curriculum <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel space-y-3">
                <Eye className="w-7 h-7 text-teal-400" />
                <h3 className="text-base font-bold text-white">10 Interactive Visualizers</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Actual execution step animator with play, pause, next/prev step controls for Bubble/Quick Sort, Binary Search, Linked List pointers, and DP tables.
                </p>
                <Link href="/dsa/visualizer" className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1 pt-2">
                  Launch Visualizer <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glass-panel space-y-3">
                <Terminal className="w-7 h-7 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Safe Practice Workbench</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Isolated sandbox execution environment with progressive hints, automated test-case runner, and instant verdict validation.
                </p>
                <Link href="/dsa/practice" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 pt-2">
                  Start Practice <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">System Atlas</span>
            <span>—</span>
            <span>High-Scale System Design & DSA Platform</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/learn/roadmap" className="hover:text-white transition">SD Roadmap</Link>
            <Link href="/interviews" className="hover:text-white transition">Case Studies</Link>
            <Link href="/dsa" className="hover:text-white transition">DSA Hub</Link>
            <Link href="/dsa/visualizer" className="hover:text-white transition">Visualizer</Link>
            <Link href="/resources" className="hover:text-white transition">Resources</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
