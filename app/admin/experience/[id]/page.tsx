'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ExperienceFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: [] as string[],
    current: false,
    location: '',
    logo: '',
    order: 0,
  });
  const [descInput, setDescInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/experience/${id}`);
      const data = await res.json();
      if (data) {
        setFormData({
          company: data.company || '',
          role: data.role || '',
          startDate: data.startDate ? new Date(data.startDate).toISOString().split('T')[0] : '',
          endDate: data.endDate ? new Date(data.endDate).toISOString().split('T')[0] : '',
          description: Array.isArray(data.description) ? data.description : data.description ? [data.description] : [],
          current: data.current || false,
          location: data.location || '',
          logo: data.logo || '',
          order: data.order || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/experience/${id}` : '/api/experience';
      const method = isEdit ? 'PUT' : 'POST';

      const submitData = {
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.current ? undefined : formData.endDate ? new Date(formData.endDate) : undefined,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        router.push('/admin/experience');
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Failed to save experience' }));
        alert(errorData.error || 'Failed to save experience');
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const addDescription = () => {
    if (descInput.trim()) {
      setFormData({
        ...formData,
        description: [...formData.description, descInput.trim()],
      });
      setDescInput('');
    }
  };

  const removeDescription = (index: number) => {
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading experience entry...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-3xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <Link
            href="/admin/experience"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to experience</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            {isEdit ? `Edit: ${formData.role || 'Experience'}` : 'New Experience Entry'}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Record company, title, start/end dates, location, and key deliverables.
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
          <span>{saving ? 'Saving...' : 'Save Experience'}</span>
        </button>
      </div>

      <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. NextGen Robotics"
              className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Job Title / Role *
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Senior Full-Stack Engineer"
              className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Start Date *
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              End Date
            </label>
            <input
              type="date"
              disabled={formData.current}
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none font-mono disabled:opacity-40"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
          <input
            type="checkbox"
            checked={formData.current}
            onChange={(e) =>
              setFormData({
                ...formData,
                current: e.target.checked,
                endDate: e.target.checked ? '' : formData.endDate,
              })
            }
            className="rounded-none"
          />
          <span>Current active role (Present)</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Chandigarh, India / Remote"
              className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Display Order (1 = Top / Most Recent)
            </label>
            <input
              type="number"
              min={1}
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 1 })}
              className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            Bullet Points / Deliverables
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={descInput}
              onChange={(e) => setDescInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addDescription();
                }
              }}
              placeholder="Add key achievement or responsibility..."
              className="flex-1 px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs rounded-none outline-none"
            />
            <button
              type="button"
              onClick={addDescription}
              className="px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] rounded-none text-xs"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {formData.description.map((desc, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-3 px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-none text-xs"
              >
                <span className="flex-1 text-[var(--color-text)] leading-relaxed">{desc}</span>
                <button
                  type="button"
                  onClick={() => removeDescription(i)}
                  className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
