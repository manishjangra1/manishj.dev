import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/primitives/Container';
import { Kicker } from '@/components/primitives/Kicker';
import { Plate } from '@/components/content/Plate';
import { BlogPostContent } from '@/components/content/BlogPostContent';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/content/getPublicBlogData';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

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
    <article className="pt-6 sm:pt-10 md:pt-12 pb-16 sm:pb-20 w-full">
      <Container well="wide">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>All Articles</span>
          </Link>
        </div>

        {/* Article Header Banner */}
        <div className="border-b border-[var(--color-border)] pb-8 sm:pb-10 mb-8 sm:mb-12">
          <Kicker>
            {post.tags?.[0] ? `ARTICLE // ${post.tags[0].toUpperCase()}` : 'ARTICLE // ENGINEERING'}
          </Kicker>

          <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text)] leading-[1.15] text-balance">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-3xl text-pretty">
              {post.excerpt}
            </p>
          )}

          {/* Quick Meta Row */}
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

        {/* Optional Cover Image */}
        {post.coverImage && (
          <div className="mb-10 sm:mb-12 border border-[var(--color-border)] bg-[var(--color-card)] p-2 sm:p-3 rounded-none">
            <Plate
              aspect="16:9"
              src={post.coverImage}
              alt={post.title}
              grayscaleHover={false}
              radius="none"
            />
          </div>
        )}

        {/* Responsive Content Grid (Sticky Outline on Desktop, Full Width on Mobile) */}
        <BlogPostContent post={post} />
      </Container>
    </article>
  );
}
