'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Github, Sparkles } from 'lucide-react';
import { IProject } from '@/lib/models/Project';
import Link from 'next/link';

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
      setProjects(data);
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
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id?.toString()}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700 relative"
          >
            {project.isCurrentlyWorking && (
              <div className="absolute top-3 right-3 px-2 py-1 bg-purple-600 rounded-full flex items-center gap-1.5 text-xs font-semibold text-white">
                <Sparkles className="w-3 h-3" />
                Working On
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              {project.isCurrentlyWorking && (
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              )}
            </div>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-slate-700 rounded text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${project._id}`}
                className="flex-1 px-3 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(project._id!.toString())}
                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No projects yet. Create your first project!
        </div>
      )}
    </div>
  );
}

