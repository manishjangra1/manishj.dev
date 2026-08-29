'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Github, Sparkles, FolderKanban, ArrowUpDown, Eye } from 'lucide-react';
import { IProject } from '@/lib/models/Project';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProjects();
      } else {
        alert('Failed to delete project.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Projects & Case Studies
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Manage your showcase projects, technical case studies, and stack badges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-none text-xs font-semibold uppercase tracking-wider',
              'bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-all duration-150'
            )}
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </Link>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => {
          const id = project._id?.toString();
          return (
            <div
              key={id}
              className={cn(
                'bg-[var(--color-card)] border border-[var(--color-border)] p-5 sm:p-6 rounded-none',
                'hover:border-[var(--color-border-strong)] transition-all duration-150',
                'flex flex-col justify-between group'
              )}
            >
              <div>
                {/* Project Image Thumbnail */}
                {project.image && (
                  <div className="aspect-[16/9] w-full bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden mb-4 rounded-none relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      {project.featured && (
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--color-text)] text-[var(--color-bg)] rounded-none">
                          Featured
                        </span>
                      )}
                      {project.published === false && (
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-none">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Card Title & Kicker */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider">
                    {project.kicker || 'CASE STUDY'}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                    Order: {project.order || idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-text)] transition-colors">
                  {project.title}
                </h3>

                <p className="mt-2 text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies?.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.technologies?.length || 0) > 4 && (
                    <span className="px-1.5 py-0.5 text-[11px] font-mono text-[var(--color-text-muted)]">
                      +{(project.technologies?.length || 0) - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/work/${project.slug}`}
                    target="_blank"
                    className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] rounded-none transition-colors"
                    title="View public case study"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] rounded-none transition-colors"
                      title="Visit live deployment"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projects/${id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium border border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(id!)}
                    className="p-1.5 text-red-500/80 hover:text-red-500 border border-red-500/30 hover:bg-red-500/10 rounded-none transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className="p-12 text-center bg-[var(--color-card)] border border-dashed border-[var(--color-border)] rounded-none">
          <FolderKanban className="w-8 h-8 mx-auto text-[var(--color-text-muted)] mb-3" />
          <h3 className="font-bold text-sm text-[var(--color-text)]">No projects created yet</h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 mb-4">
            Add your first featured software project and case study.
          </p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono font-semibold rounded-none uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create First Project</span>
          </Link>
        </div>
      )}
    </div>
  );
}
