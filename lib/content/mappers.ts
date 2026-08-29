import {
  HERO_COPY,
  FEATURED_PROJECT,
  ABOUT_PARAGRAPHS,
  CONTACT_INFO,
  type FeaturedProjectData,
  type ProjectRowData,
  type ExperienceRowData,
  type CapabilityGroupData,
  type CaseStudyData,
} from '@/lib/constants/copy';
import { formatYear, formatYearRange } from '@/lib/utils/format';
import type { HeroSectionProps } from '@/components/sections/HeroSection';
import type { AboutSectionProps } from '@/components/sections/AboutSection';
import type { ContactDetailsProps } from '@/components/content/ContactDetails';

export interface ProjectDbDoc {
  _id?: string;
  title: string;
  slug: string;
  kicker?: string;
  year?: string;
  role?: string;
  imageAlt?: string;
  description: string;
  image: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  isCurrentlyWorking?: boolean;
  published?: boolean;
  order?: number;
  content?: string;
  caseStudy?: {
    problem?: string[];
    role?: string[];
    approach?: string[];
    highlights?: string[];
    outcome?: string[];
    sections?: Array<{ title?: string; content?: string | string[] }>;
    figure?: {
      src: string;
      alt: string;
      caption?: string;
    };
  };
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface SettingsDbDoc {
  _id?: string;
  siteTitle?: string;
  siteDescription?: string;
  heroKicker?: string;
  heroName?: string;
  heroText?: string;
  heroAvailability?: string;
  heroButton1Text?: string;
  heroButton2Text?: string;
  capabilities?: Array<{ label: string; items: string[] }>;
  location?: string;
  aboutTitle?: string;
  aboutText?: string;
  aboutText2?: string;
  aboutImage?: string;
  showAboutImage?: boolean;
  contactHeading?: string;
  contactDescription?: string;
  githubUsername?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    portfolio?: string;
    whatsapp?: string;
  };
}

export interface ExperienceDbDoc {
  _id?: string;
  company: string;
  role: string;
  startDate: string | Date;
  endDate?: string | Date | null;
  description?: string[] | string;
  current?: boolean;
  location?: string;
  order?: number;
}

/**
 * Transforms Settings DB document to HeroSectionProps.
 */
export function toHeroProps(settingsDoc?: SettingsDbDoc | null): HeroSectionProps {
  if (!settingsDoc) {
    return {
      kicker: HERO_COPY.kicker,
      name: HERO_COPY.name,
      lede: HERO_COPY.lede,
      availability: HERO_COPY.availability,
      primary: HERO_COPY.primaryAction,
      secondary: HERO_COPY.secondaryAction,
      tertiary: HERO_COPY.tertiaryAction,
    };
  }

  return {
    kicker: settingsDoc.heroKicker || HERO_COPY.kicker,
    name: settingsDoc.heroName || HERO_COPY.name,
    lede: settingsDoc.heroText || HERO_COPY.lede,
    availability: settingsDoc.heroAvailability || HERO_COPY.availability,
    primary: {
      label:
        settingsDoc.heroButton1Text && settingsDoc.heroButton1Text !== 'Get in touch'
          ? settingsDoc.heroButton1Text
          : 'View all projects',
      href: '/work',
    },
    secondary: {
      label:
        settingsDoc.heroButton2Text && settingsDoc.heroButton2Text !== 'See selected work'
          ? settingsDoc.heroButton2Text
          : 'Download resume',
      href: settingsDoc.resumeUrl || '/resume',
    },
    tertiary: {
      label: HERO_COPY.tertiaryAction.label,
      href: 'https://github.com/manishjangra1',
    },
  };
}

/**
 * Transforms Project DB document to FeaturedProjectData.
 */
export function toFeaturedProjectProps(projectDoc?: ProjectDbDoc | null): FeaturedProjectData {
  if (!projectDoc) {
    return FEATURED_PROJECT;
  }

  return {
    kicker: projectDoc.kicker || 'Featured product',
    title: projectDoc.title,
    slug: projectDoc.slug || 'servyq',
    lede: projectDoc.description,
    meta:
      projectDoc.technologies && projectDoc.technologies.length > 0
        ? [
            projectDoc.role || 'Full-stack',
            projectDoc.year || formatYear(projectDoc.createdAt) || '2025',
            ...projectDoc.technologies.slice(0, 4),
          ]
        : ['Full-stack', '2025', 'TypeScript', 'Next.js'],
    imageSrc: projectDoc.image,
    imageAlt: projectDoc.imageAlt || `${projectDoc.title} user interface overview`,
    liveUrl: projectDoc.liveUrl || undefined,
    repoUrl: projectDoc.githubUrl || undefined,
    status: projectDoc.isCurrentlyWorking ? 'in-progress' : 'shipped',
  };
}

/**
 * Transforms Project DB document to ProjectRowData.
 */
export function toProjectRowProps(projectDoc: ProjectDbDoc): ProjectRowData {
  return {
    year: projectDoc.year || formatYear(projectDoc.createdAt) || '2024',
    title: projectDoc.title,
    slug: projectDoc.slug || 'dayzo',
    summary: projectDoc.description,
    meta: projectDoc.technologies?.slice(0, 4) || [],
    imageSrc: projectDoc.image,
    imageAlt: projectDoc.imageAlt || `${projectDoc.title} interface preview`,
    liveUrl: projectDoc.liveUrl || undefined,
    repoUrl: projectDoc.githubUrl || undefined,
  };
}

/**
 * Transforms Experience DB document to ExperienceRowData.
 */
export function toExperienceRowProps(expDoc: ExperienceDbDoc): ExperienceRowData {
  const { startYear, endYear } = formatYearRange(
    expDoc.startDate,
    expDoc.endDate,
    expDoc.current
  );

  let bullets: string[] = [];
  let summary = '';
  if (Array.isArray(expDoc.description) && expDoc.description.length > 0) {
    bullets = expDoc.description.filter((b) => typeof b === 'string' && b.trim().length > 0);
    summary = bullets[0] || '';
  } else if (typeof expDoc.description === 'string') {
    summary = expDoc.description;
    bullets = [expDoc.description];
  }

  return {
    startYear,
    endYear,
    role: expDoc.role,
    company: expDoc.company,
    location: expDoc.location || 'Chandigarh, India',
    summary: summary || 'Building and shipping production systems.',
    bullets: bullets.length > 0 ? bullets : undefined,
    current: Boolean(expDoc.current),
  };
}

/**
 * Transforms Settings DB capabilities or Skill DB documents to CapabilityGroupData[].
 */
export function toCapabilityGroupProps(
  settingsDoc?: SettingsDbDoc | null,
  skillsDocs?: Array<{ name: string; category: string; order?: number }>
): CapabilityGroupData[] {
  if (
    settingsDoc?.capabilities &&
    Array.isArray(settingsDoc.capabilities) &&
    settingsDoc.capabilities.length > 0
  ) {
    return settingsDoc.capabilities.map((c) => ({
      label: c.label,
      items: Array.isArray(c.items) ? c.items : [],
    }));
  }

  // If settings capabilities are empty but skills collection has entries, group by category
  if (skillsDocs && Array.isArray(skillsDocs) && skillsDocs.length > 0) {
    const categoryMap: Record<string, string[]> = {};
    skillsDocs.forEach((s) => {
      const cat = (s.category || 'Other').toUpperCase();
      if (!categoryMap[cat]) categoryMap[cat] = [];
      if (!categoryMap[cat].includes(s.name)) {
        categoryMap[cat].push(s.name);
      }
    });

    const groups = Object.entries(categoryMap).map(([label, items]) => ({
      label,
      items,
    }));

    if (groups.length > 0) {
      return groups;
    }
  }

  return [
    {
      label: 'Clients',
      items: ['React Native', 'Expo', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      label: 'Servers',
      items: ['NestJS', 'Node.js', 'Express', 'REST APIs', 'GraphQL', 'Microservices'],
    },
    {
      label: 'Platform',
      items: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Socket.io', 'MongoDB'],
    },
  ];
}

/**
 * Transforms Settings DB document to AboutSectionProps.
 */
export function toAboutProps(settingsDoc?: SettingsDbDoc | null): AboutSectionProps {
  const paragraphs: string[] = [];
  if (settingsDoc?.aboutText) paragraphs.push(settingsDoc.aboutText);
  if (settingsDoc?.aboutText2) paragraphs.push(settingsDoc.aboutText2);

  const finalParagraphs = paragraphs.length > 0 ? paragraphs : ABOUT_PARAGRAPHS;

  const githubUser = settingsDoc?.githubUsername || 'manishjangra1';
  const githubAvatar =
    settingsDoc?.avatarUrl ||
    (githubUser === 'manishjangra1'
      ? 'https://avatars.githubusercontent.com/u/129877551?v=4'
      : `https://github.com/${githubUser}.png`);

  const portraitSrc =
    settingsDoc?.aboutImage && settingsDoc.aboutImage.trim() !== '' && settingsDoc.showAboutImage !== false
      ? settingsDoc.aboutImage
      : githubAvatar;

  const portrait = {
    src: portraitSrc,
    alt: settingsDoc?.heroName || 'Manish Jangra',
  };

  return {
    header: {
      kicker: 'About',
      title: settingsDoc?.aboutTitle || 'Background, systems, and product thinking.',
      support: 'How I design and implement reliable software.',
    },
    paragraphs: finalParagraphs,
    portrait,
  };
}

/**
 * Transforms Settings DB document to ContactDetailsProps.
 */
export function toContactDetailsProps(settingsDoc?: SettingsDbDoc | null): ContactDetailsProps {
  const social = settingsDoc?.socialLinks || {};
  return {
    email: social.email || CONTACT_INFO.email,
    location: settingsDoc?.location || CONTACT_INFO.location,
    linkedin: social.linkedin || CONTACT_INFO.linkedin,
    github: social.github || CONTACT_INFO.github,
    resumeHref: settingsDoc?.resumeUrl || CONTACT_INFO.resumeHref,
    whatsapp: social.whatsapp || undefined,
  };
}

/**
 * Transforms Project DB document + structured CaseStudy to CaseStudyData.
 */
export function toCaseStudyData(
  projectDoc: ProjectDbDoc,
  prevProject?: { title: string; slug: string },
  nextProject?: { title: string; slug: string }
): CaseStudyData {
  const caseStudy = projectDoc.caseStudy;
  const sections: CaseStudyData['sections'] = [];

  if (caseStudy) {
    if (caseStudy.sections && caseStudy.sections.length > 0) {
      caseStudy.sections.forEach((s: { title?: string; content?: string | string[] }, idx: number) => {
        if (!s.title && !s.content) return;
        const paragraphs = Array.isArray(s.content)
          ? s.content
          : typeof s.content === 'string'
          ? s.content.split('\n\n').map((p: string) => p.trim()).filter(Boolean)
          : [];

        sections.push({
          heading: s.title || `Section 0${idx + 1}`,
          paragraphs: paragraphs.length > 0 ? paragraphs : [String(s.content || '')],
        });
      });
    } else {
      if (caseStudy.problem && caseStudy.problem.length > 0) {
        sections.push({
          heading: 'Problem',
          paragraphs: caseStudy.problem,
        });
      }
      if (caseStudy.role && caseStudy.role.length > 0) {
        sections.push({
          heading: 'Role and Constraints',
          paragraphs: caseStudy.role,
        });
      }
      if (caseStudy.approach && caseStudy.approach.length > 0) {
        const isDuplicateFigure =
          caseStudy.figure?.src &&
          (caseStudy.figure.src === projectDoc.image ||
            (projectDoc.image && typeof projectDoc.image === 'string' && caseStudy.figure.src.includes(projectDoc.image)));

        sections.push({
          heading: 'Approach & Architecture',
          paragraphs: caseStudy.approach,
          figure:
            caseStudy.figure?.src && !isDuplicateFigure
              ? {
                  src: caseStudy.figure.src,
                  alt: caseStudy.figure.alt || 'Architecture diagram',
                  caption: caseStudy.figure.caption,
                }
              : undefined,
        });
      }
      if (caseStudy.highlights && caseStudy.highlights.length > 0) {
        sections.push({
          heading: 'Highlights',
          paragraphs: caseStudy.highlights,
        });
      }
      if (caseStudy.outcome && caseStudy.outcome.length > 0) {
        sections.push({
          heading: 'Outcome & Status',
          paragraphs: caseStudy.outcome,
        });
      }
    }
  }

  // If no structured sections but content markdown exists, split paragraphs
  if (sections.length === 0 && projectDoc.content) {
    const rawParagraphs = projectDoc.content
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    sections.push({
      heading: 'Overview & Implementation',
      paragraphs: rawParagraphs.length > 0 ? rawParagraphs : [projectDoc.description],
    });
  } else if (sections.length === 0) {
    sections.push(
      {
        heading: 'Problem',
        paragraphs: [
          projectDoc.description || 'Designing and engineering scalable full-stack software solutions.',
        ],
      },
      {
        heading: 'Approach & Implementation',
        paragraphs: [
          `Built using modern production architecture with ${projectDoc.technologies?.join(', ') || 'TypeScript and Node.js'}. Focused on modular code quality, clean database transactions, and responsive client interfaces.`,
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Successfully deployed to production with high reliability and zero downtime.',
        ],
      }
    );
  }

  return {
    slug: projectDoc.slug,
    kicker: projectDoc.kicker || 'Case study',
    title: projectDoc.title,
    lede: projectDoc.description,
    meta:
      projectDoc.technologies && projectDoc.technologies.length > 0
        ? [
            projectDoc.role || 'Full-stack',
            projectDoc.year || formatYear(projectDoc.createdAt) || '2025',
            ...projectDoc.technologies,
          ]
        : ['Full-stack', '2025', 'TypeScript', 'Next.js'],
    image: projectDoc.image
      ? {
          src: projectDoc.image,
          alt: projectDoc.imageAlt || `${projectDoc.title} interface preview`,
        }
      : undefined,
    liveUrl: projectDoc.liveUrl || undefined,
    repoUrl: projectDoc.githubUrl || undefined,
    sections,
    pager: {
      prev: prevProject,
      next: nextProject,
    },
  };
}
