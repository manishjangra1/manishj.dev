import React from 'react';
import { Container } from '@/components/primitives/Container';
import { SectionHeader } from '@/components/content/SectionHeader';
import { ContactForm, type ContactFormProps } from '@/components/content/ContactForm';
import { ContactDetails, type ContactDetailsProps } from '@/components/content/ContactDetails';
import { Hairline } from '@/components/primitives/Hairline';
import { CONTACT_INFO } from '@/lib/constants/copy';
import { cn } from '@/lib/utils';

export interface ContactSectionProps {
  header?: {
    kicker: string;
    title: string;
    support?: string;
  };
  formProps?: Partial<ContactFormProps>;
  detailsProps?: Partial<ContactDetailsProps>;
  className?: string;
}

export function ContactSection({
  header = {
    kicker: 'Contact',
    title: 'Get in touch.',
    support: 'Full-time product engineering roles and selected freelance engagements. The best first step is email.',
  },
  formProps,
  detailsProps,
  className,
}: ContactSectionProps) {
  const details: ContactDetailsProps = {
    email: CONTACT_INFO.email,
    location: CONTACT_INFO.location,
    linkedin: CONTACT_INFO.linkedin,
    resumeHref: CONTACT_INFO.resumeHref,
    github: CONTACT_INFO.github,
    whatsapp: CONTACT_INFO.whatsapp,
    ...detailsProps,
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      data-reveal
      className={cn(
        'scroll-mt-[80px] py-10 sm:py-12 md:py-14 lg:py-16',
        className
      )}
    >
      <Container well="page">
        <SectionHeader
          kicker={header.kicker}
          title={header.title}
          titleId="contact-title"
          support={header.support}
        />

        <div className="mt-[32px] md:mt-[48px] flex flex-col lg:flex-row gap-y-[40px] gap-x-[80px] items-start">
          {/* Left Column: Contact Form */}
          <div className="w-full lg:w-[55%]">
            <ContactForm {...formProps} />
          </div>

          {/* Hairline on mobile/tablet */}
          <div className="w-full block lg:hidden">
            <Hairline tone="default" />
          </div>

          {/* Right Column: Contact Details */}
          <div className="w-full lg:w-[45%] lg:pt-1">
            <ContactDetails {...details} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
