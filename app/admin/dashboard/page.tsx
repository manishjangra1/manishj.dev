'use client';

import { useEffect, useState } from 'react';
import { FolderKanban, Code, Briefcase, FileText, MessageSquare, Plus, ExternalLink, Settings } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    blogPosts: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, experiences, blogPosts, messages] = await Promise.all([
          fetch('/api/projects').then((r) => r.json()),
          fetch('/api/skills').then((r) => r.json()),
          fetch('/api/experience').then((r) => r.json()),
          fetch('/api/blog').then((r) => r.json()),
          fetch('/api/contact').then((r) => r.json()),
        ]);

        setStats({
          projects: Array.isArray(projects) ? projects.length : 0,
          skills: Array.isArray(skills) ? skills.length : 0,
          experiences: Array.isArray(experiences) ? experiences.length : 0,
          blogPosts: Array.isArray(blogPosts) ? blogPosts.length : 0,
          messages: Array.isArray(messages) ? messages.length : 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects & Case Studies', value: stats.projects, icon: FolderKanban, href: '/admin/projects', index: '01' },
    { label: 'Blog Posts & Articles', value: stats.blogPosts, icon: FileText, href: '/admin/blog', index: '02' },
    { label: 'Skills & Capabilities', value: stats.skills, icon: Code, href: '/admin/skills', index: '03' },
    { label: 'Career Experience', value: stats.experiences, icon: Briefcase, href: '/admin/experience', index: '04' },
    { label: 'Contact Messages', value: stats.messages, icon: MessageSquare, href: '/admin/contact', index: '05' },
  ];

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            System Dashboard
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Manage your live portfolio content, projects, case studies, and blog articles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono border border-[var(--color-border-strong)] bg-[var(--color-surface)]/80 hover:bg-[var(--color-surface-hover)] rounded-none transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={cn(
                'group p-6 bg-[var(--color-card)] border border-[var(--color-border)] rounded-none',
                'hover:border-[var(--color-border-strong)] hover:shadow-xs transition-all duration-150',
                'flex flex-col justify-between'
              )}
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                    {card.index} //
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-text)]">
                    {card.label}
                  </span>
                </div>
                <Icon className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors" />
              </div>

              <div className="flex items-baseline justify-between pt-2">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)] tabular-nums">
                  {loading ? '—' : card.value}
                </span>
                <span className="text-xs font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors flex items-center gap-1">
                  <span>Manage</span>
                  <span>→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none">
        <div className="pb-4 mb-5 border-b border-[var(--color-border)] flex items-center justify-between">
          <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider uppercase">
            QUICK ACTIONS
          </span>
          <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
            Create & Update
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2.5 px-4 py-3 bg-[var(--color-surface)]/60 hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] rounded-none text-xs font-medium text-[var(--color-text)] transition-all"
          >
            <Plus className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2.5 px-4 py-3 bg-[var(--color-surface)]/60 hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] rounded-none text-xs font-medium text-[var(--color-text)] transition-all"
          >
            <Plus className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>Write Blog Post</span>
          </Link>
          <Link
            href="/admin/experience/new"
            className="flex items-center gap-2.5 px-4 py-3 bg-[var(--color-surface)]/60 hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] rounded-none text-xs font-medium text-[var(--color-text)] transition-all"
          >
            <Plus className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>Add Experience</span>
          </Link>
          <Link
            href="/admin/skills/new"
            className="flex items-center gap-2.5 px-4 py-3 bg-[var(--color-surface)]/60 hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] rounded-none text-xs font-medium text-[var(--color-text)] transition-all"
          >
            <Plus className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>Add Skill</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


