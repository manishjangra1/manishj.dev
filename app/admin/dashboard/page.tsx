'use client';

import { useEffect, useState } from 'react';
import { FolderKanban, Code, Briefcase, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    blogPosts: 0,
    messages: 0,
  });

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
          projects: projects.length || 0,
          skills: skills.length || 0,
          experiences: experiences.length || 0,
          blogPosts: blogPosts.length || 0,
          messages: messages.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, href: '/admin/projects', color: 'from-blue-500 to-cyan-500' },
    { label: 'Skills', value: stats.skills, icon: Code, href: '/admin/skills', color: 'from-purple-500 to-pink-500' },
    { label: 'Experience', value: stats.experiences, icon: Briefcase, href: '/admin/experience', color: 'from-green-500 to-emerald-500' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: FileText, href: '/admin/blog', color: 'from-orange-500 to-red-500' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, href: '/admin/contact', color: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {card.value}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-300">{card.label}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

