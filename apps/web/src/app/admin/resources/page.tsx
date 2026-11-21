'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
  Calendar,
} from 'lucide-react';

interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  url: string;
  category: string;
  author: string;
  license: string;
  lastVerifiedDate: string;
}

export default function AdminResourcesManagementPage() {
  const [resources, setResources] = useState<ResourceItem[]>([
    {
      id: 'res-1',
      slug: 'google-spanner-white-paper',
      title: 'Google Spanner: Becoming a Globally Distributed Database',
      url: 'https://research.google/pubs/pub39966/',
      category: 'WHITE_PAPER',
      author: 'Corbett et al. (Google Research)',
      license: 'Academic & Educational Citation Rights',
      lastVerifiedDate: '2026-11-15',
    },
    {
      id: 'res-2',
      slug: 'designing-data-intensive-applications',
      title: 'Designing Data-Intensive Applications',
      url: 'https://dataintensive.net/',
      category: 'BOOK',
      author: 'Martin Kleppmann',
      license: 'Book Reference / Fair Use',
      lastVerifiedDate: '2026-11-10',
    },
    {
      id: 'res-3',
      slug: 'mit-6824-distributed-systems',
      title: 'MIT 6.824: Distributed Systems Engineering',
      url: 'https://pdos.csail.mit.edu/6.824/',
      category: 'UNIVERSITY_COURSE',
      author: 'Prof. Robert Morris & Frans Kaashoek',
      license: 'MIT OpenCourseWare / CC BY-NC-SA',
      lastVerifiedDate: '2026-11-12',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('DOCUMENTATION');
  const [newAuthor, setNewAuthor] = useState('');
  const [newLicense, setNewLicense] = useState('Open Access Citation');

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newRes: ResourceItem = {
      id: `res-${Math.random().toString(36).substring(2, 7)}`,
      slug,
      title: newTitle,
      url: newUrl,
      category: newCategory,
      author: newAuthor || 'Verified Engineering Publisher',
      license: newLicense,
      lastVerifiedDate: new Date().toISOString().split('T')[0]!,
    };

    setResources((prev) => [newRes, ...prev]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewUrl('');
    setNewAuthor('');
  };

  const handleDeleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/content"
            className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Ingestion Pipeline
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 transition shadow-sm shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" /> Add External Resource
          </button>
        </div>

        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Resource Directory Management
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Maintain verified external citations, audit license permissions, update destination URLs, and prune obsolete references.
          </p>
        </div>

        {/* Resources Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6">Resource Title</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Publisher / Author</th>
                <th className="py-3.5 px-6">Verified Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {resources.map((res) => (
                <tr key={res.id} className="hover:bg-slate-900/70 transition">
                  <td className="py-4 px-6">
                    <span className="font-bold text-white block">{res.title}</span>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-sky-400 hover:underline font-mono inline-flex items-center gap-1 mt-0.5"
                    >
                      {res.url} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {res.category.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-300">{res.author}</td>
                  <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">
                    {res.lastVerifiedDate}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleDeleteResource(res.id)}
                      className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition"
                      title="Delete resource"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for adding external resource */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
              <h3 className="text-base font-bold text-white">Add Verified External Resource</h3>
              <form onSubmit={handleCreateResource} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. DynamoDB Architecture Paper"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Direct Source URL</label>
                  <input
                    type="url"
                    required
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-sky-500 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="WHITE_PAPER">White Paper</option>
                      <option value="BOOK">Book</option>
                      <option value="DOCUMENTATION">Official Documentation</option>
                      <option value="ENGINEERING_BLOG">Engineering Blog</option>
                      <option value="UNIVERSITY_COURSE">University Course</option>
                      <option value="DSA_RESOURCE">DSA Resource</option>
                      <option value="SYSTEM_DESIGN_CASE_STUDY">Case Study</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1 font-semibold">Author / Publisher</label>
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. AWS Architecture Team"
                      className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Verified License</label>
                  <input
                    type="text"
                    value={newLicense}
                    onChange={(e) => setNewLicense(e.target.value)}
                    placeholder="e.g. CC-BY 4.0 / Academic Citation"
                    className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold"
                  >
                    Save Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
