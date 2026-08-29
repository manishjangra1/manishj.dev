export function buildPersonJsonLd(siteUrl: string, settings?: {
  name?: string;
  jobTitle?: string;
  email?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}) {
  const sameAs: string[] = [];
  if (settings?.socialLinks?.github) sameAs.push(settings.socialLinks.github);
  if (settings?.socialLinks?.linkedin) sameAs.push(settings.socialLinks.linkedin);
  if (settings?.socialLinks?.twitter) sameAs.push(settings.socialLinks.twitter);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings?.name || 'Manish Jangra',
    jobTitle: settings?.jobTitle || 'Full-Stack Software Engineer',
    url: siteUrl,
    email: settings?.email || 'dev.jangramanish@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: settings?.location || 'Chandigarh',
      addressCountry: 'IN',
    },
    sameAs: sameAs.length > 0 ? sameAs : [
      'https://github.com/manishjangra1',
      'https://linkedin.com/in/manishjangra1',
    ],
  };
}

export function buildCaseStudyJsonLd(
  project: {
    title: string;
    lede: string;
    slug: string;
    image?: string;
  },
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.lede,
    url: `${siteUrl}/work/${project.slug}`,
    image: project.image,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Cross-platform',
    author: {
      '@type': 'Person',
      name: 'Manish Jangra',
      url: siteUrl,
    },
  };
}
