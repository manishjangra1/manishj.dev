import React from 'react';
import { TextLink } from '@/components/primitives/TextLink';
import { CopyButton } from '@/components/content/CopyButton';
import { cn } from '@/lib/utils';

export interface ContactDetailsProps {
  email: string;
  location: string;
  linkedin: string;
  resumeHref: string;
  github: string;
  whatsapp?: string;
  className?: string;
}

export function ContactDetails({
  email,
  location,
  linkedin,
  resumeHref,
  github,
  whatsapp,
  className,
}: ContactDetailsProps) {
  return (
    <div className={cn('flex flex-col gap-[28px]', className)}>
      {/* Group 1: Email + Copy + Location */}
      <div className="flex flex-col gap-[6px]">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)] select-none">
          Direct
        </span>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${email}`}
            className="text-[17px] sm:text-[18px] font-medium text-[var(--color-text)] hover:underline underline-offset-[3px] decoration-[var(--color-border-strong)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--color-focus)] rounded-[var(--radius-none)]"
          >
            {email}
          </a>
          <CopyButton value={email} />
        </div>
        <p className="font-mono text-[13px] text-[var(--color-text-muted)]">
          {location}
        </p>
      </div>

      {/* Group 2: Secondary Channels */}
      <div className="flex flex-col gap-[8px]">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)] select-none">
          Profiles
        </span>
        <div className="flex flex-col gap-[10px]">
          <TextLink
            href={linkedin}
            label="LinkedIn"
            external={true}
            showExternalIcon={true}
            className="text-[15px]"
          />
          <TextLink
            href={resumeHref}
            label="Résumé (PDF)"
            className="text-[15px]"
          />
          <TextLink
            href={github}
            label="GitHub"
            external={true}
            showExternalIcon={true}
            className="text-[15px]"
          />
          {whatsapp && (
            <TextLink
              href={whatsapp}
              label="WhatsApp"
              external={true}
              tone="muted"
              showExternalIcon={true}
              className="text-[13px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
