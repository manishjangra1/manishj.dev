'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, Calendar, Tag, ExternalLink } from 'lucide-react';
import { IBlogPost } from '@/lib/models/BlogPost';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function BlogPage() {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      } else {
        alert('Failed to delete post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading blog posts...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Blog Posts & Engineering Notes
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Write articles, technical write-ups, and architectural patterns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none transition-colors"
          >
            <span>Live Blog Feed</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/admin/blog/new"
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-none',
              'bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-all duration-150'
            )}
          >
            <Plus className="w-4 h-4" />
            <span>Write Post</span>
          </Link>
        </div>
      </div>

      {/* Post List */}
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => {
          const id = post._id?.toString();
          return (
            <div
              key={id}
              className={cn(
                'bg-[var(--color-card)] border border-[var(--color-border)] p-5 sm:p-6 rounded-none',
                'hover:border-[var(--color-border-strong)] transition-all duration-150',
                'flex flex-col sm:flex-row sm:items-center justify-between gap-5 group'
              )}
            >
              <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] uppercase">
                    /blog/{post.slug}
                  </span>
                  {post.published ? (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-none">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/30 rounded-none">
                      Draft
                    </span>
                  )}
                  {post.featured && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--color-text)] text-[var(--color-bg)] rounded-none">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-text)] transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[var(--color-text-muted)] font-mono">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </span>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{post.tags.join(', ')}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--color-border)]">
                {post.published && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] rounded-none transition-colors"
                    title="View live article"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                )}
                <Link
                  href={`/admin/blog/${id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium border border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none transition-all"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(id!)}
                  className="p-2 text-red-500/80 hover:text-red-500 border border-red-500/30 hover:bg-red-500/10 rounded-none transition-colors"
                  title="Delete article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="p-12 text-center bg-[var(--color-card)] border border-dashed border-[var(--color-border)] rounded-none">
          <FileText className="w-8 h-8 mx-auto text-[var(--color-text-muted)] mb-3" />
          <h3 className="font-bold text-sm text-[var(--color-text)]">No blog posts yet</h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 mb-4">
            Publish your first engineering note or architecture post.
          </p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono font-semibold rounded-none uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write First Post</span>
          </Link>
        </div>
      )}
    </div>
  );
}
