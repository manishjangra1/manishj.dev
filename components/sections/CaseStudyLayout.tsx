import React from 'react';
import { Container } from '@/components/primitives/Container';
import { Plate } from '@/components/content/Plate';
import { CaseStudyRecap, type CaseStudyRecapProps } from '@/components/content/CaseStudyRecap';
import { CaseStudyBody, type CaseStudySectionData } from '@/components/content/CaseStudyBody';
import { CaseStudyPager, type CaseStudyPagerProps } from '@/components/content/CaseStudyPager';
import { cn } from '@/lib/utils';

export interface CaseStudyLayoutProps {
  recap: CaseStudyRecapProps;
  image?: {
    src: string;
    alt: string;
  };
  sections: CaseStudySectionData[];
  pager?: CaseStudyPagerProps;
  className?: string;
}

export function CaseStudyLayout({
  recap,
  image,
  sections,
  pager,
  className,
}: CaseStudyLayoutProps) {
  return (
    <article
      className={cn(
        'pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 flex flex-col',
        className
      )}
    >
      {/* 1. Header Recap */}
      <Container well="wide">
        <CaseStudyRecap {...recap} />
      </Container>

      {/* 2. Hero Image */}
      {image && (
        <div className="mt-8 sm:mt-10">
          <Container well="wide">
            <div className="border border-[var(--color-border)] bg-[var(--color-card)] p-2 sm:p-3 rounded-none">
              <Plate
                aspect="16:9"
                src={image.src}
                alt={image.alt}
                grayscaleHover={false}
                radius="none"
              />
            </div>
          </Container>
        </div>
      )}

      {/* 3. Body Sections with Sticky Sidebar on Wide Layout */}
      <div className="mt-12 sm:mt-16">
        <Container well="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Sticky Left Sidebar: Section Index & Quick Meta (Desktop) */}
            <div className="hidden lg:flex lg:col-span-4 flex-col gap-6 sticky top-24">
              {/* Section Outline Card */}
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none">
                <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider uppercase block pb-3 mb-4 border-b border-[var(--color-border)]">
                  Project Outline
                </span>
                <nav className="flex flex-col gap-2.5">
                  {sections.map((section, idx) => {
                    const sectionId = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                      <a
                        key={idx}
                        href={`#${sectionId}`}
                        className={cn(
                          'flex items-center justify-between text-[13px] text-[var(--color-text-secondary)]',
                          'hover:text-[var(--color-text)] transition-colors py-1'
                        )}
                      >
                        <span>{section.heading}</span>
                        <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                          0{idx + 1}
                        </span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Action Buttons in Sidebar */}
              {(recap.liveUrl || recap.repoUrl) && (
                <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 rounded-none flex flex-col gap-3">
                  <span className="font-mono text-[11px] font-semibold text-[var(--color-text-muted)] tracking-wider uppercase block pb-2 border-b border-[var(--color-border)]">
                    Links
                  </span>
                  {recap.liveUrl && (
                    <a
                      href={recap.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-3.5 py-2 text-[13px] font-medium text-[var(--color-text)] bg-[var(--color-surface)]/60 hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] rounded-none transition-all"
                    >
                      <span>Live Deployment</span>
                      <span>↗</span>
                    </a>
                  )}
                  {recap.repoUrl && (
                    <a
                      href={recap.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-3.5 py-2 text-[13px] font-medium text-[var(--color-text)] bg-[var(--color-surface)]/60 hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] rounded-none transition-all"
                    >
                      <span>GitHub Repository</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Main Deep-Dive Content (8 columns on Desktop, Full on Mobile) */}
            <div className="lg:col-span-8 w-full">
              <CaseStudyBody
                sections={sections}
                heroImageSrc={image?.src}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* 4. Navigation Pager */}
      {pager && (
        <div className="mt-8 sm:mt-10">
          <CaseStudyPager {...pager} />
        </div>
      )}
    </article>
  );
}

export default CaseStudyLayout;
