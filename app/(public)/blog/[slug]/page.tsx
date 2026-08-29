import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/content/getPublicBlogData';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found — Manish Jangra',
      robots: { index: false, follow: false },
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://manishj.dev';
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} — Manish Jangra`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} — Manish Jangra`,
      description: post.excerpt,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — Manish Jangra`,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <article className="py-12 sm:py-16 md:py-20">
      <Container well="prose">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>All Articles</span>
          </Link>
        </div>

        {/* Article Header Card */}
        <div className="border-b border-[var(--color-border)] pb-8 mb-10 sm:mb-12">
          <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider uppercase">
            {post.tags?.[0] ? `ARTICLE // ${post.tags[0].toUpperCase()}` : 'ARTICLE // ENGINEERING'}
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text)] leading-tight">
            {post.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--color-text-muted)] mt-6 pt-4 border-t border-[var(--color-border)]">
            {formattedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{post.tags.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cover Image if available */}
        {post.coverImage && (
          <div className="aspect-[16/9] w-full bg-[var(--color-card)] border border-[var(--color-border)] overflow-hidden rounded-none mb-10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Markdown Prose Content */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-10 md:p-12 rounded-none mb-12">
          <div className="prose prose-invert max-w-none text-[var(--color-text)] leading-relaxed space-y-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)] mt-8 mb-4 border-b border-[var(--color-border)] pb-3">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] mt-8 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold text-[var(--color-text)] mt-6 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[var(--color-text-secondary)] mb-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 space-y-2 text-sm sm:text-base text-[var(--color-text-secondary)] mb-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[var(--color-text)] bg-[var(--color-surface)]/60 p-4 font-mono text-xs sm:text-sm text-[var(--color-text)] rounded-none my-4">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="px-1.5 py-0.5 font-mono text-xs bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] rounded-none">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <div className="bg-[var(--color-bg)] border border-[var(--color-border)] p-4 sm:p-5 rounded-none overflow-x-auto my-5">
                      <pre className="font-mono text-xs text-[var(--color-text)] leading-relaxed">
                        <code>{children}</code>
                      </pre>
                    </div>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Pager / Next & Prev Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {post.prevPost ? (
            <Link
              href={`/blog/${post.prevPost.slug}`}
              className="p-5 sm:p-6 bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all rounded-none flex flex-col justify-between group"
            >
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Previous Article</span>
              </div>
              <span className="font-bold text-sm text-[var(--color-text)] line-clamp-2">
                {post.prevPost.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {post.nextPost ? (
            <Link
              href={`/blog/${post.nextPost.slug}`}
              className="p-5 sm:p-6 bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all rounded-none flex flex-col justify-between items-end text-right group"
            >
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                <span>Next Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <span className="font-bold text-sm text-[var(--color-text)] line-clamp-2">
                {post.nextPost.title}
              </span>
            </Link>
          ) : null}
        </div>
      </Container>
    </article>
  );
}
