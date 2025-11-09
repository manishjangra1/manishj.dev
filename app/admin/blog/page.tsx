'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { IBlogPost } from '@/lib/models/BlogPost';
import Link from 'next/link';
import { format } from 'date-fns';

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
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          New Post
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post._id?.toString()}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-white break-words">{post.title}</h3>
                  {post.published ? (
                    <span className="px-2 py-1 text-xs bg-green-600 text-white rounded whitespace-nowrap">Published</span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-slate-600 text-white rounded whitespace-nowrap">Draft</span>
                  )}
                </div>
                <p className="text-slate-400 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="break-all">Slug: {post.slug}</span>
                  {post.publishedAt && (
                    <span className="whitespace-nowrap">{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link
                  href={`/admin/blog/${post._id}`}
                  className="p-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(post._id!.toString())}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No blog posts yet. Create your first post!
        </div>
      )}
    </div>
  );
}

