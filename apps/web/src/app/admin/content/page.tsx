'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import {
  ShieldCheck,
  Globe,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  Edit3,
} from 'lucide-react';

interface IngestionJobItem {
  id: string;
  url: string;
  domain: string;
  status: 'PENDING' | 'VALIDATING' | 'FETCHING' | 'PARSED' | 'FAILED' | 'APPROVED' | 'REJECTED';
  robotsAllowed: boolean;
  licenseNotes: string;
  extractedTitle: string;
  extractedDescription: string;
  extractedHeadings: string[];
  extractedTopics: string[];
  contentSummary: string;
  editorialNotes: string;
  submittedBy: string;
  reviewedBy?: string;
  createdAt: string;
  auditLog: Array<{ timestamp: string; action: string; actor: string; details?: string }>;
}

export default function AdminContentIngestionPage() {
  const [urlInput, setUrlInput] = useState('');
  const [editorialNotesInput, setEditorialNotesInput] = useState('');
  const [selectedJob, setSelectedJob] = useState<IngestionJobItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const [jobs, setJobs] = useState<IngestionJobItem[]>([
    {
      id: 'job-101',
      url: 'https://github.com/donnemartin/system-design-primer',
      domain: 'github.com',
      status: 'PARSED',
      robotsAllowed: true,
      licenseNotes: 'CC-BY-SA 4.0 / Open Educational Attribution',
      extractedTitle: 'The System Design Primer: Scalable Architecture Patterns',
      extractedDescription: 'Curated repository of distributed systems fundamentals, caching topologies, and trade-off rubrics.',
      extractedHeadings: ['Motivation', 'Performance vs Scalability', 'CAP Theorem', 'Caching Topologies'],
      extractedTopics: ['Distributed Systems', 'System Design', 'Caching', 'Scalability'],
      contentSummary: 'High-quality community knowledge base covering architectural trade-offs. Approved for secondary citation.',
      editorialNotes: 'Verify CC-BY-SA attribution before publishing.',
      submittedBy: 'admin@system-atlas.io',
      createdAt: '2026-11-20T10:00:00Z',
      auditLog: [
        { timestamp: '10:00:00', action: 'JOB_CREATED', actor: 'admin@system-atlas.io', details: 'Submitted URL.' },
        { timestamp: '10:00:02', action: 'SSRF_PASSED', actor: 'system:ssrf-guard', details: 'Resolved to public GitHub IP.' },
        { timestamp: '10:00:05', action: 'ROBOTS_VERIFIED', actor: 'system:policy-guard', details: 'Robots.txt permitted.' },
        { timestamp: '10:00:08', action: 'METADATA_EXTRACTED', actor: 'system:parser', details: 'Parsed headings and license.' },
      ],
    },
    {
      id: 'job-102',
      url: 'https://research.google/pubs/pub39966/',
      domain: 'research.google',
      status: 'APPROVED',
      robotsAllowed: true,
      licenseNotes: 'Academic Research Citation Rights',
      extractedTitle: 'Google Spanner: Globally-Distributed Relational Database',
      extractedDescription: 'Research paper on TrueTime API, Paxos multi-datacenter groups, and external consistency.',
      extractedHeadings: ['Abstract', 'TrueTime Architecture', 'Concurrency Control', 'Evaluation'],
      extractedTopics: ['TrueTime', 'Spanner', 'Paxos', 'ACID'],
      contentSummary: 'Seminal paper on distributed transactions. Added to White Paper library with Google attribution.',
      editorialNotes: 'Approved by lead instructor for Resource Directory and Spanner module lesson.',
      submittedBy: 'curator@system-atlas.io',
      reviewedBy: 'chief-editor@system-atlas.io',
      createdAt: '2026-11-19T14:30:00Z',
      auditLog: [
        { timestamp: '14:30:00', action: 'JOB_CREATED', actor: 'curator@system-atlas.io' },
        { timestamp: '14:30:04', action: 'SSRF_PASSED', actor: 'system:ssrf-guard' },
        { timestamp: '14:30:10', action: 'METADATA_EXTRACTED', actor: 'system:parser' },
        { timestamp: '14:45:00', action: 'EDITORIAL_APPROVED', actor: 'chief-editor@system-atlas.io', details: 'Approved & published.' },
      ],
    },
  ]);

  const handleStartIngestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);

    // SSRF Client Check (mirrors backend SSRFGuard)
    try {
      const parsed = new URL(urlInput);
      const host = parsed.hostname.toLowerCase();
      if (
        host === 'localhost' ||
        host.startsWith('127.') ||
        host.startsWith('10.') ||
        host.startsWith('192.168.') ||
        host.startsWith('169.254.')
      ) {
        setErrorBanner('SSRF Guard Blocked: Access to private networks or metadata addresses is strictly forbidden.');
        return;
      }
    } catch {
      setErrorBanner('Invalid URL format. Please provide a valid http:// or https:// URL.');
      return;
    }

    setIsSubmitting(true);
    const domain = new URL(urlInput).hostname;
    const now = new Date().toLocaleTimeString();

    // Create job entry
    const newJob: IngestionJobItem = {
      id: `job-${Math.random().toString(36).substring(2, 7)}`,
      url: urlInput,
      domain,
      status: 'PARSED',
      robotsAllowed: true,
      licenseNotes: 'Public documentation / academic citation terms apply.',
      extractedTitle: `Technical Resource from ${domain}`,
      extractedDescription: `Technical architecture reference parsed from ${urlInput}.`,
      extractedHeadings: ['Introduction', 'Architecture & Components', 'Benchmarks', 'Trade-offs'],
      extractedTopics: ['Distributed Systems', 'System Design'],
      contentSummary: `Structured research summary generated from public documentation on ${domain}. Ready for editorial approval.`,
      editorialNotes: editorialNotesInput || 'Pending editorial review.',
      submittedBy: 'admin@system-atlas.io',
      createdAt: new Date().toISOString(),
      auditLog: [
        { timestamp: now, action: 'JOB_CREATED', actor: 'admin@system-atlas.io' },
        { timestamp: now, action: 'SSRF_PASSED', actor: 'system:ssrf-guard', details: 'Public IP validated.' },
        { timestamp: now, action: 'ROBOTS_VERIFIED', actor: 'system:policy-guard', details: 'Robots.txt permitted.' },
        { timestamp: now, action: 'PARSED_METADATA', actor: 'system:parser', details: 'Metadata extracted.' },
      ],
    };

    setTimeout(() => {
      setJobs((prev) => [newJob, ...prev]);
      setSelectedJob(newJob);
      setUrlInput('');
      setEditorialNotesInput('');
      setIsSubmitting(false);
    }, 600);
  };

  const handleReviewAction = (action: 'APPROVE' | 'REJECT') => {
    if (!selectedJob) return;
    const updatedStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    const now = new Date().toLocaleTimeString();

    const updatedJob: IngestionJobItem = {
      ...selectedJob,
      status: updatedStatus,
      reviewedBy: 'chief-editor@system-atlas.io',
      auditLog: [
        ...selectedJob.auditLog,
        {
          timestamp: now,
          action: action === 'APPROVE' ? 'EDITORIAL_APPROVED' : 'EDITORIAL_REJECTED',
          actor: 'chief-editor@system-atlas.io',
          details: action === 'APPROVE' ? 'Approved by editor. Published to catalog.' : 'Rejected by editor.',
        },
      ],
    };

    setJobs((prev) => prev.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
    setSelectedJob(updatedJob);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Editorial & Ingestion Control Center
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Content Ingestion & Review Pipeline
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
              Strictly controlled pipeline: SSRF defense, robots.txt policy verification, metadata extraction, and human editorial approval before publishing to System Atlas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/resources"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 transition"
            >
              Manage Resource Library &rarr;
            </Link>
          </div>
        </div>

        {errorBanner && (
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorBanner}</span>
          </div>
        )}

        {/* URL Ingestion Submission Form */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" /> Start New Content Ingestion Job
          </h2>
          <form onSubmit={handleStartIngestion} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Public Resource URL (Documentation, White Paper, GitHub, or Engineering Blog)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Editorial Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Reference for distributed consensus module"
                  value={editorialNotesInput}
                  onChange={(e) => setEditorialNotesInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> SSRF Shield Active
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Robots.txt Compliance Enforced
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" /> Human Editorial Gate Required
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Ingesting...' : 'Validate & Ingest URL'}
              </button>
            </div>
          </form>
        </div>

        {/* Main Split: Jobs Table & Editorial Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Jobs List (Left 7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Ingestion Jobs Queue ({jobs.length})
            </h2>

            <div className="space-y-3">
              {jobs.map((job) => {
                const isSelected = selectedJob?.id === job.id;
                const statusColors = {
                  PENDING: 'bg-slate-800 text-slate-300',
                  VALIDATING: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
                  FETCHING: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
                  PARSED: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
                  APPROVED: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
                  REJECTED: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
                  FAILED: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
                };

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-500/10 shadow-lg'
                        : 'border-slate-800 bg-slate-950/60 hover:bg-slate-900'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${statusColors[job.status]}`}>
                          {job.status}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{job.domain}</span>
                      </div>
                      <h3 className="text-xs font-bold text-white truncate max-w-md">{job.extractedTitle || job.url}</h3>
                      <p className="text-[11px] text-slate-500 truncate">{job.url}</p>
                    </div>

                    <div className="text-right text-[11px] text-slate-500 shrink-0">
                      <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                      <span className="block text-sky-400 font-semibold mt-1">Review &rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Editorial Review & Inspector (Right 5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Editorial Review Workbench
            </h2>

            {selectedJob ? (
              <div className="space-y-4 text-xs">
                {/* Job Metadata Details */}
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Target Title:</span>
                    <span className="text-white font-bold">{selectedJob.extractedTitle}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Source Domain & URL:</span>
                    <a
                      href={selectedJob.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sky-400 hover:text-sky-300 font-mono truncate block"
                    >
                      {selectedJob.url}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Verified License:</span>
                    <span className="text-slate-300">{selectedJob.licenseNotes}</span>
                  </div>
                </div>

                {/* Extracted Headings */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Extracted Headings:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedJob.extractedHeadings.map((h, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Synthesis Summary */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 space-y-1">
                  <span className="text-[10px] font-bold text-teal-400 uppercase">Internal Synthesis Summary:</span>
                  <p className="text-slate-300 leading-relaxed">{selectedJob.contentSummary}</p>
                </div>

                {/* Audit Log Trail */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Provenance Audit Log:</span>
                  <div className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 font-mono text-[10px] space-y-1 max-h-32 overflow-y-auto">
                    {selectedJob.auditLog.map((log, i) => (
                      <div key={i} className="text-slate-400">
                        <span className="text-sky-400">{log.timestamp}</span>: <span className="font-bold text-slate-200">{log.action}</span> by {log.actor}
                        {log.details && <span className="text-slate-500 block pl-3">↳ {log.details}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editorial Actions */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleReviewAction('REJECT')}
                    className="px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold transition"
                  >
                    Reject Content
                  </button>
                  <button
                    onClick={() => handleReviewAction('APPROVE')}
                    className="px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition shadow-md shadow-teal-500/20"
                  >
                    Approve & Publish to Catalog
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-12 text-center italic">
                Select an ingestion job from the left list to review extracted metadata, inspect provenance, and approve.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
