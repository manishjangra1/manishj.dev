import React from 'react';
import { SiteShell } from '@/components/chrome/SiteShell';
import { NotFoundSection } from '@/components/sections/NotFoundSection';

export default function NotFound() {
  return (
    <SiteShell current="none">
      <NotFoundSection />
    </SiteShell>
  );
}
