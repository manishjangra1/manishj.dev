'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SkillFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    icon: '',
    proficiency: 85,
    order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchSkill();
    }
  }, [id]);

  const fetchSkill = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/skills/${id}`);
      const data = await res.json();
      if (data) {
        setFormData({
          name: data.name || '',
          category: data.category || 'frontend',
          icon: data.icon || '',
          proficiency: data.proficiency || 85,
          order: data.order || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching skill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/skills/${id}` : '/api/skills';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/skills');
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Failed to save skill' }));
        alert(errorData.error || 'Failed to save skill');
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading skill...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-2xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <Link
            href="/admin/skills"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to skills</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            {isEdit ? `Edit: ${formData.name || 'Skill'}` : 'New Skill'}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Configure skill classification, proficiency score, and sorting order.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className={cn(
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-none text-xs font-semibold uppercase tracking-wider',
            'bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-all duration-150',
            'disabled:opacity-50'
          )}
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? 'Saving...' : 'Save Skill'}</span>
        </button>
      </div>

      <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-5">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            Skill Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="TypeScript, PostgreSQL, etc."
            className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Category Classification *
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g. Clients, Servers, Platform, Tools"
              className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })}
              className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
              Proficiency Level
            </label>
            <span className="font-mono text-xs font-bold text-[var(--color-text)]">
              {formData.proficiency}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={formData.proficiency}
            onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value, 10) })}
            className="w-full accent-[var(--color-text)] cursor-pointer"
          />
        </div>
      </div>
    </form>
  );
}
