'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ISkill } from '@/lib/models/Skill';
import Link from 'next/link';

export default function SkillsPage() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setSkills(data);
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
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </Link>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Proficiency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Order</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {skills.map((skill) => (
              <tr key={skill._id?.toString()} className="hover:bg-slate-700/50">
                <td className="px-6 py-4 text-white">{skill.name}</td>
                <td className="px-6 py-4 text-slate-300 capitalize">{skill.category}</td>
                <td className="px-6 py-4 text-slate-300">{skill.proficiency}%</td>
                <td className="px-6 py-4 text-slate-300">{skill.order}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/skills/${skill._id}`}
                      className="p-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(skill._id!.toString())}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No skills yet. Create your first skill!
        </div>
      )}
    </div>
  );
}

