export interface HeroMetric {
  value: string;
  label: string;
}

export interface FeaturedProjectData {
  kicker: string;
  title: string;
  slug: string;
  lede: string;
  meta: string[];
  imageSrc: string;
  imageAlt: string;
  liveUrl?: string;
  repoUrl?: string;
  status?: 'shipped' | 'in-progress';
}

export interface ProjectRowData {
  year?: string;
  title: string;
  slug: string;
  summary: string;
  meta?: string[];
  imageSrc?: string;
  imageAlt?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface ExperienceRowData {
  startYear: string;
  endYear: string;
  role: string;
  company: string;
  location?: string;
  summary: string;
  bullets?: string[];
  current: boolean;
  tags?: string[];
}

export interface CapabilityGroupData {
  label: string;
  items: string[];
}

export interface RepoRowData {
  name: string;
  description: string;
  language?: string;
  href: string;
}

export interface CaseStudyData {
  slug: string;
  kicker: string;
  title: string;
  lede: string;
  meta: string[];
  image?: {
    src: string;
    alt: string;
  };
  liveUrl?: string;
  repoUrl?: string;
  sections: {
    heading: string;
    paragraphs: string[];
    figure?: {
      src: string;
      alt: string;
      caption?: string;
    };
  }[];
  pager?: {
    prev?: { title: string; slug: string };
    next?: { title: string; slug: string };
  };
}

export const HERO_METRICS: HeroMetric[] = [
  { value: '5+', label: 'Years building' },
  { value: '10+', label: 'Projects built' },
  { value: '759+', label: 'GitHub contributions' },
  { value: '29+', label: 'Tech & tools' },
];

export const HERO_COPY = {
  kicker: 'Software engineer',
  name: 'Manish Jangra',
  lede: 'I build full-stack products — scalable clients, APIs, and the admin systems that run them.',
  availability: 'Available for freelance work and exciting opportunities',
  primaryAction: { label: 'View all projects', href: '/work' },
  secondaryAction: { label: 'Download resume', href: '/resume' },
  tertiaryAction: { label: 'GitHub', href: 'https://github.com/manishjangra1' },
  metrics: HERO_METRICS,
};

export const FEATURED_PROJECT: FeaturedProjectData = {
  kicker: 'FEATURED PROJECT',
  title: 'Servyq',
  slug: 'servyq',
  lede: 'Dual-role mobile marketplace with real-time technician tracking, escrow payments, and automated dispatch.',
  meta: ['React Native', 'NestJS', 'PostgreSQL', 'Redis'],
  imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop',
  imageAlt: 'Servyq application interface showing service booking and dispatch management',
  liveUrl: 'https://servyq.com',
  repoUrl: 'https://github.com/manishjangra1/servyq',
  status: 'shipped',
};

export const SHOWCASE_PROJECTS: FeaturedProjectData[] = [
  {
    kicker: 'FEATURED PROJECT',
    title: 'Servyq',
    slug: 'servyq',
    lede: 'Dual-role mobile marketplace with real-time technician tracking, escrow payments, and automated dispatch.',
    meta: ['React Native', 'NestJS', 'PostgreSQL', 'Redis'],
    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'Servyq application interface showing service booking and dispatch management',
    liveUrl: 'https://servyq.com',
    repoUrl: 'https://github.com/manishjangra1/servyq',
    status: 'shipped',
  },
  {
    kicker: 'HABIT PLATFORM',
    title: 'Dayzo',
    slug: 'dayzo',
    lede: 'Social habit-tracking platform with streaks, analytics, and smart reminders.',
    meta: ['Next.js', 'MongoDB', 'Tailwind CSS'],
    imageSrc: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'Dayzo mobile habit tracking dashboard and social streak verification',
    liveUrl: 'https://dayzo.app',
    repoUrl: 'https://github.com/manishjangra1/dayzo',
    status: 'shipped',
  },
  {
    kicker: 'TYPING ESPORTS SAAS',
    title: 'Keyboard Olympics',
    slug: 'keyboard-olympics',
    lede: 'Next-generation competitive typing SaaS and real-time multiplayer esports platform with 14 game modes and switch audio synthesis.',
    meta: ['Next.js 15', 'React 19', 'Web Audio API', 'Ably'],
    imageSrc: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'Keyboard Olympics real-time multiplayer racing arena',
    liveUrl: 'https://keymasters.gg',
    repoUrl: 'https://github.com/manishjangra1/keyboard-olympics',
    status: 'shipped',
  },
  {
    kicker: 'REALTIME PARTY GAME',
    title: 'InkEcho',
    slug: 'inkecho',
    lede: 'Realtime multiplayer party game with touch-optimized Bézier drawing canvas and deterministic state machines.',
    meta: ['Next.js 15', 'React 19', 'Prisma', 'Tailwind CSS'],
    imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'InkEcho multiplayer drawing canvas and reveal carousel',
    liveUrl: 'https://inkecho.games',
    repoUrl: 'https://github.com/manishjangra1/inkecho',
    status: 'shipped',
  },
  {
    kicker: 'INTERACTIVE ART & MEME',
    title: 'The Internet Throne',
    slug: 'the-internet-throne',
    lede: 'Gamified digital monument celebrating internet culture with real-time audio soundboards and live leaderboards.',
    meta: ['Next.js 15', 'React 19', 'Web Audio API', 'MongoDB'],
    imageSrc: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'The Internet Throne digital monument and artifact museum',
    liveUrl: 'https://internetthrone.art',
    repoUrl: 'https://github.com/manishjangra1/the-internet-throne',
    status: 'shipped',
  },
  {
    kicker: 'DATABASE DEVTOOLS',
    title: 'PostgresD',
    slug: 'postgresd',
    lede: 'AI-assisted PostgreSQL schema designer with visual table canvas, visual query explain plans, and zero-downtime migrations.',
    meta: ['Next.js 15', 'TypeScript', 'React Flow', 'Prisma'],
    imageSrc: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'PostgresD visual schema designer and query plan visualizer',
    liveUrl: 'https://postgresd.dev',
    repoUrl: 'https://github.com/manishjangra1/postgresd',
    status: 'shipped',
  },
  {
    kicker: 'RURAL HEALTHCARE CRM',
    title: 'Sahaayikaa',
    slug: 'sahaayikaa',
    lede: 'Offline-first frontline healthcare CRM for ASHA and Anganwadi workers with multilingual voice inputs.',
    meta: ['Next.js 15', 'TypeScript', 'IndexedDB', 'PWA'],
    imageSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'Sahaayikaa frontline health CRM mobile triage interface',
    liveUrl: 'https://sahaayikaa.org',
    repoUrl: 'https://github.com/manishjangra1/sahaayikaa',
    status: 'shipped',
  },
  {
    kicker: 'TRAVEL STORYTELLING',
    title: 'Routeory',
    slug: 'routeory',
    lede: 'Multimedia GPS travel mapping application turning journeys into interactive 3D story maps with photo geo-clustering.',
    meta: ['Next.js 15', 'Mapbox GL', 'React 19', 'Tailwind CSS'],
    imageSrc: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'Routeory 3D GPS journey map and timeline',
    liveUrl: 'https://routeory.com',
    repoUrl: 'https://github.com/manishjangra1/routeory',
    status: 'shipped',
  },
  {
    kicker: 'DEVELOPER WORKSPACE',
    title: 'Wurbr',
    slug: 'wurbr',
    lede: 'Local-first keyboard-centric workspace combining scratchpads, JSON formatters, and curl generators.',
    meta: ['Next.js 15', 'TypeScript', 'Monaco Editor', 'Tailwind CSS'],
    imageSrc: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'Wurbr local-first developer scratchpad and workbench',
    liveUrl: 'https://wurbr.dev',
    repoUrl: 'https://github.com/manishjangra1/wurbr',
    status: 'shipped',
  },
  {
    kicker: 'PORTFOLIO & CMS',
    title: 'Portfolio & CMS',
    slug: 'portfolio',
    lede: 'Custom portfolio CMS with a headless architecture and role-based access control.',
    meta: ['Next.js 15', 'React 19', 'PostgreSQL', 'Redis'],
    imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1280&auto=format&fit=crop',
    imageAlt: 'High-performance portfolio and headless CMS platform interface',
    liveUrl: 'https://manishj.dev',
    repoUrl: 'https://github.com/manishjangra1/portfolio',
    status: 'shipped',
  },
];

export const PROJECT_ROWS: ProjectRowData[] = SHOWCASE_PROJECTS.map((p) => ({
  year: '2025',
  title: p.title,
  slug: p.slug,
  summary: p.lede,
  meta: p.meta,
  imageSrc: p.imageSrc,
  imageAlt: p.imageAlt,
  liveUrl: p.liveUrl,
  repoUrl: p.repoUrl,
}));

export const EXPERIENCE_ROWS: ExperienceRowData[] = [
  {
    startYear: '2023',
    endYear: 'Present',
    role: 'Full Stack Software Engineer',
    company: 'Ludifit Solutions',
    location: 'Chandigarh, India',
    summary: 'Leading end-to-end development of scalable web and mobile platforms.',
    bullets: [
      'Leading end-to-end development of scalable web and mobile platforms.',
      'Focus on performance, clean architecture, and exceptional user experience.',
    ],
    current: true,
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  {
    startYear: '2022',
    endYear: '2023',
    role: 'Software Engineer',
    company: 'Finmark Solutions',
    location: 'Chandigarh, India',
    summary: 'Built financial products and internal tools used by thousands of users.',
    bullets: [
      'Built financial products and internal tools used by thousands of users.',
      'Worked on APIs, dashboards, and real-time features.',
    ],
    current: false,
    tags: ['React', 'Express', 'MongoDB', 'Docker'],
  },
  {
    startYear: '2021',
    endYear: '2022',
    role: 'Frontend Engineer',
    company: 'Dayzo Studio',
    location: 'Chandigarh, India',
    summary: 'Developed responsive interfaces and design systems for web applications.',
    bullets: [
      'Developed responsive interfaces and design systems for web applications.',
      'Improved load times and accessibility across the platform.',
    ],
    current: false,
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
  },
];

export const CAPABILITY_GROUPS: CapabilityGroupData[] = [
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

// 52 weeks of static contribution data for corroboration (5 levels: 0 to 4)
export const STATIC_CONTRIBUTION_WEEKS: number[][] = Array.from({ length: 52 }, (_, weekIndex) =>
  Array.from({ length: 7 }, (_, dayIndex) => {
    const seed = (weekIndex * 7 + dayIndex) % 17;
    if (seed === 0 || seed === 5) return 0;
    if (seed < 8) return 1;
    if (seed < 13) return 2;
    if (seed < 16) return 3;
    return 4;
  })
);

export const STATIC_REPOS: RepoRowData[] = [
  {
    name: 'servyq-backend',
    description: 'Scalable NestJS backend architecture for on-demand service dispatch and payments.',
    language: 'TypeScript',
    href: 'https://github.com/manishjangra1/servyq',
  },
  {
    name: 'dayzo-app',
    description: 'React Native mobile application for social habit tracking and realtime streaks.',
    language: 'TypeScript',
    href: 'https://github.com/manishjangra1/dayzo',
  },
  {
    name: 'manishj.dev',
    description: 'Clean monochrome portfolio engineering system with Next.js 16 and Tailwind v4.',
    language: 'TypeScript',
    href: 'https://github.com/manishjangra1/portfolio',
  },
];

export const ABOUT_PARAGRAPHS = [
  'I am a full-stack software engineer focused on building complete, dependable systems. My work spans the entire product stack — from responsive mobile interfaces in React Native to structured backend services in NestJS and PostgreSQL.',
  'I prioritize system simplicity, reliable architecture, and typography-first interfaces over decorative trends. I design systems that operate predictably under load and write maintainable code that teams can evolve with confidence.',
  'Based in Chandigarh, India, I collaborate with founders, product teams, and engineering organizations worldwide to build production-grade applications.',
];

export const CONTACT_INFO = {
  email: 'dev.jangramanish@gmail.com',
  location: 'Chandigarh, India',
  linkedin: 'https://linkedin.com/in/manishjangra1',
  github: 'https://github.com/manishjangra1',
  resumeHref: '/resume',
  whatsapp: 'https://wa.me/919999999999',
};

export const MOCK_CASE_STUDIES: Record<string, CaseStudyData> = {
  servyq: {
    slug: 'servyq',
    kicker: 'On-demand services',
    title: 'Servyq',
    lede: 'Dual-role mobile marketplace with real-time technician tracking, automated dispatch, and escrow payments.',
    meta: ['Full-stack', '2025', 'React Native', 'NestJS', 'PostgreSQL', 'Socket.io'],
    image: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop',
      alt: 'Servyq application interface showing service booking and dispatch management',
    },
    liveUrl: 'https://servyq.com',
    repoUrl: 'https://github.com/manishjangra1/servyq',
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'On-demand home services frequently suffer from poor coordination between customers and service providers. Customers face unpredictable arrival times and opaque pricing, while technicians struggle with manual job matching and delayed disbursements.',
          'The goal of Servyq was to engineer a unified two-sided marketplace that handles real-time job dispatch, technician location streaming, in-app messaging, and automated milestone payouts.',
        ],
      },
      {
        heading: 'Role and Constraints',
        paragraphs: [
          'I led the end-to-end architecture and implementation: designing the React Native mobile application for both client and provider roles, implementing the NestJS microservices backend, and modeling the PostgreSQL database schemas.',
          'Key constraints included supporting low-bandwidth network environments in emerging markets, ensuring zero-downtime ledger consistency during payment capture, and maintaining low-latency location broadcasting across mobile clients.',
        ],
      },
      {
        heading: 'Approach & Architecture',
        paragraphs: [
          'The backend is built around an event-driven NestJS architecture with Redis Pub/Sub managing live WebSocket connections for real-time technician tracking and status transitions.',
          'Database transactions are orchestrated through PostgreSQL with strict isolation levels to prevent double-booking and payment concurrency anomalies. The React Native mobile frontend utilizes offline-first caching to ensure smooth operation when moving between coverage dead zones.',
        ],
      },
      {
        heading: 'Highlights',
        paragraphs: [
          '1. Dual-Role Mobile Client: Single codebase powering customer booking flows and provider job management with dynamic role switching.',
          '2. Real-Time Dispatch Engine: Geo-spatial proximity matching algorithms assigning jobs to the closest available technicians within 300ms.',
          '3. Escrow Settlement: Automated payment capture, milestone holding, and instant payout disbursement upon digital job sign-off.',
        ],
      },
      {
        heading: 'Outcome & Status',
        paragraphs: [
          'Servyq was successfully shipped and deployed to production. The platform maintains sub-second dispatch latency and has processed thousands of live service bookings with zero ledger mismatch incidents.',
        ],
      },
    ],
    pager: {
      next: { title: 'Dayzo', slug: 'dayzo' },
    },
  },
  dayzo: {
    slug: 'dayzo',
    kicker: 'Habit platform',
    title: 'Dayzo',
    lede: 'Social habit formation platform with peer accountability, streak verification, and realtime notifications.',
    meta: ['Full-stack', '2024', 'React Native', 'NestJS', 'Redis', 'PostgreSQL'],
    image: {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1280&auto=format&fit=crop',
      alt: 'Dayzo mobile habit tracking dashboard and social streak verification',
    },
    liveUrl: 'https://dayzo.app',
    repoUrl: 'https://github.com/manishjangra1/dayzo',
    sections: [
      {
        heading: 'Problem',
        paragraphs: [
          'Most habit tracking apps are solitary experiences with high 30-day abandonment rates. Without external accountability or collaborative social dynamics, users easily lapse on daily commitments.',
          'Dayzo was designed to introduce lightweight peer verification and shared milestones to turn routine building into a social, motivating habit loop.',
        ],
      },
      {
        heading: 'Approach & Implementation',
        paragraphs: [
          'Built using React Native with Expo for rapid cross-platform deployment, backed by a NestJS API and Redis caching for instant streak calculation and feed generation.',
        ],
      },
      {
        heading: 'Outcome',
        paragraphs: [
          'Shipped to iOS and Android app stores, achieving significantly higher 30-day retention compared to traditional solitary habit trackers.',
        ],
      },
    ],
    pager: {
      prev: { title: 'Servyq', slug: 'servyq' },
    },
  },
};
