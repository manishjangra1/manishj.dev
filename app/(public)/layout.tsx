import React from 'react';
import { SiteShell } from '@/components/chrome/SiteShell';
import { getPublicHomeData } from '@/lib/content';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { commandItems } = await getPublicHomeData();
  return <SiteShell commandItems={commandItems}>{children}</SiteShell>;
}
