import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyLayout } from '@/components/sections/CaseStudyLayout';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/content/getProjectBySlug';
import { buildCaseStudyJsonLd } from '@/lib/seo';

export const revalidate = 60;

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Not Found',
      robots: { index: false, follow: false },
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://manishj.dev';
  const canonicalUrl = `${siteUrl}/work/${project.slug}`;

  return {
    title: `${project.title} — Manish Jangra`,
    description: project.lede,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.title} — Manish Jangra`,
      description: project.lede,
      url: canonicalUrl,
      type: 'article',
      images: project.image?.src
        ? [
            {
              url: project.image.src,
              alt: project.image.alt || project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Manish Jangra`,
      description: project.lede,
      images: project.image?.src ? [project.image.src] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://manishj.dev';
  const jsonLd = buildCaseStudyJsonLd(
    {
      title: project.title,
      lede: project.lede,
      slug: project.slug,
      image: project.image?.src,
    },
    siteUrl
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyLayout
        recap={{
          kicker: project.kicker,
          title: project.title,
          lede: project.lede,
          meta: project.meta,
          liveUrl: project.liveUrl,
          repoUrl: project.repoUrl,
        }}
        image={project.image}
        sections={project.sections}
        pager={project.pager}
      />
    </>
  );
}
