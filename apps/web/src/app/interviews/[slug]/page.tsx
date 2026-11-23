'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Building,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Cpu,
  Database,
  Code,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { SYSTEM_DESIGN_PROBLEMS, SystemDesignProblem } from '@/data/system-design-problems';

export default function InterviewProblemWorkspace({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const problem = SYSTEM_DESIGN_PROBLEMS.find((p) => p.slug === slug);

  const [activeTab, setActiveTab] = useState<'requirements' | 'estimations' | 'architecture' | 'api' | 'data' | 'deepdives'>('requirements');
  const [copied, setCopied] = useState(false);
  const [expandedDeepDive, setExpandedDeepDive] = useState<number | null>(0);

  if (!problem) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Problem Not Found</h1>
        <p className="text-slate-400 text-sm mb-4">The requested system design case study does not exist.</p>
        <Link href="/interviews" className="text-sky-400 text-xs hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Problem Library
        </Link>
      </div>
    );
  }

  const copyDiagram = () => {
    navigator.clipboard.writeText(problem.architecture.diagram);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'requirements', label: '1. Requirements & Scope' },
    { id: 'estimations', label: '2. Capacity Math' },
    { id: 'architecture', label: '3. High-Level Design' },
    { id: 'api', label: '4. API Design' },
    { id: 'data', label: '5. Data Model' },
    { id: 'deepdives', label: '6. Deep Dives & Rubric' },
  ] as const;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
      <Navigation />

      {/* Sticky Problem Header */}
      <div className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-6 py-4 sticky top-14 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <Link
                href="/interviews"
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Interviews
              </Link>
              <span className="text-slate-600 text-xs">/</span>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                  problem.difficulty === 'EASY'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : problem.difficulty === 'MEDIUM'
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {problem.difficulty}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Building className="w-3.5 h-3.5 text-slate-500" /> {problem.companies.join(', ')}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">{problem.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/learn/roadmap"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 transition"
            >
              Roadmap Guide
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto mt-4 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-sky-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="max-w-6xl mx-auto px-6 py-8 w-full flex-1">
        {/* TAB 1: REQUIREMENTS */}
        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" /> 1. Functional Requirements (What the system does)
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {problem.requirements.functional.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-teal-400" /> 2. Non-Functional Requirements (How well it performs)
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {problem.requirements.nonFunctional.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> 3. Clarifications & Out of Scope
              </h2>
              <p className="text-xs text-slate-400">
                Explicitly stating what is OUT of scope protects your 45-minute interview budget:
              </p>
              <ul className="space-y-2 text-sm text-slate-400 list-disc pl-5">
                {problem.requirements.outOfScope.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: ESTIMATIONS */}
        {activeTab === 'estimations' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
              <h2 className="text-lg font-bold text-white mb-3">Core Traffic Assumptions</h2>
              <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
                {problem.estimations.assumptions.map((assump, idx) => (
                  <li key={idx}>{assump}</li>
                ))}
              </ul>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* QPS Card */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Traffic Throughput (QPS)</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Average Write QPS:</span>
                    <span className="font-mono text-white font-bold">{problem.estimations.trafficQps.averageWrite}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Peak Write QPS:</span>
                    <span className="font-mono text-white font-bold">{problem.estimations.trafficQps.peakWrite}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Average Read QPS:</span>
                    <span className="font-mono text-teal-400 font-bold">{problem.estimations.trafficQps.averageRead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peak Read QPS:</span>
                    <span className="font-mono text-teal-400 font-bold">{problem.estimations.trafficQps.peakRead}</span>
                  </div>
                </div>
              </div>

              {/* Storage Footprint Card */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-400">Storage Capacity Math</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Size per Record:</span>
                    <span className="font-mono text-white font-bold">{problem.estimations.storage.perRecord}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Daily Ingress:</span>
                    <span className="font-mono text-white font-bold">{problem.estimations.storage.daily}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">5-Year Storage Need:</span>
                    <span className="font-mono text-indigo-400 font-bold">{problem.estimations.storage.fiveYear}</span>
                  </div>
                </div>
              </div>

              {/* Bandwidth Card */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Network Bandwidth</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Incoming Bandwidth:</span>
                    <span className="font-mono text-white font-bold">{problem.estimations.bandwidth.incoming}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Outgoing Bandwidth:</span>
                    <span className="font-mono text-white font-bold">{problem.estimations.bandwidth.outgoing}</span>
                  </div>
                </div>
              </div>

              {/* Cache Memory Sizing Card */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Cache Sizing (80/20 Rule)</div>
                <div className="space-y-2 text-xs">
                  <div className="text-slate-400 leading-relaxed">
                    {problem.estimations.cacheMemory.eightyTwentyRule}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            {/* ASCII Architecture Diagram Box */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  End-to-End High-Level System Architecture
                </span>
                <button
                  onClick={copyDiagram}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy ASCII Diagram'}
                </button>
              </div>

              <pre className="font-mono text-xs md:text-sm text-sky-200 overflow-x-auto p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 leading-snug">
                {problem.architecture.diagram}
              </pre>
            </div>

            {/* Components Grid */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
              <h3 className="text-base font-bold text-white">Component Responsibilities & Technologies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {problem.architecture.components.map((c, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{c.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {c.tech}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{c.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Read & Write Request Flows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
                <h3 className="text-sm font-bold text-teal-400">📖 Step-by-Step Read Flow</h3>
                <ol className="space-y-2 text-xs text-slate-300">
                  {problem.architecture.readFlow.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold shrink-0">{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
                <h3 className="text-sm font-bold text-sky-400">✍️ Step-by-Step Write Flow</h3>
                <ol className="space-y-2 text-xs text-slate-300">
                  {problem.architecture.writeFlow.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sky-400 font-bold shrink-0">{idx + 1}.</span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: API DESIGN */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-2">
              <h2 className="text-lg font-bold text-white">RESTful Endpoints & Contracts</h2>
              <p className="text-xs text-slate-400">
                Clear API interfaces with input arguments, status codes, and JSON response bodies.
              </p>
            </div>

            <div className="space-y-4">
              {problem.apiDesign.map((api, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded font-mono ${
                        api.method === 'GET'
                          ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                          : api.method === 'POST'
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {api.method}
                    </span>
                    <span className="font-mono text-sm text-white font-bold">{api.endpoint}</span>
                  </div>

                  <p className="text-xs text-slate-300">{api.description}</p>

                  {api.requestBody && (
                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-slate-400">Request Body:</div>
                      <pre className="font-mono text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 overflow-x-auto">
                        {api.requestBody}
                      </pre>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-slate-400">Response Body:</div>
                    <pre className="font-mono text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-teal-300 overflow-x-auto">
                      {api.responseBody}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: DATA MODEL */}
        {activeTab === 'data' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-2">
              <h2 className="text-lg font-bold text-white">Storage Choice & Justification</h2>
              <div className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {problem.dataModel.storageChoice}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {problem.dataModel.rationale}
              </p>
            </div>

            {/* Database Tables */}
            <div className="space-y-4">
              {problem.dataModel.tables.map((table, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-sky-400" />
                      <span className="font-mono text-sm font-bold text-white">{table.name}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Primary Key: <span className="font-mono text-amber-300 font-semibold">{table.primaryKey}</span>
                    </div>
                  </div>

                  {table.indexes.length > 0 && (
                    <div className="text-xs text-slate-400">
                      Indexes: <span className="font-mono text-sky-300">{table.indexes.join(', ')}</span>
                    </div>
                  )}

                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="py-2 font-semibold">Column Name</th>
                          <th className="py-2 font-semibold">Type</th>
                          <th className="py-2 font-semibold">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {table.columns.map((col, cIdx) => (
                          <tr key={cIdx} className="text-slate-300">
                            <td className="py-2 text-white font-bold">{col.name}</td>
                            <td className="py-2 text-sky-400">{col.type}</td>
                            <td className="py-2 font-sans text-slate-400 text-[11px]">{col.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DEEP DIVES & RUBRIC */}
        {activeTab === 'deepdives' && (
          <div className="space-y-6">
            {/* Deep Dives Accordion */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-400" /> Critical Technical Deep Dives (Bottlenecks & Solutions)
              </h2>

              {problem.deepDives.map((dd, idx) => {
                const isOpen = expandedDeepDive === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden transition"
                  >
                    <button
                      onClick={() => setExpandedDeepDive(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900/80 transition"
                    >
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <span className="text-xs font-mono text-sky-400">0{idx + 1}.</span> {dd.title}
                      </span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {isOpen && (
                      <div className="p-5 pt-0 border-t border-slate-800/80 space-y-3 text-xs leading-relaxed">
                        <div>
                          <div className="font-bold text-rose-400 mb-1">🚨 The Hard Challenge:</div>
                          <p className="text-slate-300">{dd.challenge}</p>
                        </div>
                        <div>
                          <div className="font-bold text-teal-400 mb-1">🛠️ The Architectural Solution:</div>
                          <p className="text-slate-300">{dd.solution}</p>
                        </div>
                        <div className="p-3 rounded-xl border border-sky-500/20 bg-sky-500/5 text-sky-300 font-semibold">
                          💡 Key Interview Takeaway: {dd.keyTakeaway}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* FAANG Rubric Breakdown */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
              <h2 className="text-base font-bold text-white">Interview Evaluation Rubric (What FAANG Interviewers Look For)</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">✅ Must Have (Senior Bar)</div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {problem.rubric.mustHave.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 space-y-2">
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">🌟 Good to Have (Staff Bar)</div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {problem.rubric.goodToHave.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-sky-400">★</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">❌ Red Flags (Common Rejections)</div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {problem.rubric.redFlags.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400">✗</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Follow-up Questions */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Typical Senior Follow-up Questions:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-400 list-disc pl-5">
                  {problem.rubric.followUpQuestions.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
