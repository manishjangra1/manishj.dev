import React from 'react';
import { Plate } from '@/components/content/Plate';
import { cn } from '@/lib/utils';

export interface CaseStudySectionData {
  heading: string;
  paragraphs: string[];
  figure?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface CaseStudyBodyProps {
  sections: CaseStudySectionData[];
  heroImageSrc?: string;
  className?: string;
}

export function CaseStudyBody({
  sections,
  heroImageSrc,
  className,
}: CaseStudyBodyProps) {
  return (
    <div className={cn('flex flex-col gap-12 sm:gap-16', className)}>
      {sections.map((section, idx) => {
        // Check if section contains numbered highlights (e.g. "1. Title: Description")
        const isHighlightSection = section.paragraphs.some((p) => /^\d+[\.\)]\s/.test(p));
        const sectionId = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const hasDistinctFigure =
          section.figure?.src &&
          section.figure.src !== heroImageSrc &&
          !section.figure.src.includes(heroImageSrc?.split('?')[0] || '___');

        return (
          <div key={idx} id={sectionId} className="flex flex-col scroll-mt-24">
            {/* Section Heading with Border Divider */}
            <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-[var(--color-border)] mb-6">
              <h2 className="text-[22px] sm:text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--color-text)]">
                {section.heading}
              </h2>
              <span className="font-mono text-[11px] text-[var(--color-text-muted)] tracking-wider">
                0{idx + 1}
              </span>
            </div>

            {/* Content: Highlight Cards or Clean Paragraphs */}
            {isHighlightSection ? (
              <div className="grid grid-cols-1 gap-4">
                {section.paragraphs.map((p, pIdx) => {
                  const match = p.match(/^(\d+)[\.\)]\s*(.*?)(?::|\s*-\s*)(.*)$/);
                  if (match) {
                    const [, num, itemTitle, itemDesc] = match;
                    return (
                      <div
                        key={pIdx}
                        className={cn(
                          'bg-[var(--color-card)] border border-[var(--color-border)] p-5 sm:p-6 rounded-none',
                          'hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)]',
                          'transition-all duration-150 flex items-start gap-4'
                        )}
                      >
                        <span className="font-mono text-[12px] font-bold px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] shrink-0 rounded-none">
                          {num.padStart(2, '0')}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[15px] sm:text-[16px] text-[var(--color-text)] mb-1">
                            {itemTitle}
                          </h3>
                          <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                            {itemDesc}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={pIdx}
                      className="bg-[var(--color-card)] border border-[var(--color-border)] p-5 sm:p-6 rounded-none"
                    >
                      <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
                        {p}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[16px] sm:text-[17px] leading-[1.75] text-[var(--color-text-secondary)] text-pretty"
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Architecture Figure / Diagram (Only if distinct and present) */}
            {hasDistinctFigure && section.figure && (
              <div className="mt-8 border border-[var(--color-border)] bg-[var(--color-card)] p-3 sm:p-4 rounded-none">
                <Plate
                  aspect="16:9"
                  src={section.figure.src}
                  alt={section.figure.alt}
                  grayscaleHover={false}
                  radius="none"
                />
                {section.figure.caption && (
                  <p className="mt-3 font-mono text-[12px] text-[var(--color-text-muted)] text-center">
                    {section.figure.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CaseStudyBody;

