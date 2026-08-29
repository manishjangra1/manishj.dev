import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { ProjectCard } from '@/components/content/ProjectCard';
import { getPublicWorkList } from '@/lib/content/getPublicWorkData';
import { Kicker } from '@/components/primitives/Kicker';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'All Projects & Work — Manish Jangra',
  description: 'Explore full-stack products, applications, distributed APIs, and mobile systems designed and shipped by Manish Jangra.',
  alternates: {
    canonical: 'https://manishj.dev/work',
  },
  openGraph: {
    title: 'All Projects & Work — Manish Jangra',
    description: 'Explore full-stack products, applications, distributed APIs, and mobile systems designed and shipped by Manish Jangra.',
    url: 'https://manishj.dev/work',
    type: 'website',
  },
};

export default async function WorkListingPage() {
  const projects = await getPublicWorkList();

  return (
    <div className="py-10 sm:py-14 md:py-18">
      <Container well="wide">
        {/* Header Banner */}
        <div className="border-b border-[var(--color-border)] pb-8 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Kicker>ALL PROJECTS // ARCHIVE</Kicker>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text)]">
              Products I&apos;ve designed and shipped.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl">
              A comprehensive archive of production web applications, mobile platforms, and backend architectures.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1.5 border border-[var(--color-border)]">
              {projects.length} project{projects.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* 3-Column Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="h-full">
              <ProjectCard {...project} className="h-full" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
