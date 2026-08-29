'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Save, ArrowLeft, Upload, Trash2, Plus, Eye, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { cn, slugify } from '@/lib/utils';

export default function BlogFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    coverImage: '',
    published: true,
    featured: false,
    tags: [] as string[],
  });

  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEdit) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${id}`);
      const data = await res.json();
      if (data) {
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          content: data.content || '',
          excerpt: data.excerpt || '',
          coverImage: data.coverImage || '',
          published: data.published !== false,
          featured: data.featured || false,
          tags: data.tags || [],
        });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (val: string) => {
    if (!isEdit && !formData.slug) {
      setFormData({
        ...formData,
        title: val,
        slug: slugify(val),
      });
    } else {
      setFormData({ ...formData, title: val });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/blog/${id}` : '/api/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        slug: formData.slug || slugify(formData.title),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Failed to save post' }));
        alert(errorData.error || 'Failed to save post');
        return;
      }

      router.push('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;
    setUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
      uploadData.append('type', 'blog');

      const res = await fetch('/api/images/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData({ ...formData, coverImage: data.url });
        setImageFile(null);
        alert('Cover image uploaded successfully!');
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading post...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to blog posts</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            {isEdit ? `Edit: ${formData.title || 'Post'}` : 'New Blog Article'}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Write markdown content, add tags, upload cover images, and publish to the live site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEdit && formData.slug && formData.published && (
            <Link
              href={`/blog/${formData.slug}`}
              target="_blank"
              className="p-2 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none text-xs font-mono"
              title="View live article"
            >
              <Eye className="w-4 h-4" />
            </Link>
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
            <span>{saving ? 'Saving...' : 'Save Post'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Title, Excerpt & Markdown Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-5">
            <h2 className="text-base font-bold text-[var(--color-text)] pb-3 border-b border-[var(--color-border)]">
              Article Content
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Architecting Real-Time Microservices"
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
                  placeholder="architecting-real-time-microservices"
                  className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Excerpt / Short Summary *
              </label>
              <textarea
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="A deep dive into distributed event streaming and database isolation patterns."
                className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Markdown Body Content *
              </label>
              <textarea
                rows={16}
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="# Introduction&#10;&#10;Write your article in GitHub-flavored markdown..."
                className="w-full px-3.5 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono rounded-none outline-none resize-y leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Cover Image, Tags & Publish Options */}
        <div className="flex flex-col gap-6">
          {/* Card: Cover Image */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none flex flex-col gap-4">
            <h2 className="text-base font-bold text-[var(--color-text)] pb-3 border-b border-[var(--color-border)]">
              Cover Image
            </h2>

            {formData.coverImage && (
              <div className="aspect-[16/9] w-full bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden rounded-none">
                <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono rounded-none outline-none"
              />
            </div>

            <div className="pt-2 border-t border-[var(--color-border)]">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Or Upload Cover File
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

          {/* Card: Tags */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none flex flex-col gap-4">
            <h2 className="text-base font-bold text-[var(--color-text)] pb-3 border-b border-[var(--color-border)]">
              Article Tags
            </h2>

            <div className="flex flex-wrap gap-1.5 min-h-[50px]">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] rounded-none"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-[var(--color-text-muted)] hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border)]">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag (e.g. Architecture)..."
                className="flex-1 px-3 py-1.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono rounded-none outline-none"
              />
              <button
                type="button"
                onClick={addTag}
                className="p-1.5 bg-[var(--color-surface)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] rounded-none"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card: Publishing Options */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none flex flex-col gap-3">
            <h2 className="text-base font-bold text-[var(--color-text)] pb-3 border-b border-[var(--color-border)]">
              Publishing Status
            </h2>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded-none"
              />
              <span>Published (visible on live /blog)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded-none"
              />
              <span>Featured article</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
