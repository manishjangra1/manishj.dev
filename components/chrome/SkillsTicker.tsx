'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SkillsTickerProps {
  skills?: string[];
  className?: string;
}

const DEFAULT_SKILLS = [
  'React Native',
  'Next.js',
  'TypeScript',
  'Node.js',
  'NestJS',
  'PostgreSQL',
  'Prisma',
  'Redis',
  'Docker',
  'GraphQL',
  'Tailwind CSS',
  'MongoDB',
  'Express',
  'AWS',
  'Socket.io',
  'Expo',
  'System Design',
  'REST APIs',
  'Git',
];

export function SkillsTicker({
  skills = DEFAULT_SKILLS,
  className,
}: SkillsTickerProps) {
  if (!skills || skills.length === 0) return null;

  // Duplicate items to ensure seamless infinite looping
  const tickerItems = [...skills, ...skills];

  return (
    <div
      role="region"
      aria-label="Core Engineering Skills"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 h-[38px] sm:h-[42px] bg-[var(--color-bg)]/85 backdrop-blur-md border-t border-[var(--color-border)] flex items-center overflow-hidden pointer-events-auto select-none',
        className
      )}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      }}
    >
      <div className="animate-ticker flex items-center gap-6 sm:gap-8 whitespace-nowrap">
        {tickerItems.map((skill, idx) => (
          <div
            key={`${skill}-${idx}`}
            className="flex items-center gap-3 font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            <span className="w-1 h-1 bg-[var(--color-text-muted)] opacity-60 shrink-0" />
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsTicker;
