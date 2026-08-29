import 'server-only';
import connectDB from '@/lib/db';
import Settings from '@/lib/models/Settings';
import Project from '@/lib/models/Project';
import Experience from '@/lib/models/Experience';
import { fetchGitHubActivity, type GitHubActivityData } from '@/lib/github';
import {
  toHeroProps,
  toFeaturedProjectProps,
  toProjectRowProps,
  toExperienceRowProps,
  toCapabilityGroupProps,
  toAboutProps,
  toContactDetailsProps,
  type ProjectDbDoc,
  type SettingsDbDoc,
  type ExperienceDbDoc,
} from './mappers';
import { buildPersonJsonLd } from '@/lib/seo';
import {
  FEATURED_PROJECT,
  PROJECT_ROWS,
  EXPERIENCE_ROWS,
  STATIC_CONTRIBUTION_WEEKS,
  STATIC_REPOS,
  CONTACT_INFO,
} from '@/lib/constants/copy';
import type { HeroSectionProps } from '@/components/sections/HeroSection';
import type { WorkSectionProps } from '@/components/sections/WorkSection';
import type { ExperienceSectionProps } from '@/components/sections/ExperienceSection';
import type { CapabilitiesSectionProps } from '@/components/sections/CapabilitiesSection';
import type { ActivitySectionProps } from '@/components/sections/ActivitySection';
import type { AboutSectionProps } from '@/components/sections/AboutSection';
import type { ContactSectionProps } from '@/components/sections/ContactSection';
import type { CommandItem } from '@/components/chrome/CommandMenu';

export interface PublicHomeData {
  hero: HeroSectionProps;
  work: WorkSectionProps;
  experience: ExperienceSectionProps;
  capabilities: CapabilitiesSectionProps;
  activity: ActivitySectionProps;
  about: AboutSectionProps;
  contact: ContactSectionProps;
  commandItems: CommandItem[];
  jsonLd: Record<string, unknown>;
}

export async function getPublicHomeData(): Promise<PublicHomeData> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://manishj.dev';

  let rawSettings: SettingsDbDoc | null = null;
  let rawProjects: ProjectDbDoc[] = [];
  let rawExperience: ExperienceDbDoc[] = [];
  let githubActivity: GitHubActivityData | null = null;

  try {
    await connectDB();

    const [settingsRes, projectsRes, experienceRes, githubRes] = await Promise.allSettled([
      Settings.findOne().lean(),
      Project.find({ published: { $ne: false } })
        .sort({ order: 1, createdAt: -1 })
        .lean(),
      Experience.find()
        .sort({ order: 1, startDate: -1 })
        .lean(),
      fetchGitHubActivity(),
    ]);

    if (settingsRes.status === 'fulfilled' && settingsRes.value) {
      rawSettings = JSON.parse(JSON.stringify(settingsRes.value)) as SettingsDbDoc;
    }

    if (projectsRes.status === 'fulfilled' && Array.isArray(projectsRes.value)) {
      rawProjects = JSON.parse(JSON.stringify(projectsRes.value)) as ProjectDbDoc[];
    }

    if (experienceRes.status === 'fulfilled' && Array.isArray(experienceRes.value)) {
      rawExperience = JSON.parse(JSON.stringify(experienceRes.value)) as ExperienceDbDoc[];
    }

    if (githubRes.status === 'fulfilled') {
      githubActivity = githubRes.value;
    }
  } catch (error) {
    console.error('getPublicHomeData database error, falling back to static constants:', error);
  }

  // 1. Hero Props
  const hero = {
    ...toHeroProps(rawSettings),
    showcaseProjects:
      rawProjects.length >= 3
        ? rawProjects.slice(0, 3).map(toFeaturedProjectProps)
        : undefined,
  };

  // 2. Work Props (render 3-column project cards)
  const work: WorkSectionProps = {
    header: {
      kicker: 'SELECTED WORK',
      title: "Products I've designed and shipped",
      actionLabel: 'View all projects',
      actionHref: 'https://github.com/manishjangra1?tab=repositories',
    },
    projects:
      rawProjects.length > 0
        ? rawProjects.map(toProjectRowProps)
        : PROJECT_ROWS,
  };

  // 3. Experience Props (render connected timeline)
  const experience: ExperienceSectionProps = {
    header: {
      kicker: 'EXPERIENCE',
      title: 'Where the work happened',
      actionLabel: 'View full timeline',
      actionHref: '/resume',
    },
    roles:
      rawExperience.length > 0
        ? rawExperience.map(toExperienceRowProps)
        : EXPERIENCE_ROWS,
  };

  // 4. Capabilities Props
  const capabilities: CapabilitiesSectionProps = {
    header: {
      kicker: 'CAPABILITIES',
      title: 'The tools I actually ship with.',
      support: 'Production technologies used to build reliable user interfaces, server runtimes, and databases.',
      actionLabel: 'View GitHub profile',
      actionHref:
        rawSettings?.socialLinks?.github || CONTACT_INFO.github,
    },
    groups: toCapabilityGroupProps(rawSettings),
  };

  // 5. Activity Props
  const activity: ActivitySectionProps = {
    header: {
      kicker: 'ACTIVITY',
      title: 'Recent work on GitHub.',
      support: 'Open source contributions and engineering activity.',
      actionLabel: 'View GitHub profile',
      actionHref:
        githubActivity?.profileUrl ||
        rawSettings?.socialLinks?.github ||
        CONTACT_INFO.github,
    },
    status: githubActivity?.status === 'error' ? 'error' : 'ready',
    count: githubActivity?.count ?? 759,
    caption: githubActivity?.caption ?? 'contributions in the last year',
    weeks:
      githubActivity?.weeks && githubActivity.weeks.length > 0
        ? githubActivity.weeks
        : STATIC_CONTRIBUTION_WEEKS,
    profileUrl:
      githubActivity?.profileUrl ||
      rawSettings?.socialLinks?.github ||
      CONTACT_INFO.github,
    repos:
      githubActivity?.repos && githubActivity.repos.length > 0
        ? githubActivity.repos
        : STATIC_REPOS,
  };

  // 6. About Props
  const about = toAboutProps(rawSettings);

  // 7. Contact Props
  const contact: ContactSectionProps = {
    header: {
      kicker: 'Contact',
      title: rawSettings?.contactHeading || 'Get in touch.',
      support:
        rawSettings?.contactDescription ||
        'Full-time product engineering roles and selected freelance engagements. The best first step is email.',
    },
    detailsProps: toContactDetailsProps(rawSettings),
  };

  // 8. Command Items List
  const staticCommandItems: CommandItem[] = [
    { id: 'home', label: 'Home', hint: 'Section', action: 'hash', target: 'hero' },
    { id: 'work', label: 'Work', hint: 'Section', action: 'hash', target: 'work' },
    { id: 'experience', label: 'Experience', hint: 'Section', action: 'hash', target: 'experience' },
    { id: 'capabilities', label: 'Capabilities', hint: 'Section', action: 'hash', target: 'capabilities' },
    { id: 'activity', label: 'Activity', hint: 'Section', action: 'hash', target: 'activity' },
    { id: 'about', label: 'About', hint: 'Section', action: 'hash', target: 'about' },
    { id: 'contact', label: 'Contact', hint: 'Section', action: 'hash', target: 'contact' },
  ];

  const projectCommandItems: CommandItem[] = (
    rawProjects.length > 0
      ? rawProjects.map((p) => ({
          id: `project-${p.slug}`,
          label: p.title,
          hint: 'Project',
          action: 'route' as const,
          target: `/work/${p.slug}`,
        }))
      : [
          { id: 'project-servyq', label: 'Servyq', hint: 'Project', action: 'route', target: '/work/servyq' },
          { id: 'project-dayzo', label: 'Dayzo', hint: 'Project', action: 'route', target: '/work/dayzo' },
        ]
  );

  const utilityCommandItems: CommandItem[] = [
    { id: 'resume', label: 'Download Résumé', hint: 'File', action: 'download', target: '/resume' },
    {
      id: 'copy-email',
      label: 'Copy Email Address',
      hint: 'Action',
      action: 'copy',
      target: rawSettings?.socialLinks?.email || CONTACT_INFO.email,
    },
    { id: 'theme-toggle', label: 'Toggle Theme', hint: 'Action', action: 'theme' },
    {
      id: 'github',
      label: 'GitHub Profile',
      hint: 'External',
      action: 'external',
      target: rawSettings?.socialLinks?.github || CONTACT_INFO.github,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      hint: 'External',
      action: 'external',
      target: rawSettings?.socialLinks?.linkedin || CONTACT_INFO.linkedin,
    },
  ];

  const commandItems = [...staticCommandItems, ...projectCommandItems, ...utilityCommandItems];

  // 9. JSON-LD structured data
  const jsonLd = buildPersonJsonLd(siteUrl, {
    name: rawSettings?.heroName || 'Manish Jangra',
    jobTitle: 'Full-Stack Software Engineer',
    email: rawSettings?.socialLinks?.email || CONTACT_INFO.email,
    location: rawSettings?.location || CONTACT_INFO.location,
    socialLinks: rawSettings?.socialLinks,
  });

  return {
    hero,
    work,
    experience,
    capabilities,
    activity,
    about,
    contact,
    commandItems,
    jsonLd,
  };
}
