'use client';

import React, { useState } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { Play, Save, Share2, ShieldAlert } from 'lucide-react';

const initialNodes = [
  { id: '1', position: { x: 100, y: 150 }, data: { label: 'API Gateway (Rate Limiter)' }, style: { background: '#0284c7', color: '#fff', borderRadius: '8px', padding: '12px', border: '1px solid #38bdf8' } },
  { id: '2', position: { x: 380, y: 80 }, data: { label: 'Auth Service (Clerk Verified)' }, style: { background: '#1e293b', color: '#f8fafc', borderRadius: '8px', padding: '12px', border: '1px solid #475569' } },
  { id: '3', position: { x: 380, y: 220 }, data: { label: 'Learning Service' }, style: { background: '#1e293b', color: '#f8fafc', borderRadius: '8px', padding: '12px', border: '1px solid #475569' } },
  { id: '4', position: { x: 680, y: 220 }, data: { label: 'PostgreSQL (Dedicated Schema)' }, style: { background: '#0f172a', color: '#38bdf8', borderRadius: '8px', padding: '12px', border: '1px solid #0284c7' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4' },
];

export default function PlaygroundPage() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Toolbar */}
      <div className="h-14 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-sm">System Atlas Playground</span>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">Draft Project</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium flex items-center gap-1.5">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-xs text-slate-950 font-bold flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5" /> Run Simulation
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 w-full h-full relative">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background color="#1e293b" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
