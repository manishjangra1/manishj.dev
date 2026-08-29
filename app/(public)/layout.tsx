import React from 'react';
import { SiteShell } from '@/components/chrome/SiteShell';
import { getPublicHomeData } from '@/lib/content';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { commandItems, socialDock, hero, allProjects } = await getPublicHomeData();
  return (
    <SiteShell
      commandItems={commandItems}
      socialDock={socialDock}
      showcaseProjects={hero?.showcaseProjects}
      allProjects={allProjects}
    >
      {children}
    </SiteShell>
  );
}
