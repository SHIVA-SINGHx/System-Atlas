'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  Circle,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Zap,
  Shield,
  HelpCircle,
  ExternalLink,
  Award,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { SYSTEM_DESIGN_ROADMAP, RoadmapPhase } from '@/data/system-design-roadmap';

export default function SystemDesignRoadmapPage() {
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(SYSTEM_DESIGN_ROADMAP[0]!.id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('system_atlas_sd_roadmap_progress');
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const updated = { ...prev, [stepId]: !prev[stepId] };
      try {
        localStorage.setItem('system_atlas_sd_roadmap_progress', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const totalSteps = SYSTEM_DESIGN_ROADMAP.reduce((acc, phase) => acc + phase.steps.length, 0);
  const finishedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = Math.round((finishedCount / totalSteps) * 100);

  const activePhase: RoadmapPhase = SYSTEM_DESIGN_ROADMAP.find((p) => p.id === selectedPhaseId) || SYSTEM_DESIGN_ROADMAP[0]!;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
      <Navigation />

      {/* Hero Header */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold mb-4">
            <Compass className="w-3.5 h-3.5" /> Structured Engineering Curriculum
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            System Design{' '}
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Mastery Roadmap
            </span>
          </h1>
          <p className="mt-3 text-slate-400 max-w-3xl text-sm md:text-base leading-relaxed">
            From clarifying functional & non-functional requirements to back-of-the-envelope capacity estimations, database sharding, caching topologies, distributed consensus, and the 4-step FAANG interview framework.
          </p>

          {/* Progress Tracker Bar */}
          <div className="mt-8 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md max-w-xl">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-sky-400" /> Curriculum Progress
              </span>
              <span className="text-sky-400">{finishedCount} of {totalSteps} topics completed ({progressPercent}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-teal-400 to-indigo-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Roadmap Explorer */}
      <div className="max-w-6xl mx-auto px-6 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Phases List */}
        <div className="lg:col-span-4 space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-3">
            Roadmap Stages
          </h2>
          {SYSTEM_DESIGN_ROADMAP.map((phase, idx) => {
            const isSelected = phase.id === selectedPhaseId;
            const phaseStepIds = phase.steps.map((s) => s.id);
            const phaseDoneCount = phaseStepIds.filter((id) => completedSteps[id]).length;
            const isPhaseComplete = phaseDoneCount === phase.steps.length;

            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhaseId(phase.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-sky-500/10 border-sky-500/40 text-white shadow-lg shadow-sky-500/5'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold ${
                      isPhaseComplete
                        ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                        : isSelected
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isPhaseComplete ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-tight text-white leading-tight">
                      {phase.title.split(':')[1] || phase.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {phaseDoneCount} / {phase.steps.length} completed
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    phase.level === 'BEGINNER'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : phase.level === 'INTERMEDIATE'
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}
                >
                  {phase.level}
                </span>
              </button>
            );
          })}

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 mt-6 space-y-2">
            <h3 className="text-xs font-bold text-slate-300">Ready for Interview Problems?</h3>
            <p className="text-xs text-slate-400">
              Apply these concepts directly on popular interview questions like TinyURL, Instagram, and YouTube.
            </p>
            <Link
              href="/interviews"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 pt-1"
            >
              Browse Interview Questions <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Content: Detailed Phase View */}
        <div className="lg:col-span-8 space-y-6">
          {/* Phase Header Card */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {activePhase.badge}
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-medium text-slate-400">{activePhase.subtitle}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">{activePhase.title}</h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">{activePhase.description}</p>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            {activePhase.steps.map((step, sIdx) => {
              const isDone = Boolean(completedSteps[step.id]);

              return (
                <div
                  key={step.id}
                  className={`p-6 rounded-2xl border transition ${
                    isDone
                      ? 'border-slate-800/80 bg-slate-900/30 opacity-80'
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <button
                        onClick={() => toggleStep(step.id)}
                        className="mt-0.5 text-slate-500 hover:text-sky-400 transition"
                        title={isDone ? 'Mark uncompleted' : 'Mark completed'}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-teal-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                        )}
                      </button>
                      <div>
                        <h3
                          className={`text-base font-bold transition ${
                            isDone ? 'text-slate-400 line-through' : 'text-white'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {step.summary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Concepts Bullet Points */}
                  <div className="mt-4 pl-8 border-l border-slate-800/80 ml-2.5 space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Core Technical Concepts:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {step.keyConcepts.map((concept, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <span className="text-sky-400 text-[10px] mt-0.5">▸</span>
                          <span>{concept}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Formula / Rule of Thumb Callout if present */}
                    {step.formulaOrRule && (
                      <div className="p-3 rounded-xl border border-sky-500/20 bg-sky-500/5 text-xs text-sky-200 font-mono mt-3">
                        <span className="font-bold text-sky-400 font-sans mr-2">💡 Formula / Rule:</span>
                        {step.formulaOrRule}
                      </div>
                    )}

                    {/* Interview Tip Box */}
                    <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-200 mt-2">
                      <span className="font-bold text-amber-400 mr-2">🎯 Senior Interview Tip:</span>
                      {step.interviewTips}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
