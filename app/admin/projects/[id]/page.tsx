'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function ProjectFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [] as string[],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    isCurrentlyWorking: false,
    order: 0,
    content: '',
  });
  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      setFormData({
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
        technologies: data.technologies || [],
        liveUrl: data.liveUrl || '',
        githubUrl: data.githubUrl || '',
        featured: data.featured || false,
        isCurrentlyWorking: data.isCurrentlyWorking || false,
        order: data.order || 0,
        content: data.content || '',
      });
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/projects/${id}` : '/api/projects';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Failed to save project' }));
        if (res.status === 401) {
          alert('Unauthorized. Please log in again.');
          router.push('/login');
        } else {
          alert(errorData.error || 'Failed to save project');
        }
        return;
      }

      router.push('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('An error occurred while saving the project. Please try again.');
    } finally {
      setLoading(false);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only image files are allowed (JPEG, PNG, WebP, GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setImageFile(file);
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;

    setUploadingImage(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', imageFile);
      uploadFormData.append('type', 'project');

      const uploadRes = await fetch('/api/images/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadRes.ok) {
        const error = await uploadRes.json();
        alert(error.error || 'Failed to upload image');
        return;
      }

      const uploadData = await uploadRes.json();
      setFormData({ ...formData, image: uploadData.url });
      setImageFile(null);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!formData.image) return;

    const isStoredFile = formData.image.startsWith('/storage/') || 
                         formData.image.includes('blob.vercel-storage.com');

    if (isStoredFile) {
      if (!confirm('Are you sure you want to delete this image? This will also remove it from the server.')) {
        return;
      }

      try {
        const deleteRes = await fetch(`/api/images/delete?url=${encodeURIComponent(formData.image)}`, {
          method: 'DELETE',
        });

        if (!deleteRes.ok) {
          const error = await deleteRes.json();
          alert(error.error || 'Failed to delete image');
          return;
        }

        setFormData({ ...formData, image: '' });
        alert('Image deleted successfully!');
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image');
      }
    } else {
      // For external URLs, just clear the field
      setFormData({ ...formData, image: '' });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/projects"
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-white">
          {isEdit ? 'Edit Project' : 'New Project'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={5}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Project Image</label>
          <div className="space-y-3">
            {/* File Upload */}
            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  {imageFile ? imageFile.name : 'Choose Image File'}
                </div>
              </label>
              {imageFile && (
                <button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={uploadingImage}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {uploadingImage ? 'Uploading...' : 'Upload'}
                </button>
              )}
            </div>
            <p className="text-sm text-slate-400">
              Upload an image (JPEG, PNG, WebP, GIF - max 5MB) or enter an external URL below.
            </p>

            {/* Current Image Display */}
            {formData.image && (
              <div className="p-4 bg-slate-700 border border-slate-600 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white text-sm font-medium">Image Set</p>
                      <p className="text-slate-400 text-xs truncate max-w-md">
                        {formData.image.startsWith('/storage/') || formData.image.includes('blob.vercel-storage.com')
                          ? 'Stored File'
                          : formData.image}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-lg transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-slate-600">
                  <img
                    src={formData.image}
                    alt="Project preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* External URL Option */}
            {(!formData.image || (!formData.image.startsWith('/storage/') && !formData.image.includes('blob.vercel-storage.com'))) && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Or Enter External Image URL
                </label>
                <input
                  type="url"
                  value={formData.image && !formData.image.startsWith('/storage/') && !formData.image.includes('blob.vercel-storage.com') ? formData.image : ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Technologies</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              placeholder="Add technology"
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-slate-700 rounded-lg text-white text-sm flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Documentation (Markdown)
          </label>
          <p className="text-sm text-slate-400 mb-3">
            Write comprehensive documentation for this project in Markdown format. This will be displayed on the project details page.
          </p>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={20}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm"
            placeholder="# Project Overview&#10;&#10;Write your project documentation here using Markdown...&#10;&#10;## Features&#10;&#10;- Feature 1&#10;- Feature 2&#10;&#10;## Technologies Used&#10;&#10;...&#10;"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Live URL</label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-purple-600 focus:ring-purple-500"
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-slate-300">
            <input
              type="checkbox"
              checked={formData.isCurrentlyWorking}
              onChange={(e) => setFormData({ ...formData, isCurrentlyWorking: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-purple-600 focus:ring-purple-500"
            />
            Currently Working
          </label>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              className="w-24 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </form>
    </div>
  );
}

