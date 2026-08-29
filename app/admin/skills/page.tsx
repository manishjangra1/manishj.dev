'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Code, Search } from 'lucide-react';
import { ISkill } from '@/lib/models/Skill';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SkillsPage() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSkills();
      } else {
        alert('Failed to delete skill.');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  // Derive unique categories dynamically
  const uniqueCategories = Array.from(
    new Set(skills.map((s) => s.category?.trim()).filter(Boolean))
  );

  const filteredSkills = skills.filter((skill) => {
    const matchesCat =
      selectedCategory === 'all' ||
      skill.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery.trim() ||
      skill.name?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      skill.category?.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesCat && matchesSearch;
  });

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading skills...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Skills & Capabilities
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Manage your individual skills, custom categories, proficiency metrics, and ordering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/skills/new"
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-none',
              'bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-all duration-150'
            )}
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-1.5 pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-3 py-1.5 text-xs font-mono rounded-none transition-colors border whitespace-nowrap',
              selectedCategory === 'all'
                ? 'bg-[var(--color-surface)] border-[var(--color-border-strong)] text-[var(--color-text)] font-semibold'
                : 'bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            )}
          >
            All ({skills.length})
          </button>
          {uniqueCategories.map((cat) => {
            const count = skills.filter(
              (s) => s.category?.toLowerCase() === cat.toLowerCase()
            ).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 text-xs font-mono rounded-none transition-colors border whitespace-nowrap uppercase',
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[var(--color-surface)] border-[var(--color-border-strong)] text-[var(--color-text)] font-semibold'
                    : 'bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                )}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div className="relative min-w-[200px] sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills..."
            className="w-full pl-8 pr-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono rounded-none outline-none focus:border-[var(--color-border-strong)]"
          />
        </div>
      </div>

      {/* Skills Table */}
      <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              <tr>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Skill Name
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Category
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Proficiency
                </th>
                <th className="px-5 py-3 font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Order
                </th>
                <th className="px-5 py-3 text-right font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredSkills.map((skill) => {
                const id = skill._id?.toString();
                return (
                  <tr key={id} className="hover:bg-[var(--color-surface)]/50 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-sm text-[var(--color-text)]">
                      {skill.name}
                    </td>
                    <td className="px-5 py-3.5 text-[var(--color-text-secondary)] uppercase">
                      <span className="px-2 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-none text-[11px]">
                        {skill.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[var(--color-text-secondary)]">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-[var(--color-surface)] border border-[var(--color-border)] h-2 rounded-none overflow-hidden">
                          <div
                            className="bg-[var(--color-text)] h-full"
                            style={{ width: `${skill.proficiency || 85}%` }}
                          />
                        </div>
                        <span>{skill.proficiency || 85}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[var(--color-text-muted)]">
                      {skill.order || 0}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/skills/${id}`}
                          className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] rounded-none"
                          title="Edit skill"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(id!)}
                          className="p-1.5 text-red-500/80 hover:text-red-500 border border-red-500/30 hover:bg-red-500/10 rounded-none transition-colors"
                          title="Delete skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredSkills.length === 0 && (
        <div className="p-12 text-center bg-[var(--color-card)] border border-dashed border-[var(--color-border)] rounded-none">
          <Code className="w-8 h-8 mx-auto text-[var(--color-text-muted)] mb-3" />
          <h3 className="font-bold text-sm text-[var(--color-text)]">No skills found</h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 mb-4">
            Try adjusting your search query or add a new skill to this category.
          </p>
          <Link
            href="/admin/skills/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono font-semibold rounded-none uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </Link>
        </div>
      )}
    </div>
  );
}
