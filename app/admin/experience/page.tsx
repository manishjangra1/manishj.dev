'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Briefcase, ChevronUp, ChevronDown } from 'lucide-react';
import { IExperience } from '@/lib/models/Experience';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience');
      const data = await res.json();
      setExperiences(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;

    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchExperiences();
      } else {
        alert('Failed to delete experience.');
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (reordering) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;

    setReordering(true);
    const updated = [...experiences];
    const currentItem = updated[index];
    const targetItem = updated[targetIndex];

    const currentId = currentItem._id?.toString();
    const targetId = targetItem._id?.toString();

    // Swap order values
    const currentOrder = currentItem.order || index + 1;
    const targetOrder = targetItem.order || targetIndex + 1;

    try {
      await Promise.all([
        fetch(`/api/experience/${currentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: targetOrder }),
        }),
        fetch(`/api/experience/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: currentOrder }),
        }),
      ]);
      await fetchExperiences();
    } catch (err) {
      console.error('Error reordering experiences:', err);
    } finally {
      setReordering(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading experience timeline...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Career Experience
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Manage your employment history, roles, milestones, and display ordering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/experience/new"
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-none',
              'bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-all duration-150'
            )}
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </Link>
        </div>
      </div>

      {/* Experience List */}
      <div className="grid grid-cols-1 gap-4">
        {experiences.map((exp, idx) => {
          const id = exp._id?.toString();
          const startYear = exp.startDate ? new Date(exp.startDate).getFullYear() : '—';
          const endYear = exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present';
          const orderNum = exp.order || idx + 1;

          return (
            <div
              key={id}
              className={cn(
                'bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none',
                'hover:border-[var(--color-border-strong)] transition-all duration-150',
                'flex flex-col sm:flex-row sm:items-start justify-between gap-6 group'
              )}
            >
              <div className="flex-1 min-w-0 flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[11px] font-bold text-[var(--color-text-muted)]">
                    0{idx + 1} //
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--color-text)] px-2.5 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-none">
                    {startYear} – {endYear}
                  </span>
                  {exp.current && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-none">
                      Current Role
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                    Order: #{orderNum}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--color-text)]">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-secondary)] font-medium mt-0.5">
                    <span className="font-semibold text-[var(--color-text)]">{exp.company}</span>
                    {exp.location && (
                      <span className="flex items-center gap-1 font-mono text-[var(--color-text-muted)]">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </span>
                    )}
                  </div>
                </div>

                {exp.description && (
                  <div className="mt-2 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {Array.isArray(exp.description) ? (
                      <ul className="list-disc pl-4 space-y-1">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{exp.description}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons & Reorder */}
              <div className="flex items-center gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--color-border)]">
                {/* Up/Down Quick Ordering */}
                <div className="flex items-center border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <button
                    type="button"
                    disabled={idx === 0 || reordering}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1.5 hover:bg-[var(--color-surface-hover)] disabled:opacity-30 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    title="Move higher (display earlier)"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === experiences.length - 1 || reordering}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1.5 hover:bg-[var(--color-surface-hover)] disabled:opacity-30 text-[var(--color-text-muted)] hover:text-[var(--color-text)] border-l border-[var(--color-border)]"
                    title="Move lower (display later)"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Link
                  href={`/admin/experience/${id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium border border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none transition-all"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(id!)}
                  className="p-2 text-red-500/80 hover:text-red-500 border border-red-500/30 hover:bg-red-500/10 rounded-none transition-colors"
                  title="Delete experience entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {experiences.length === 0 && (
        <div className="p-12 text-center bg-[var(--color-card)] border border-dashed border-[var(--color-border)] rounded-none">
          <Briefcase className="w-8 h-8 mx-auto text-[var(--color-text-muted)] mb-3" />
          <h3 className="font-bold text-sm text-[var(--color-text)]">No experience entries yet</h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 mb-4">
            Add your employment history and engineering milestones.
          </p>
          <Link
            href="/admin/experience/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono font-semibold rounded-none uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Role</span>
          </Link>
        </div>
      )}
    </div>
  );
}
