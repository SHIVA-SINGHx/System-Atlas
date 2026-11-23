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
  Briefcase,
} from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/learn', label: 'System Design', icon: BookOpen },
    { href: '/learn/roadmap', label: 'SD Roadmap', icon: Compass, badge: 'New' },
    { href: '/interviews', label: 'SD Interviews', icon: Briefcase, badge: 'Hot' },
    { href: '/dsa', label: 'DSA Hub', icon: Code2 },
    { href: '/dsa/roadmap', label: 'DSA Path', icon: Compass },
    { href: '/dsa/visualizer', label: 'Visualizer', icon: Eye },
    { href: '/dsa/practice', label: 'Practice', icon: Terminal },
    { href: '/resources', label: 'Resources', icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href === '/learn') return pathname === '/learn' || (pathname.startsWith('/learn/') && !pathname.startsWith('/learn/roadmap'));
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold text-base group-hover:border-sky-400 transition">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-white leading-none group-hover:text-sky-300 transition">
                System Atlas
              </span>
              <span className="text-[10px] font-medium text-slate-400 leading-tight">
                Engineering Curriculum
              </span>
            </div>
          </Link>

          {/* Primary Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {links.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition relative ${
                    active
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm shadow-sky-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                  {link.badge && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right CTA / Admin & Dashboard */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/content"
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
              pathname.startsWith('/admin')
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Admin
          </Link>

          <Link
            href="/dashboard"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/interviews"
            className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 transition inline-flex items-center gap-1 shadow-sm shadow-sky-500/20"
          >
            <Briefcase className="w-3.5 h-3.5" /> Interview Prep
          </Link>
        </div>
      </div>
    </header>
  );
}
