'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  BookOpen,
  Code2,
  Eye,
  Layers,
  Compass,
  FileText,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/learn', label: 'System Design', icon: BookOpen },
    { href: '/dsa', label: 'DSA Hub', icon: Code2 },
    { href: '/dsa/roadmap', label: 'Roadmap', icon: Compass },
    { href: '/dsa/visualizer', label: 'Visualizer', icon: Eye },
    { href: '/dsa/practice', label: 'Practice', icon: Terminal },
    { href: '/playground', label: 'Playground', icon: Layers },
    { href: '/resources', label: 'Resources', icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-base">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-white leading-none">
                System Atlas
              </span>
              <span className="text-[10px] font-medium text-slate-400 leading-tight">
                Engineering Curriculum
              </span>
            </div>
          </Link>

          {/* Primary Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    active
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right CTA / Admin & Dashboard */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/content"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
              pathname.startsWith('/admin')
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </Link>

          <Link
            href="/dashboard"
            className="text-xs font-semibold px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/dsa/practice"
            className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition inline-flex items-center gap-1 shadow-sm shadow-sky-500/20"
          >
            Start Practice
          </Link>
        </div>
      </div>
    </header>
  );
}
