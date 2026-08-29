'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Trash2, Plus, Eye, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface SectionItem {
  id: string;
  title: string;
  content: string;
}

const DEFAULT_TEMPLATE_SECTIONS: SectionItem[] = [
  {
    id: 'sec-1',
    title: 'Problem',
    content: 'On-demand home services frequently suffer from poor coordination between customers and service providers. Customers face unpredictable arrival times and opaque pricing, while technicians struggle with manual job matching and delayed disbursements.\n\nThe goal of Servyq was to engineer a unified two-sided marketplace that handles real-time job dispatch, technician location streaming, in-app messaging, and automated milestone payouts.',
  },
  {
    id: 'sec-2',
    title: 'Role and Constraints',
    content: 'I led the end-to-end architecture and implementation: designing the React Native mobile application for both client and provider roles, implementing the NestJS microservices backend, and modeling the PostgreSQL database schemas.\n\nKey constraints included supporting low-bandwidth network environments in emerging markets, enforcing strict transactional integrity on escrow payments, and maintaining sub-second latency on realtime dispatch events.',
  },
  {
    id: 'sec-3',
    title: 'Approach & Architecture',
    content: 'The backend is built around an event-driven NestJS architecture with Redis Pub/Sub managing live WebSocket connections for real-time technician tracking and status transitions.\n\nDatabase transactions are orchestrated through PostgreSQL with strict isolation levels for wallet operations, preventing race conditions during concurrent bookings and dispute resolutions.',
  },
  {
    id: 'sec-4',
    title: 'Highlights',
    content: '1. Dual-Role Mobile Client: Single codebase powering customer booking flows and provider job management with dynamic role switching.\n2. Real-Time Dispatch Engine: Geo-spatial proximity matching algorithms assigning jobs to the closest available technicians within 300ms.\n3. Automated Escrow Settlement: Multi-stage ledger verification guaranteeing secure milestone releases upon customer approval.',
  },
  {
    id: 'sec-5',
    title: 'Outcome & Status',
    content: 'Servyq was successfully shipped and deployed to production. The platform maintains sub-second dispatch latency and has processed thousands of live service bookings with zero ledger mismatch incidents.',
  },
];

export default function ProjectFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    kicker: '',
    year: '',
    role: '',
    description: '',
    image: '',
    technologies: [] as string[],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    published: true,
    order: 0,
    sections: DEFAULT_TEMPLATE_SECTIONS,
  });

  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      if (data) {
        // Construct sections: prefer dynamic sections, fallback to legacy fields
        let initialSections: SectionItem[] = [];

        if (Array.isArray(data.caseStudy?.sections) && data.caseStudy.sections.length > 0) {
          initialSections = data.caseStudy.sections.map((s: { title?: string; content?: string | string[] }, idx: number) => ({
            id: `sec-${idx}-${Date.now()}`,
            title: s.title || `Section ${idx + 1}`,
            content: typeof s.content === 'string' ? s.content : Array.isArray(s.content) ? s.content.join('\n\n') : '',
          }));
        } else {
          // Check legacy fields
          const legacyItems: { title: string; content: string }[] = [];
          if (data.caseStudy?.problem?.length) {
            legacyItems.push({
              title: 'Problem',
              content: Array.isArray(data.caseStudy.problem) ? data.caseStudy.problem.join('\n\n') : String(data.caseStudy.problem),
            });
          }
          if (data.caseStudy?.role?.length) {
            legacyItems.push({
              title: 'Role and Constraints',
              content: Array.isArray(data.caseStudy.role) ? data.caseStudy.role.join('\n\n') : String(data.caseStudy.role),
            });
          }
          if (data.caseStudy?.approach?.length) {
            legacyItems.push({
              title: 'Approach & Architecture',
              content: Array.isArray(data.caseStudy.approach) ? data.caseStudy.approach.join('\n\n') : String(data.caseStudy.approach),
            });
          }
          if (data.caseStudy?.highlights?.length) {
            legacyItems.push({
              title: 'Highlights',
              content: Array.isArray(data.caseStudy.highlights) ? data.caseStudy.highlights.join('\n') : String(data.caseStudy.highlights),
            });
          }
          if (data.caseStudy?.outcome?.length) {
            legacyItems.push({
              title: 'Outcome & Status',
              content: Array.isArray(data.caseStudy.outcome) ? data.caseStudy.outcome.join('\n\n') : String(data.caseStudy.outcome),
            });
          }

          if (legacyItems.length > 0) {
            initialSections = legacyItems.map((item, idx) => ({
              id: `sec-${idx}-${Date.now()}`,
              title: item.title,
              content: item.content,
            }));
          } else {
            initialSections = DEFAULT_TEMPLATE_SECTIONS;
          }
        }

        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          kicker: data.kicker || '',
          year: data.year || '',
          role: data.role || '',
          description: data.description || '',
          image: data.image || '',
          technologies: data.technologies || [],
          liveUrl: data.liveUrl || '',
          githubUrl: data.githubUrl || '',
          featured: data.featured || false,
          published: data.published !== false,
          order: data.order || 0,
          sections: initialSections,
        });
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (val: string) => {
    if (!isEdit && !formData.slug) {
      setFormData({
        ...formData,
        title: val,
        slug: generateSlug(val),
      });
    } else {
      setFormData({ ...formData, title: val });
    }
  };

  const addSection = () => {
    const newSection: SectionItem = {
      id: `sec-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: 'New Section',
      content: '',
    };
    setFormData({
      ...formData,
      sections: [...formData.sections, newSection],
    });
  };

  const removeSection = (index: number) => {
    if (formData.sections.length <= 1) {
      alert('A case study must have at least one section.');
      return;
    }
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, i) => i !== index),
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.sections.length) return;

    const updated = [...formData.sections];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    setFormData({
      ...formData,
      sections: updated,
    });
  };

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    const updated = [...formData.sections];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({
      ...formData,
      sections: updated,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/projects/${id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const formattedSections = formData.sections.map((s) => ({
        title: s.title.trim(),
        content: s.content.trim(),
      }));

      // Legacy fallback mappings for backwards compatibility
      const problemSec = formData.sections.find((s) => s.title.toLowerCase().includes('problem'));
      const roleSec = formData.sections.find((s) => s.title.toLowerCase().includes('role'));
      const approachSec = formData.sections.find((s) => s.title.toLowerCase().includes('approach'));
      const highlightsSec = formData.sections.find((s) => s.title.toLowerCase().includes('highlight'));
      const outcomeSec = formData.sections.find((s) => s.title.toLowerCase().includes('outcome'));

      const payload = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        caseStudy: {
          sections: formattedSections,
          problem: problemSec ? problemSec.content.split('\n\n').map((s) => s.trim()).filter(Boolean) : [],
          role: roleSec ? roleSec.content.split('\n\n').map((s) => s.trim()).filter(Boolean) : [],
          approach: approachSec ? approachSec.content.split('\n\n').map((s) => s.trim()).filter(Boolean) : [],
          highlights: highlightsSec ? highlightsSec.content.split('\n').map((s) => s.trim()).filter(Boolean) : [],
          outcome: outcomeSec ? outcomeSec.content.split('\n\n').map((s) => s.trim()).filter(Boolean) : [],
        },
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Failed to save project' }));
        alert(errorData.error || 'Failed to save project');
        return;
      }

      router.push('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('An error occurred while saving the project.');
    } finally {
      setSaving(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;
    setUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
      const res = await fetch('/api/images/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData({ ...formData, image: data.url });
        setImageFile(null);
        alert('Image uploaded successfully!');
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image file.');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading project configuration...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to projects</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            {isEdit ? `Edit: ${formData.title || 'Project'}` : 'New Project'}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Define project metadata, hero screenshot, stack tags, and rich custom case study sections.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEdit && formData.slug && (
            <a
              href={`/work/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-xs font-mono text-[var(--color-text)]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </a>
          )}
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
            <span>{saving ? 'Saving...' : 'Save Project'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Main Content & Custom Case Study Sections */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Card: Core Overview */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-5">
            <h2 className="text-base font-bold text-[var(--color-text)] pb-3 border-b border-[var(--color-border)]">
              Core Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Servyq"
                  className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. servyq"
                  className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  Category / Kicker
                </label>
                <input
                  type="text"
                  value={formData.kicker}
                  onChange={(e) => setFormData({ ...formData, kicker: e.target.value })}
                  placeholder="e.g. On-demand services"
                  className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  Year
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2025"
                  className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Lead Full-Stack Architect"
                  className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Short Description / Lede *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="High-level value proposition and system summary..."
                className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none resize-y"
              />
            </div>
          </div>

          {/* Card: Dynamic Case Study Sections */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]">
              <div>
                <h2 className="text-base font-bold text-[var(--color-text)]">
                  Case Study Content Sections
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Manage standard or custom sections. Supports paragraphs and numbered highlights.
                </p>
              </div>

              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] rounded-none transition-all self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Section</span>
              </button>
            </div>

            {/* Sections List */}
            <div className="flex flex-col gap-5">
              {formData.sections.map((section, idx) => (
                <div
                  key={section.id}
                  className="p-4 sm:p-5 bg-[var(--color-surface)]/50 border border-[var(--color-border)] rounded-none flex flex-col gap-3 group"
                >
                  <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-mono text-xs font-bold text-[var(--color-text-muted)] shrink-0">
                        0{idx + 1} //
                      </span>
                      <input
                        type="text"
                        required
                        value={section.title}
                        onChange={(e) => updateSection(idx, 'title', e.target.value)}
                        placeholder="Section Heading (e.g. Architecture)"
                        className="w-full font-mono text-xs font-bold uppercase tracking-wider bg-transparent border-b border-transparent focus:border-[var(--color-text)] text-[var(--color-text)] outline-none py-0.5"
                      />
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Reordering */}
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveSection(idx, 'up')}
                        className="p-1 hover:bg-[var(--color-surface-hover)] disabled:opacity-20 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                        title="Move Section Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === formData.sections.length - 1}
                        onClick={() => moveSection(idx, 'down')}
                        className="p-1 hover:bg-[var(--color-surface-hover)] disabled:opacity-20 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                        title="Move Section Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(idx)}
                        className="p-1 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 ml-1 transition-colors"
                        title="Delete Section"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono text-[var(--color-text-muted)] mb-1.5">
                      Separate paragraphs with double newlines. Format highlight cards as: <code className="text-[var(--color-text)]">1. Title: Description</code>
                    </p>
                    <textarea
                      rows={5}
                      required
                      value={section.content}
                      onChange={(e) => updateSection(idx, 'content', e.target.value)}
                      placeholder="Enter detailed technical narrative, benchmarks, constraints, or highlight bullet points..."
                      className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs rounded-none outline-none resize-y font-mono leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Media, Stack & Settings */}
        <div className="flex flex-col gap-6">
          {/* Card: Media & Image */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none flex flex-col gap-4">
            <h2 className="text-base font-bold text-[var(--color-text)] pb-3 border-b border-[var(--color-border)]">
              Showcase Screenshot *
            </h2>

            {formData.image && (
              <div className="aspect-[16/9] w-full bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden rounded-none">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                Image URL
              </label>
              <input
                type="text"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs rounded-none outline-none font-mono"
              />
            </div>

            <div className="pt-2 border-t border-[var(--color-border)]">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Or Upload Image File
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="text-xs font-mono file:mr-2 file:py-1 file:px-2.5 file:rounded-none file:border file:border-[var(--color-border-strong)] file:bg-[var(--color-surface)] file:text-xs"
                />
                {imageFile && (
                  <button
                    type="button"
                    onClick={handleUploadImage}
                    disabled={uploadingImage}
                    className="w-full py-1.5 bg-[var(--color-surface)] border border-[var(--color-border-strong)] text-xs font-mono rounded-none hover:bg-[var(--color-surface-hover)]"
                  >
                    {uploadingImage ? 'Uploading...' : 'Confirm Upload'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Card: Tech Stack */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none flex flex-col gap-4">
            <h2 className="text-base font-bold text-[var(--color-text)] pb-3 border-b border-[var(--color-border)]">
              Technologies & Tags
            </h2>

            <div className="flex flex-wrap gap-1.5 min-h-[60px]">
              {formData.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs rounded-none"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
                placeholder="Add tech (e.g. Next.js)..."
                className="flex-1 px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs rounded-none outline-none font-mono"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] rounded-none text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card: Links & Visibility */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none flex flex-col gap-4">
            <h2 className="text-base font-bold text-[var(--color-text)] pb-3 border-b border-[var(--color-border)]">
              Visibility & Links
            </h2>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                Live Deployment URL
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://servyq.com"
                className="w-full px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs rounded-none outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/manishjangra1/servyq"
                className="w-full px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs rounded-none outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs rounded-none outline-none font-mono"
              />
            </div>

            <div className="pt-3 border-t border-[var(--color-border)] flex flex-col gap-2.5">
              <label className="flex items-center gap-2.5 text-xs text-[var(--color-text)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded-none accent-[var(--color-text)]"
                />
                <span>Featured on homepage carousel</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-[var(--color-text)] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="rounded-none accent-[var(--color-text)]"
                />
                <span>Published (visible publicly)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
