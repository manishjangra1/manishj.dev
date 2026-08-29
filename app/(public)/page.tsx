import React from 'react';
import {
  HeroSection,
  WorkSection,
  ExperienceSection,
  CapabilitiesSection,
  ActivitySection,
  AboutSection,
  ContactSection,
} from '@/components/sections';
import { getPublicHomeData } from '@/lib/content';

export const revalidate = 60;

export default async function HomePage() {
  const data = await getPublicHomeData();

  return (
    <>
      {/* 0. SEO JSON-LD Person structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.jsonLd) }}
      />

      {/* 1. Hero — Identity */}
      <HeroSection {...data.hero} />

      {/* 2. Work — Proof */}
      <WorkSection {...data.work} />

      {/* 3. Experience — Trust */}
      <ExperienceSection {...data.experience} />

      {/* 4. Capabilities — Tools */}
      <CapabilitiesSection {...data.capabilities} />

      {/* 5. Activity — Corroboration */}
      <ActivitySection {...data.activity} />

      {/* 6. About — Human */}
      <AboutSection {...data.about} />

      {/* 7. Contact — Conversion */}
      <ContactSection {...data.contact} />
    </>
  );
}
