import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { getPublicBlogList } from '@/lib/content/getPublicBlogData';
import { ArrowUpRight, Calendar, Clock, Tag } from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Writing & Engineering Notes — Manish Jangra',
  description: 'Articles, systems thinking, and technical notes on full-stack engineering, mobile clients, and distributed APIs.',
  alternates: {
    canonical: 'https://manishj.dev/blog',
  },
  openGraph: {
    title: 'Writing & Engineering Notes — Manish Jangra',
    description: 'Articles, systems thinking, and technical notes on full-stack engineering, mobile clients, and distributed APIs.',
    url: 'https://manishj.dev/blog',
    type: 'website',
  },
};

export default async function BlogListPage() {
  const posts = await getPublicBlogList();

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <Container well="wide">
        {/* Header Banner */}
        <div className="border-b border-[var(--color-border)] pb-8 mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider uppercase">
              WRITING // NOTES
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)]">
              Thoughts, systems, and architecture.
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl">
              Technical deep-dives, architectural decisions, and reflections on building reliable full-stack applications.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              {posts.length} published article{posts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => {
            const formattedDate = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : null;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between p-6 sm:p-7 bg-[var(--color-card)] border border-[var(--color-border)] rounded-none hover:border-[var(--color-border-strong)] transition-all duration-150 relative"
              >
                <div>
                  {/* Top Meta Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
                    <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                      0{idx + 1} //
                    </span>
                    <div className="flex items-center gap-2">
                      {post.featured && (
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--color-text)] text-[var(--color-bg)] rounded-none">
                          Featured
                        </span>
                      )}
                      <span className="font-mono text-[11px] text-[var(--color-text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-text)] transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Bottom Footer */}
                <div className="mt-8 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[11px] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] rounded-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs font-semibold text-[var(--color-text)] group-hover:translate-x-0.5 transition-transform">
                    <span>Read</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
