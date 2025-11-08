'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { IExperience } from '@/lib/models/Experience';
import Link from 'next/link';
import { format } from 'date-fns';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience');
      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchExperiences();
      }
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Experience</h1>
        <Link
          href="/admin/experience/new"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </Link>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp._id?.toString()}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                <p className="text-slate-300">{exp.company}</p>
                <p className="text-slate-400 text-sm mt-2">
                  {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                  {exp.current
                    ? 'Present'
                    : exp.endDate
                    ? format(new Date(exp.endDate), 'MMM yyyy')
                    : 'Present'}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/experience/${exp._id}`}
                  className="p-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(exp._id!.toString())}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No experience entries yet. Add your first experience!
        </div>
      )}
    </div>
  );
}

