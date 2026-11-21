'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { DSA_CURRICULUM } from '@system-atlas/contracts';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  Bookmark,
  Eye,
  Code2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  PlayCircle,
  Terminal,
  Copy,
  Check,
} from 'lucide-react';

export default function DSATopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const topic = DSA_CURRICULUM.find((t) => t.slug === slug) || DSA_CURRICULUM[0]!;
  const { lesson } = topic;

  const [activeTab, setActiveTab] = useState<'guide' | 'dryrun' | 'code' | 'pitfalls' | 'interview' | 'quiz'>('guide');
  const [selectedLanguage, setSelectedLanguage] = useState<'cpp' | 'java' | 'python' | 'javascript'>('python');
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(lesson.codeSnippets[selectedLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (submittedQuiz) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const quizScore = lesson.quizQuestions.reduce((score, q) => {
    return quizAnswers[q.id] === q.correctIndex ? score + 1 : score;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dsa"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to DSA Modules
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/dsa/visualizer?algo=${topic.slug}`}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-teal-500/30 bg-teal-500/10 text-teal-300 hover:bg-teal-500/20 transition font-semibold"
            >
              <Eye className="w-3.5 h-3.5" /> Interactive Visualizer
            </Link>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition ${
                bookmarked
                  ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" /> {bookmarked ? 'Saved' : 'Bookmark'}
            </button>
          </div>
        </div>

        {/* Topic Header Banner */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              MODULE {topic.order < 10 ? `0${topic.order}` : topic.order} • {topic.level}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {lesson.estimatedMinutes} mins study time
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
            {topic.title}
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-3xl leading-relaxed">
            {lesson.description}
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-800 pb-3 mb-8 scrollbar-none text-xs font-semibold">
          {[
            { id: 'guide', label: '1. Core Concept & Analogy' },
            { id: 'dryrun', label: '2. Step-by-Step Dry Run' },
            { id: 'code', label: '3. Code Implementations' },
            { id: 'pitfalls', label: '4. Pitfalls & Complexity' },
            { id: 'interview', label: '5. Interview Questions' },
            { id: 'quiz', label: `6. Knowledge Quiz (${lesson.quizQuestions.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: GUIDE & ANALOGY */}
        {activeTab === 'guide' && (
          <div className="space-y-8 max-w-4xl">
            {/* Real World Analogy Box */}
            <div className="p-6 rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-slate-900/50 to-slate-900/30">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Lightbulb className="w-4 h-4" /> Intuitive Real-World Analogy
              </div>
              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {lesson.analogy}
              </p>
            </div>

            {/* Beginner Explanation */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" /> Beginner-Friendly Explanation
              </h2>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-normal space-y-3">
                {lesson.explanation}
              </div>
            </div>

            {/* Revision Notes Summary */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Key Revision Takeaways
              </h3>
              <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
                {lesson.revisionNotes}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DRY RUN */}
        {activeTab === 'dryrun' && (
          <div className="space-y-6 max-w-4xl">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-teal-400" /> Algorithmic Execution Dry Run
                </h2>
                <Link
                  href={`/dsa/visualizer?algo=${topic.slug}`}
                  className="text-xs font-bold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
                >
                  Launch Interactive Visualizer &rarr;
                </Link>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Trace memory states, pointer movements, and invariant shifts step-by-step through execution.
              </p>

              <div className="prose prose-invert max-w-none text-xs text-slate-300 overflow-x-auto">
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {lesson.dryRunMarkdown}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CODE */}
        {activeTab === 'code' && (
          <div className="space-y-4 max-w-4xl">
            {/* Language Switcher Bar */}
            <div className="flex items-center justify-between p-2 rounded-xl border border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-1">
                {(['python', 'javascript', 'cpp', 'java'] as const).map((lang) => {
                  const labels = { cpp: 'C++', java: 'Java', python: 'Python', javascript: 'JavaScript' };
                  return (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        selectedLanguage === lang
                          ? 'bg-sky-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {labels[lang]}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={copyCode}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>

            {/* Code Block Container */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
              <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-slate-300 font-semibold uppercase">{selectedLanguage} Solution</span>
                <span>Production-grade formatting</span>
              </div>
              <pre className="p-6 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                {lesson.codeSnippets[selectedLanguage]}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 4: PITFALLS & COMPLEXITY */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6 max-w-4xl">
            {/* Complexity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">Time Complexity</span>
                <p className="text-sm font-semibold text-white mt-1">{lesson.timeComplexity}</p>
              </div>
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50">
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">Space Complexity</span>
                <p className="text-sm font-semibold text-white mt-1">{lesson.spaceComplexity}</p>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4" /> Common Mistakes & Interview Traps
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                {lesson.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: INTERVIEW QUESTIONS & EXERCISES */}
        {activeTab === 'interview' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-lg font-bold text-white mb-4">FAANG & Top Tier Interview Questions</h2>
              <div className="space-y-4">
                {lesson.interviewQuestions.map((q, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-white">Q{idx + 1}: {q.question}</h3>
                      <div className="flex items-center gap-1.5">
                        {q.companies.map((c) => (
                          <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                      <span className="font-bold text-teal-400">Answer: </span>
                      {q.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Practice Problems */}
            <div className="pt-6 border-t border-slate-800">
              <h2 className="text-lg font-bold text-white mb-4">Recommended Practice Exercises</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lesson.practiceExercises.map((ex, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-800 bg-slate-900/30 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          {ex.difficulty}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{ex.title}</h4>
                      <p className="text-xs text-slate-400 mb-3">{ex.description}</p>
                      {ex.hint && (
                        <p className="text-[11px] text-slate-500 italic mb-4">💡 Hint: {ex.hint}</p>
                      )}
                    </div>
                    <Link
                      href={`/dsa/practice`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
                    >
                      Solve in Practice Sandbox &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 max-w-3xl">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-sky-400" /> Module Knowledge Check
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Test your understanding of algorithmic principles and complexity boundaries.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-3 py-1 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 font-bold text-xs">
                    Score: {quizScore} / {lesson.quizQuestions.length}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {lesson.quizQuestions.map((q, qIdx) => {
                  const userAnswer = quizAnswers[q.id];
                  const isCorrect = userAnswer === q.correctIndex;

                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3">
                      <h3 className="text-sm font-bold text-white">
                        {qIdx + 1}. {q.question}
                      </h3>

                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = 'border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300';
                          if (userAnswer === optIdx) {
                            optStyle = 'border-sky-500 bg-sky-500/15 text-sky-300';
                          }
                          if (submittedQuiz) {
                            if (optIdx === q.correctIndex) {
                              optStyle = 'border-teal-500 bg-teal-500/20 text-teal-200 font-bold';
                            } else if (userAnswer === optIdx && !isCorrect) {
                              optStyle = 'border-rose-500 bg-rose-500/20 text-rose-300 line-through';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {submittedQuiz && optIdx === q.correctIndex && (
                                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {submittedQuiz && (
                        <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                          <span className="font-bold text-sky-400">Explanation: </span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                {!submittedQuiz ? (
                  <button
                    onClick={() => setSubmittedQuiz(true)}
                    className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition"
                  >
                    Submit Quiz Answers
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSubmittedQuiz(false);
                      setQuizAnswers({});
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white font-bold text-xs transition"
                  >
                    Retake Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
