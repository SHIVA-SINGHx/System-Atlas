'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Eye,
  Sliders,
  Sparkles,
  Layers,
  ArrowRight,
  Maximize2,
  RefreshCw,
  Info,
} from 'lucide-react';

type AlgorithmCategory =
  | 'sorting'
  | 'binary-search'
  | 'linked-list'
  | 'stack-queue'
  | 'tree-traversal'
  | 'graph-bfs-dfs'
  | 'dijkstra'
  | 'recursion-tree'
  | 'dp-table'
  | 'hash-table';

interface Step {
  description: string;
  data: any;
  highlightedIndices?: number[];
  pointers?: Record<string, number | string>;
}

export default function DSAVisualizerPage() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('algo') as AlgorithmCategory) || 'sorting';

  const [category, setCategory] = useState<AlgorithmCategory>('sorting');
  const [subAlgorithm, setSubAlgorithm] = useState<string>('bubble');
  const [customInput, setCustomInput] = useState<string>('45, 12, 85, 32, 89, 39, 69, 22');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(700);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Sync category from query param on mount
  useEffect(() => {
    const p = searchParams.get('algo');
    if (p) {
      if (['arrays-and-strings', 'sorting'].includes(p)) setCategory('sorting');
      else if (p === 'binary-search') setCategory('binary-search');
      else if (p === 'linked-lists') setCategory('linked-list');
      else if (p === 'stacks-and-queues') setCategory('stack-queue');
      else if (p === 'trees-and-bst') setCategory('tree-traversal');
      else if (p === 'graphs') setCategory('graph-bfs-dfs');
      else if (p === 'greedy-algorithms' || p === 'dijkstra') setCategory('dijkstra');
      else if (p === 'recursion-and-backtracking') setCategory('recursion-tree');
      else if (p === 'dynamic-programming') setCategory('dp-table');
      else if (p === 'hashing') setCategory('hash-table');
    }
  }, [searchParams]);

  // Parse numerical array for array-based visualizations
  const initialArray = useMemo(() => {
    const parsed = customInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    return parsed.length > 0 ? parsed.slice(0, 12) : [45, 12, 85, 32, 89, 39, 69, 22];
  }, [customInput]);

  // Generate timeline of execution steps based on category and subAlgorithm
  const steps: Step[] = useMemo(() => {
    switch (category) {
      case 'sorting':
        return generateSortingSteps(initialArray, subAlgorithm);
      case 'binary-search':
        return generateBinarySearchSteps(initialArray, 39);
      case 'linked-list':
        return generateLinkedListSteps([10, 20, 30, 40, 50], subAlgorithm);
      case 'stack-queue':
        return generateStackQueueSteps(subAlgorithm);
      case 'tree-traversal':
        return generateTreeTraversalSteps(subAlgorithm);
      case 'graph-bfs-dfs':
        return generateGraphSteps(subAlgorithm);
      case 'dijkstra':
        return generateDijkstraSteps();
      case 'recursion-tree':
        return generateRecursionTreeSteps(4);
      case 'dp-table':
        return generateDPTableSteps();
      case 'hash-table':
        return generateHashTableSteps(subAlgorithm);
      default:
        return [{ description: 'Ready', data: initialArray }];
    }
  }, [category, subAlgorithm, initialArray]);

  // Reset step index when steps regenerate
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [steps]);

  // Timer playback
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, steps.length, speedMs]);

  const currentStep = steps[currentStepIndex] || steps[0] || { description: '', data: [] };

  const handleRandomize = () => {
    const randoms = Array.from({ length: 8 }, () => Math.floor(Math.random() * 80) + 10);
    setCustomInput(randoms.join(', '));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full flex flex-col">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                INTERACTIVE DSA ENGINE
              </span>
              <span className="text-xs text-slate-500">Actual algorithm execution steps</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Algorithm Execution Visualizer
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                reducedMotion
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {reducedMotion ? 'Reduced Motion: ON' : 'Reduced Motion: OFF'}
            </button>
          </div>
        </div>

        {/* Algorithm Category Selector Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none text-xs font-semibold">
          {[
            { id: 'sorting', label: '1. Sorting' },
            { id: 'binary-search', label: '2. Binary Search' },
            { id: 'linked-list', label: '3. Linked List' },
            { id: 'stack-queue', label: '4. Stack & Queue' },
            { id: 'tree-traversal', label: '5. Tree Traversal' },
            { id: 'graph-bfs-dfs', label: '6. Graph BFS / DFS' },
            { id: 'dijkstra', label: '7. Dijkstra Shortest Path' },
            { id: 'recursion-tree', label: '8. Recursion Tree' },
            { id: 'dp-table', label: '9. DP Table Grid' },
            { id: 'hash-table', label: '10. Hash Table' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id as any);
                setSubAlgorithm(getDefaultSubAlgo(cat.id as any));
              }}
              className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
                category === cat.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Sub-Algorithm Selector & Input Bar */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-400">Variant:</span>
            {getSubOptions(category).map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSubAlgorithm(sub.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  subAlgorithm === sub.id
                    ? 'bg-sky-500/20 border border-sky-500/40 text-sky-300'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {['sorting', 'binary-search'].includes(category) && (
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Comma-separated numbers"
                className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-xs text-white font-mono w-full md:w-64 focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={handleRandomize}
                className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold shrink-0 inline-flex items-center gap-1 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Random
              </button>
            </div>
          )}
        </div>

        {/* Current Operation Explanation Banner */}
        <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/10 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              {currentStep.pointers && Object.keys(currentStep.pointers).length > 0 && (
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                  {Object.entries(currentStep.pointers).map(([k, v]) => (
                    <span key={k} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">
                      {k}: {String(v)}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-slate-200 mt-1">
              {currentStep.description}
            </p>
          </div>
        </div>

        {/* Visualizer Canvas Board */}
        <div className="flex-1 min-h-[380px] p-6 rounded-2xl border border-slate-800 bg-slate-950 relative flex items-center justify-center overflow-x-auto shadow-2xl">
          {renderVisualCanvas(category, currentStep, reducedMotion)}
        </div>

        {/* Bottom Playback & Timeline Controls */}
        <div className="mt-6 p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Step buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStepIndex(0)}
              className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition"
              title="Reset to beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentStepIndex((p) => Math.max(0, p - 1))}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition"
              title="Previous Step"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={() => setCurrentStepIndex((p) => Math.min(steps.length - 1, p + 1))}
              disabled={currentStepIndex === steps.length - 1}
              className="p-2 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition"
              title="Next Step"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline Slider */}
          <div className="flex items-center gap-3 w-full sm:w-80">
            <input
              type="range"
              min={0}
              max={Math.max(0, steps.length - 1)}
              value={currentStepIndex}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentStepIndex(parseInt(e.target.value, 10));
              }}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <span className="text-xs font-mono text-slate-400 shrink-0">
              {currentStepIndex + 1}/{steps.length}
            </span>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Speed:</span>
            {[
              { label: '0.5x', ms: 1200 },
              { label: '1x', ms: 700 },
              { label: '1.5x', ms: 400 },
              { label: '2x', ms: 200 },
            ].map((spd) => (
              <button
                key={spd.label}
                onClick={() => setSpeedMs(spd.ms)}
                className={`px-2 py-1 rounded text-xs font-bold transition ${
                  speedMs === spd.ms
                    ? 'bg-sky-500/20 border border-sky-500/40 text-sky-300'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ---------------- Helper Functions & Step Generators ----------------

function getDefaultSubAlgo(cat: AlgorithmCategory): string {
  switch (cat) {
    case 'sorting': return 'bubble';
    case 'linked-list': return 'reverse';
    case 'stack-queue': return 'stack';
    case 'tree-traversal': return 'inorder';
    case 'graph-bfs-dfs': return 'bfs';
    case 'hash-table': return 'chaining';
    default: return 'default';
  }
}

function getSubOptions(cat: AlgorithmCategory): Array<{ id: string; label: string }> {
  switch (cat) {
    case 'sorting':
      return [
        { id: 'bubble', label: 'Bubble Sort' },
        { id: 'selection', label: 'Selection Sort' },
        { id: 'insertion', label: 'Insertion Sort' },
        { id: 'merge', label: 'Merge Sort' },
        { id: 'quick', label: 'Quick Sort' },
      ];
    case 'linked-list':
      return [
        { id: 'reverse', label: 'In-Place Reverse (3 Pointers)' },
        { id: 'insert', label: 'Insert at Position' },
        { id: 'delete', label: 'Delete Node' },
      ];
    case 'stack-queue':
      return [
        { id: 'stack', label: 'Stack (LIFO Push/Pop)' },
        { id: 'queue', label: 'Queue (FIFO Enqueue/Dequeue)' },
      ];
    case 'tree-traversal':
      return [
        { id: 'inorder', label: 'In-Order (L-Root-R)' },
        { id: 'preorder', label: 'Pre-Order (Root-L-R)' },
        { id: 'postorder', label: 'Post-Order (L-R-Root)' },
        { id: 'levelorder', label: 'Level-Order (BFS)' },
      ];
    case 'graph-bfs-dfs':
      return [
        { id: 'bfs', label: 'Breadth-First Search (Queue)' },
        { id: 'dfs', label: 'Depth-First Search (Stack)' },
      ];
    case 'hash-table':
      return [
        { id: 'chaining', label: 'Separate Chaining (Buckets)' },
        { id: 'probing', label: 'Open Addressing (Linear Probing)' },
      ];
    default:
      return [{ id: 'default', label: 'Standard' }];
  }
}

// Step Generators for each algorithm
function generateSortingSteps(input: number[], algo: string): Step[] {
  const arr = [...input];
  const steps: Step[] = [];

  steps.push({
    description: `Initial unsorted array of ${arr.length} elements.`,
    data: [...arr],
    highlightedIndices: [],
  });

  if (algo === 'bubble') {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          description: `Comparing A[${j}] (${arr[j]}) and A[${j + 1}] (${arr[j + 1]}).`,
          data: [...arr],
          highlightedIndices: [j, j + 1],
          pointers: { i, j },
        });

        if (arr[j]! > arr[j + 1]!) {
          const temp = arr[j]!;
          arr[j] = arr[j + 1]!;
          arr[j + 1] = temp;
          steps.push({
            description: `Swapped ${arr[j + 1]} and ${arr[j]} because ${temp} > ${arr[j]}.`,
            data: [...arr],
            highlightedIndices: [j, j + 1],
            pointers: { i, j },
          });
        }
      }
      steps.push({
        description: `Element ${arr[n - i - 1]} placed at finalized sorted index ${n - i - 1}.`,
        data: [...arr],
        highlightedIndices: [n - i - 1],
      });
    }
  } else if (algo === 'selection') {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        steps.push({
          description: `Searching minimum from index ${i}. Comparing A[${j}] (${arr[j]}) with current min (${arr[minIdx]}).`,
          data: [...arr],
          highlightedIndices: [minIdx, j],
          pointers: { i, minIdx, j },
        });
        if (arr[j]! < arr[minIdx]!) minIdx = j;
      }
      if (minIdx !== i) {
        const temp = arr[i]!;
        arr[i] = arr[minIdx]!;
        arr[minIdx] = temp;
      }
      steps.push({
        description: `Placed minimum element ${arr[i]} into sorted position ${i}.`,
        data: [...arr],
        highlightedIndices: [i],
      });
    }
  } else if (algo === 'insertion') {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i]!;
      let j = i - 1;
      steps.push({
        description: `Picked key element ${key} at index ${i} to insert into sorted left portion.`,
        data: [...arr],
        highlightedIndices: [i],
        pointers: { key, i },
      });
      while (j >= 0 && arr[j]! > key) {
        arr[j + 1] = arr[j]!;
        steps.push({
          description: `Shifted element ${arr[j]} rightwards to index ${j + 1}.`,
          data: [...arr],
          highlightedIndices: [j, j + 1],
        });
        j--;
      }
      arr[j + 1] = key;
      steps.push({
        description: `Inserted key ${key} at index ${j + 1}.`,
        data: [...arr],
        highlightedIndices: [j + 1],
      });
    }
  } else {
    // Quick Sort sample steps
    arr.sort((a, b) => a - b);
    steps.push({
      description: `Partitioned array around pivot and merged sub-arrays into sorted order.`,
      data: [...arr],
      highlightedIndices: [0, Math.floor(arr.length / 2), arr.length - 1],
    });
  }

  steps.push({
    description: `Sorting complete! All ${arr.length} elements are in non-decreasing order.`,
    data: [...arr],
    highlightedIndices: Array.from({ length: arr.length }, (_, i) => i),
  });

  return steps;
}

function generateBinarySearchSteps(arr: number[], target: number): Step[] {
  const sorted = [...arr].sort((a, b) => a - b);
  const steps: Step[] = [];

  let low = 0;
  let high = sorted.length - 1;

  steps.push({
    description: `Binary search for target = ${target} on sorted array. Initial bounds: low=0, high=${high}.`,
    data: sorted,
    highlightedIndices: [low, high],
    pointers: { low, high, target },
  });

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    steps.push({
      description: `Calculated mid index = ${mid} (value = ${sorted[mid]}). Comparing with target = ${target}.`,
      data: sorted,
      highlightedIndices: [mid],
      pointers: { low, mid, high, target },
    });

    if (sorted[mid] === target) {
      steps.push({
        description: `Found target ${target} at index ${mid}! Search terminated successfully.`,
        data: sorted,
        highlightedIndices: [mid],
        pointers: { foundAt: mid },
      });
      return steps;
    } else if (sorted[mid]! < target) {
      steps.push({
        description: `Value ${sorted[mid]} < target ${target}. Target must be in right half. Setting low = mid + 1 (${mid + 1}).`,
        data: sorted,
        highlightedIndices: [mid],
        pointers: { low: mid + 1, high },
      });
      low = mid + 1;
    } else {
      steps.push({
        description: `Value ${sorted[mid]} > target ${target}. Target must be in left half. Setting high = mid - 1 (${mid - 1}).`,
        data: sorted,
        highlightedIndices: [mid],
        pointers: { low, high: mid - 1 },
      });
      high = mid - 1;
    }
  }

  steps.push({
    description: `low > high. Target ${target} does not exist in array. Return -1.`,
    data: sorted,
    highlightedIndices: [],
  });

  return steps;
}

function generateLinkedListSteps(values: number[], subAlgo: string): Step[] {
  const steps: Step[] = [];

  if (subAlgo === 'reverse') {
    steps.push({
      description: 'Initial singly linked list: 10 -> 20 -> 30 -> 40 -> 50 -> NULL.',
      data: { nodes: [10, 20, 30, 40, 50], links: [[0, 1], [1, 2], [2, 3], [3, 4]] },
      pointers: { prev: 'NULL', curr: 0 },
    });

    for (let i = 0; i < values.length; i++) {
      steps.push({
        description: `Step ${i + 1}: Save nextTemp = curr.next. Redirect curr.next to prev (${i === 0 ? 'NULL' : values[i - 1]}). Advance prev to curr, curr to nextTemp.`,
        data: {
          nodes: [10, 20, 30, 40, 50],
          currIdx: i,
          reversedUpTo: i,
        },
        pointers: { prev: values[i]!, curr: i + 1 < values.length ? values[i + 1]! : 'NULL' },
      });
    }

    steps.push({
      description: 'Reversal complete! New head is 50 -> 40 -> 30 -> 20 -> 10 -> NULL.',
      data: { nodes: [50, 40, 30, 20, 10], links: [[0, 1], [1, 2], [2, 3], [3, 4]] },
      pointers: { head: 50 },
    });
  } else {
    steps.push({
      description: 'Linked list manipulation: traversing nodes by following next pointers.',
      data: { nodes: [10, 20, 30, 40, 50] },
      pointers: { curr: 10 },
    });
  }

  return steps;
}

function generateStackQueueSteps(subAlgo: string): Step[] {
  const steps: Step[] = [];
  if (subAlgo === 'stack') {
    steps.push({ description: 'Empty stack initialized.', data: { type: 'stack', items: [] } });
    steps.push({ description: 'Push 10 onto stack top.', data: { type: 'stack', items: [10] } });
    steps.push({ description: 'Push 25 onto stack top.', data: { type: 'stack', items: [10, 25] } });
    steps.push({ description: 'Push 42 onto stack top.', data: { type: 'stack', items: [10, 25, 42] } });
    steps.push({ description: 'Peek stack top: 42.', data: { type: 'stack', items: [10, 25, 42], top: 42 } });
    steps.push({ description: 'Pop top element (42) in O(1) time.', data: { type: 'stack', items: [10, 25], popped: 42 } });
    steps.push({ description: 'Push 99 onto stack top.', data: { type: 'stack', items: [10, 25, 99] } });
  } else {
    steps.push({ description: 'Empty FIFO queue initialized.', data: { type: 'queue', items: [] } });
    steps.push({ description: 'Enqueue 10 at rear.', data: { type: 'queue', items: [10] } });
    steps.push({ description: 'Enqueue 20 at rear.', data: { type: 'queue', items: [10, 20] } });
    steps.push({ description: 'Enqueue 30 at rear.', data: { type: 'queue', items: [10, 20, 30] } });
    steps.push({ description: 'Dequeue front element (10) in O(1) time.', data: { type: 'queue', items: [20, 30], dequeued: 10 } });
    steps.push({ description: 'Enqueue 40 at rear.', data: { type: 'queue', items: [20, 30, 40] } });
  }
  return steps;
}

function generateTreeTraversalSteps(order: string): Step[] {
  const treeNodes = [
    { id: 4, label: '4 (Root)' },
    { id: 2, label: '2' },
    { id: 6, label: '6' },
    { id: 1, label: '1' },
    { id: 3, label: '3' },
    { id: 5, label: '5' },
    { id: 7, label: '7' },
  ];

  let visitSequence: number[] = [];
  if (order === 'inorder') visitSequence = [1, 2, 3, 4, 5, 6, 7];
  else if (order === 'preorder') visitSequence = [4, 2, 1, 3, 6, 5, 7];
  else if (order === 'postorder') visitSequence = [1, 3, 2, 5, 7, 6, 4];
  else visitSequence = [4, 2, 6, 1, 3, 5, 7]; // level order

  const steps: Step[] = [];
  steps.push({
    description: `Binary Search Tree initialized. Traversal: ${order.toUpperCase()}.`,
    data: { visited: [], current: null },
  });

  const visitedSoFar: number[] = [];
  for (const nodeVal of visitSequence) {
    visitedSoFar.push(nodeVal);
    steps.push({
      description: `Visited Node ${nodeVal}. Current output stream: [${visitedSoFar.join(', ')}].`,
      data: { visited: [...visitedSoFar], current: nodeVal },
      pointers: { current: nodeVal },
    });
  }

  steps.push({
    description: `Traversal complete! Final visited sequence: [${visitedSoFar.join(', ')}].`,
    data: { visited: visitedSoFar, current: null },
  });

  return steps;
}

function generateGraphSteps(algo: string): Step[] {
  const steps: Step[] = [];
  const sequence = algo === 'bfs' ? ['A', 'B', 'C', 'D', 'E'] : ['A', 'B', 'D', 'E', 'C'];

  steps.push({
    description: `Graph with 5 vertices (A, B, C, D, E). Starting traversal from Node A using ${algo.toUpperCase()}.`,
    data: { visited: [], current: 'A' },
  });

  const visited: string[] = [];
  for (const node of sequence) {
    visited.push(node);
    steps.push({
      description: `Discovered and processed Node ${node}. Visited set: {${visited.join(', ')}}.`,
      data: { visited: [...visited], current: node },
      pointers: { activeNode: node },
    });
  }

  return steps;
}

function generateDijkstraSteps(): Step[] {
  return [
    {
      description: 'Initialize single-source shortest path from A. dist[A] = 0, all others = ∞.',
      data: { table: { A: 0, B: '∞', C: '∞', D: '∞' }, active: 'A' },
      pointers: { src: 'A' },
    },
    {
      description: 'Extract min node A (dist 0). Relax edges: A->B (4), A->C (2). dist[B]=4, dist[C]=2.',
      data: { table: { A: 0, B: 4, C: 2, D: '∞' }, active: 'C' },
      pointers: { currentMin: 'C', dist: 2 },
    },
    {
      description: 'Extract min node C (dist 2). Relax edge C->B (weight 1): dist[B] improves from 4 to 2+1=3. Relax C->D (weight 5): dist[D]=7.',
      data: { table: { A: 0, B: 3, C: 2, D: 7 }, active: 'B' },
      pointers: { currentMin: 'B', dist: 3 },
    },
    {
      description: 'Extract min node B (dist 3). Relax edge B->D (weight 2): dist[D] improves from 7 to 3+2=5!',
      data: { table: { A: 0, B: 3, C: 2, D: 5 }, active: 'D' },
      pointers: { finalized: 'D', dist: 5 },
    },
    {
      description: 'All nodes finalized! Shortest path to D is A -> C -> B -> D with total weight 5.',
      data: { table: { A: 0, B: 3, C: 2, D: 5 }, active: null, shortestPath: ['A', 'C', 'B', 'D'] },
    },
  ];
}

function generateRecursionTreeSteps(n: number): Step[] {
  return [
    {
      description: `Compute fib(4). Root call frame fib(4) placed on recursion stack.`,
      data: { calls: ['fib(4)'], active: 'fib(4)' },
    },
    {
      description: `fib(4) branches into fib(3) + fib(2). Evaluating left branch fib(3).`,
      data: { calls: ['fib(4)', 'fib(3)'], active: 'fib(3)' },
    },
    {
      description: `fib(3) branches into fib(2) + fib(1). Evaluating left branch fib(2).`,
      data: { calls: ['fib(4)', 'fib(3)', 'fib(2)'], active: 'fib(2)' },
    },
    {
      description: `fib(2) branches into base cases fib(1) [returns 1] and fib(0) [returns 0]. fib(2) returns 1.`,
      data: { calls: ['fib(4)', 'fib(3)', 'fib(2)->1'], active: 'fib(2)' },
    },
    {
      description: `Notice overlapping subproblem: fib(2) is evaluated redundantly in both branches! This demonstrates why DP memoization reduces O(2^N) to O(N).`,
      data: { calls: ['fib(4)', 'fib(3)->2', 'fib(2)->1'], active: 'overlap' },
    },
    {
      description: `Root call fib(4) sums fib(3)=2 + fib(2)=1 to return final result: 3.`,
      data: { calls: ['fib(4)->3'], final: 3 },
    },
  ];
}

function generateDPTableSteps(): Step[] {
  return [
    {
      description: '0/1 Knapsack Table initialized. Capacity W = 4, Items = 3 (weights: [1, 2, 3], values: [6, 10, 12]).',
      data: {
        grid: [
          [0, 0, 0, 0, 0],
          [0, 6, 6, 6, 6],
          [0, 6, 10, 16, 16],
          [0, 6, 10, 16, 18],
        ],
        activeCell: [0, 0],
      },
    },
    {
      description: 'Row 1 (Item 1, wt=1, val=6): Fits in all capacities w >= 1. Table values set to 6.',
      data: {
        grid: [
          [0, 0, 0, 0, 0],
          [0, 6, 6, 6, 6],
          [0, 6, 10, 16, 16],
          [0, 6, 10, 16, 18],
        ],
        activeCell: [1, 1],
      },
    },
    {
      description: 'Row 2, Cap 3: dp[2][3] = max(dp[1][3]=6, val=10 + dp[1][3-2]=6) = 16. Both items fit!',
      data: {
        grid: [
          [0, 0, 0, 0, 0],
          [0, 6, 6, 6, 6],
          [0, 6, 10, 16, 16],
          [0, 6, 10, 16, 18],
        ],
        activeCell: [2, 3],
      },
    },
    {
      description: 'Final cell dp[3][4] = 18. Maximum attainable knapsack value is 18 (Items 1 and 3).',
      data: {
        grid: [
          [0, 0, 0, 0, 0],
          [0, 6, 6, 6, 6],
          [0, 6, 10, 16, 16],
          [0, 6, 10, 16, 18],
        ],
        activeCell: [3, 4],
      },
    },
  ];
}

function generateHashTableSteps(subAlgo: string): Step[] {
  if (subAlgo === 'chaining') {
    return [
      {
        description: 'Separate Chaining: Hash table with 5 buckets (indices 0..4). Hash function: h(k) = k % 5.',
        data: { buckets: [[], [], [], [], []] },
      },
      {
        description: 'Insert 12: h(12) = 12 % 5 = 2. Added to bucket 2.',
        data: { buckets: [[], [], [12], [], []] },
        pointers: { key: 12, bucket: 2 },
      },
      {
        description: 'Insert 22: h(22) = 22 % 5 = 2. Collision! Chained onto linked list at bucket 2: 12 -> 22.',
        data: { buckets: [[], [], [12, 22], [], []] },
        pointers: { key: 22, collisionAt: 2 },
      },
      {
        description: 'Insert 14: h(14) = 14 % 5 = 4. Added to bucket 4.',
        data: { buckets: [[], [], [12, 22], [], [14]] },
        pointers: { key: 14, bucket: 4 },
      },
    ];
  } else {
    return [
      {
        description: 'Open Addressing with Linear Probing: Capacity = 5. Table is empty.',
        data: { slots: [null, null, null, null, null] },
      },
      {
        description: 'Insert 12: h(12) = 2. Slot 2 is empty -> placed at slot 2.',
        data: { slots: [null, null, 12, null, null] },
      },
      {
        description: 'Insert 17: h(17) = 2. Collision at slot 2! Probe slot 3 -> empty, placed at slot 3.',
        data: { slots: [null, null, 12, 17, null] },
      },
      {
        description: 'Insert 22: h(22) = 2. Collisions at slots 2 and 3! Probe slot 4 -> empty, placed at slot 4.',
        data: { slots: [null, null, 12, 17, 22] },
      },
    ];
  }
}

// ---------------- Canvas Renderers ----------------

function renderVisualCanvas(category: AlgorithmCategory, step: Step, reducedMotion: boolean) {
  const transitionClass = reducedMotion ? '' : 'transition-all duration-300';

  if (category === 'sorting' || category === 'binary-search') {
    const arr: number[] = Array.isArray(step.data) ? step.data : [];
    const maxVal = Math.max(...arr, 100);

    return (
      <div className="flex items-end justify-center gap-3 w-full h-64 max-w-2xl px-4 pb-4">
        {arr.map((val, idx) => {
          const isHighlighted = step.highlightedIndices?.includes(idx);
          const heightPercent = Math.max(15, Math.round((val / maxVal) * 100));

          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[11px] font-mono text-slate-400 font-bold">{val}</span>
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-lg ${transitionClass} ${
                  isHighlighted
                    ? 'bg-sky-400 shadow-lg shadow-sky-400/40 ring-2 ring-sky-300'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              />
              <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
            </div>
          );
        })}
      </div>
    );
  }

  if (category === 'linked-list') {
    const nodes = step.data.nodes || [10, 20, 30, 40, 50];
    const currIdx = step.data.currIdx ?? -1;

    return (
      <div className="flex items-center gap-3 overflow-x-auto py-8">
        {nodes.map((val: number, i: number) => (
          <React.Fragment key={i}>
            <div
              className={`w-16 h-16 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold text-sm ${transitionClass} ${
                i === currIdx
                  ? 'border-sky-400 bg-sky-500/20 text-sky-300 shadow-lg shadow-sky-500/30'
                  : 'border-slate-700 bg-slate-900 text-slate-200'
              }`}
            >
              <span>{val}</span>
              <span className="text-[9px] text-slate-500 font-sans">node</span>
            </div>
            {i < nodes.length - 1 && (
              <div className="text-slate-500 font-bold text-lg flex items-center">
                &rarr;
              </div>
            )}
          </React.Fragment>
        ))}
        <div className="text-xs font-mono text-slate-500 px-3 py-1 rounded bg-slate-900 border border-slate-800">
          NULL
        </div>
      </div>
    );
  }

  if (category === 'stack-queue') {
    const items = step.data.items || [];
    const isStack = step.data.type === 'stack';

    return (
      <div className="flex flex-col items-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          {isStack ? 'Stack (LIFO - Top on Right)' : 'Queue (FIFO - Front on Left)'}
        </span>
        <div className="flex items-center gap-2 p-4 rounded-2xl border border-slate-800 bg-slate-900/40 min-h-[80px] min-w-[280px]">
          {items.length === 0 ? (
            <span className="text-xs text-slate-500 mx-auto italic">Empty collection</span>
          ) : (
            items.map((val: number, idx: number) => (
              <div
                key={idx}
                className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/40 text-sky-300 font-bold text-sm font-mono flex items-center justify-center animate-fade-in"
              >
                {val}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (category === 'tree-traversal') {
    const visited: number[] = step.data.visited || [];
    const current = step.data.current;

    return (
      <div className="flex flex-col items-center gap-6">
        {/* Simple SVG Tree Representation */}
        <svg className="w-80 h-48" viewBox="0 0 320 200">
          {/* Edges */}
          <line x1="160" y1="30" x2="80" y2="90" stroke="#334155" strokeWidth="2" />
          <line x1="160" y1="30" x2="240" y2="90" stroke="#334155" strokeWidth="2" />
          <line x1="80" y1="90" x2="40" y2="150" stroke="#334155" strokeWidth="2" />
          <line x1="80" y1="90" x2="120" y2="150" stroke="#334155" strokeWidth="2" />
          <line x1="240" y1="90" x2="200" y2="150" stroke="#334155" strokeWidth="2" />
          <line x1="240" y1="90" x2="280" y2="150" stroke="#334155" strokeWidth="2" />

          {/* Nodes */}
          {[
            { val: 4, x: 160, y: 30 },
            { val: 2, x: 80, y: 90 },
            { val: 6, x: 240, y: 90 },
            { val: 1, x: 40, y: 150 },
            { val: 3, x: 120, y: 150 },
            { val: 5, x: 200, y: 150 },
            { val: 7, x: 280, y: 150 },
          ].map((n) => {
            const isCurrent = current === n.val;
            const isVisited = visited.includes(n.val);
            const fill = isCurrent ? '#38bdf8' : isVisited ? '#2dd4bf' : '#1e293b';
            const textFill = isCurrent ? '#020617' : '#f8fafc';

            return (
              <g key={n.val}>
                <circle cx={n.x} cy={n.y} r="18" fill={fill} stroke="#475569" strokeWidth="2" />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  fill={textFill}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {n.val}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
          <span className="text-slate-500 font-sans">Visited Output:</span>
          <span>[{visited.join(', ')}]</span>
        </div>
      </div>
    );
  }

  if (category === 'dijkstra') {
    const table = step.data.table || {};
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Dijkstra Distance Table
        </div>
        <div className="grid grid-cols-4 gap-4 min-w-[320px]">
          {Object.entries(table).map(([node, dist]: any) => (
            <div
              key={node}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col items-center"
            >
              <span className="text-sm font-bold text-sky-400">Node {node}</span>
              <span className="text-xl font-extrabold text-white mt-1 font-mono">{dist}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (category === 'dp-table') {
    const grid: number[][] = step.data.grid || [];
    const [actR, actC] = step.data.activeCell || [-1, -1];

    return (
      <div className="overflow-x-auto">
        <table className="border-collapse text-xs font-mono">
          <thead>
            <tr>
              <th className="p-2 border border-slate-800 text-slate-500">Items \ Cap</th>
              {[0, 1, 2, 3, 4].map((c) => (
                <th key={c} className="p-2 border border-slate-800 text-slate-400">
                  W={c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, r) => (
              <tr key={r}>
                <td className="p-2 border border-slate-800 text-slate-400 font-bold">
                  {r === 0 ? 'Base 0' : `Item ${r}`}
                </td>
                {row.map((cell, c) => {
                  const isActive = r === actR && c === actC;
                  return (
                    <td
                      key={c}
                      className={`p-3 text-center border transition ${
                        isActive
                          ? 'border-sky-400 bg-sky-500/30 text-white font-extrabold text-sm ring-1 ring-sky-300'
                          : 'border-slate-800 bg-slate-900/40 text-slate-300'
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (category === 'hash-table') {
    if (step.data.buckets) {
      const buckets: number[][] = step.data.buckets;
      return (
        <div className="flex flex-col gap-3 min-w-[340px]">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Separate Chaining Buckets
          </span>
          {buckets.map((b, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-16 text-xs font-mono text-slate-400 font-bold">
                Bucket [{idx}]:
              </span>
              <div className="flex items-center gap-2 flex-1 p-2 rounded-lg bg-slate-900 border border-slate-800 min-h-[38px]">
                {b.length === 0 ? (
                  <span className="text-[11px] text-slate-600 italic">empty</span>
                ) : (
                  b.map((val, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-mono font-bold"
                    >
                      {val} {i < b.length - 1 && '->'}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  // Fallback generic state
  return (
    <div className="text-center text-sm font-mono text-slate-400">
      <pre>{JSON.stringify(step.data, null, 2)}</pre>
    </div>
  );
}
