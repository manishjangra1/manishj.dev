const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Define schemas
const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    kicker: { type: String },
    year: { type: String },
    role: { type: String },
    imageAlt: { type: String },
    description: { type: String, required: true },
    image: { type: String, required: true },
    technologies: { type: [String], default: [] },
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    isCurrentlyWorking: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    content: { type: String },
    caseStudy: {
      problem: [String],
      role: [String],
      approach: [String],
      highlights: [String],
      outcome: [String],
      figure: {
        src: String,
        alt: String,
        caption: String,
      },
    },
  },
  { timestamps: true }
);

const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: [String], default: [] },
    current: { type: Boolean, default: false },
    location: { type: String },
    logo: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SettingsSchema = new mongoose.Schema(
  {
    siteTitle: { type: String, default: 'Manish Jangra — Full-Stack Software Engineer' },
    siteDescription: { type: String, default: 'I build full-stack products — mobile clients, APIs, and the admin systems that run them.' },
    heroKicker: { type: String, default: 'Software engineer' },
    heroName: { type: String, default: 'Manish Jangra' },
    heroText: { type: String, default: 'I build full-stack products — mobile clients, APIs, and the admin systems that run them.' },
    heroAvailability: { type: String, default: 'Available for full-time roles and selected engagements' },
    heroButton1Text: { type: String, default: 'Get in touch' },
    heroButton2Text: { type: String, default: 'See selected work' },
    capabilities: [
      {
        label: { type: String, required: true },
        items: [String],
      },
    ],
    location: { type: String, default: 'Chandigarh, India' },
    aboutTitle: { type: String, default: 'Background, systems, and product thinking.' },
    aboutText: { type: String, default: 'I am a full-stack software engineer focused on building complete, dependable systems. My work spans the entire product stack — from responsive mobile interfaces in React Native to structured backend services in NestJS and PostgreSQL.' },
    aboutText2: { type: String, default: 'I prioritize system simplicity, reliable architecture, and typography-first interfaces over decorative trends. I design systems that operate predictably under load and write maintainable code that teams can evolve with confidence.' },
    aboutTechStack: [String],
    aboutIcon: { type: String, default: '👨‍💻' },
    aboutImage: { type: String, default: '' },
    showAboutImage: { type: Boolean, default: false },
    contactHeading: { type: String, default: 'Get in touch.' },
    contactDescription: { type: String, default: 'Full-time product engineering roles and selected freelance engagements. The best first step is email.' },
    resumeUrl: { type: String, default: '' },
    socialLinks: {
      github: { type: String, default: 'https://github.com/manishjangra1' },
      linkedin: { type: String, default: 'https://linkedin.com/in/manishjangra1' },
      twitter: { type: String, default: '' },
      email: { type: String, default: 'dev.jangramanish@gmail.com' },
      portfolio: { type: String, default: 'https://manishj.dev' },
      whatsapp: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

const seedProjects = [
  {
    title: 'Servyq',
    slug: 'servyq',
    kicker: 'On-demand services',
    year: '2025',
    role: 'Lead Full-Stack Architect',
    imageAlt: 'Servyq application interface showing service booking and dispatch management',
    description: 'Dual-role mobile marketplace with real-time technician tracking, escrow payments, and automated dispatch.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop',
    technologies: ['React Native', 'NestJS', 'PostgreSQL', 'Socket.io', 'Redis', 'Docker'],
    liveUrl: 'https://servyq.com',
    githubUrl: 'https://github.com/manishjangra1/servyq',
    featured: true,
    isCurrentlyWorking: false,
    published: true,
    order: 1,
    caseStudy: {
      problem: [
        'On-demand home services frequently suffer from poor coordination between customers and service providers. Customers face unpredictable arrival times and opaque pricing, while technicians struggle with manual job matching and delayed disbursements.',
        'The goal of Servyq was to engineer a unified two-sided marketplace that handles real-time job dispatch, technician location streaming, in-app messaging, and automated milestone payouts.',
      ],
      role: [
        'I led the end-to-end architecture and implementation: designing the React Native mobile application for both client and provider roles, implementing the NestJS microservices backend, and modeling the PostgreSQL database schemas.',
        'Key constraints included supporting low-bandwidth network environments in emerging markets, ensuring zero-downtime ledger consistency during payment capture, and maintaining low-latency location broadcasting across mobile clients.',
      ],
      approach: [
        'The backend is built around an event-driven NestJS architecture with Redis Pub/Sub managing live WebSocket connections for real-time technician tracking and status transitions.',
        'Database transactions are orchestrated through PostgreSQL with strict isolation levels to prevent double-booking and payment concurrency anomalies. The React Native mobile frontend utilizes offline-first caching to ensure smooth operation when moving between coverage dead zones.',
      ],
      highlights: [
        'Dual-Role Mobile Client: Single codebase powering customer booking flows and provider job management with dynamic role switching.',
        'Real-Time Dispatch Engine: Geo-spatial proximity matching algorithms assigning jobs to the closest available technicians within 300ms.',
        'Escrow Settlement: Automated payment capture, milestone holding, and instant payout disbursement upon digital job sign-off.',
      ],
      outcome: [
        'Servyq was successfully shipped and deployed to production. The platform maintains sub-second dispatch latency and has processed thousands of live service bookings with zero ledger mismatch incidents.',
      ],
      figure: {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1280&auto=format&fit=crop',
        alt: 'Servyq Architecture and Dispatch Flow',
        caption: 'Figure 1: Event-driven dispatch pipeline and real-time state machine.',
      },
    },
  },
  {
    title: 'Dayzo',
    slug: 'dayzo',
    kicker: 'Habit platform',
    year: '2024',
    role: 'Full-Stack Engineer',
    imageAlt: 'Dayzo mobile habit tracking dashboard and social streak verification',
    description: 'Social habit formation platform with peer accountability, streak verification, and realtime notifications.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1280&auto=format&fit=crop',
    technologies: ['React Native', 'Expo', 'NestJS', 'Redis', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://dayzo.app',
    githubUrl: 'https://github.com/manishjangra1/dayzo',
    featured: false,
    isCurrentlyWorking: false,
    published: true,
    order: 2,
    caseStudy: {
      problem: [
        'Most habit tracking apps are solitary experiences with high 30-day abandonment rates. Without external accountability or collaborative social dynamics, users easily lapse on daily commitments.',
        'Dayzo was designed to introduce lightweight peer verification and shared milestones to turn routine building into a social, motivating habit loop.',
      ],
      role: [
        'Engineered the cross-platform mobile client with Expo and React Native, focusing on fluid physics-based gestures and smooth offline consistency calculations.',
        'Implemented background push scheduling, streak calculation microservices, and database audit logs.',
      ],
      approach: [
        'Built using React Native with Expo for rapid cross-platform deployment, backed by a NestJS API and Redis caching for instant streak calculation and feed generation.',
        'Designed an off-screen milestone rendering engine allowing users to export custom high-resolution progress achievement cards natively.',
      ],
      highlights: [
        'Social Accountability: Co-op streak verification where buddies validate completed routines.',
        'Offline First: Local SQLite sync engine reconciling habit check-ins seamlessly upon reconnect.',
        'High Performance: 60 FPS gesture-driven UI with low battery overhead.',
      ],
      outcome: [
        'Shipped to mobile app stores, achieving significantly higher 30-day retention compared to traditional solitary habit trackers.',
      ],
    },
  },
  {
    title: 'Portfolio & CMS',
    slug: 'portfolio',
    kicker: 'Engineering system',
    year: '2024',
    role: 'Software Engineer',
    imageAlt: 'Monochrome portfolio system architecture',
    description: 'High-performance monochrome portfolio system with custom CMS, ISR, and accessible keyboard navigation.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1280&auto=format&fit=crop',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'MongoDB'],
    liveUrl: 'https://manishj.dev',
    githubUrl: 'https://github.com/manishjangra1/portfolio',
    featured: false,
    isCurrentlyWorking: false,
    published: true,
    order: 3,
    caseStudy: {
      problem: [
        'Modern developer portfolios frequently overload visitors with heavy 3D animations, lagging scrolljacks, and inaccessible layouts that distract from actual software engineering proof.',
        'The goal was to design an editorial, typography-first monochrome portfolio system with 100/100 Lighthouse metrics and complete keyboard accessibility.',
      ],
      role: [
        'Designed and developed the entire application from tokens to database mappers.',
      ],
      approach: [
        'Implemented using Next.js 16 App Router Server Components, strict CSS custom properties tokens, and a clean mapper architecture separating DB documents from UI contracts.',
      ],
      highlights: [
        'Full keyboard navigation: ⌘K command menu, focus trapping, skip links, and polite live regions.',
        'Sub-100ms first paint with zero WebGL/3D overhead.',
        'Self-hosted Geist typography with strict monochrome color ramp.',
      ],
      outcome: [
        'Flawless 100/100 Lighthouse scores in Accessibility and SEO, with instantaneous page loads.',
      ],
    },
  },
];

const seedExperience = [
  {
    company: 'Independent / Product Engagements',
    role: 'Full-Stack Software Engineer',
    startDate: new Date('2023-01-01'),
    description: [
      'Designing and deploying complete mobile clients, backend architectures, and management tooling for production applications.',
      'Architected distributed NestJS microservices and React Native applications serving thousands of concurrent users.',
    ],
    current: true,
    location: 'Chandigarh, India',
    order: 1,
  },
  {
    company: 'Fintech Solutions',
    role: 'Software Engineer',
    startDate: new Date('2022-06-01'),
    endDate: new Date('2023-01-01'),
    description: [
      'Built transaction pipelines, payment reconciliation dashboards, and real-time ledger sync services with 99.9% uptime.',
      'Reduced database query latency by 45% through index optimization and Redis caching layer implementation.',
    ],
    current: false,
    location: 'Chandigarh, India',
    order: 2,
  },
  {
    company: 'Digital Studio',
    role: 'Frontend Engineer',
    startDate: new Date('2021-06-01'),
    endDate: new Date('2022-06-01'),
    description: [
      'Developed accessible, responsive web interfaces and design systems for client platforms using React and TypeScript.',
      'Implemented automated testing pipelines and improved Core Web Vitals across client web applications.',
    ],
    current: false,
    location: 'Chandigarh, India',
    order: 3,
  },
];

const seedSettings = {
  siteTitle: 'Manish Jangra — Full-Stack Software Engineer',
  siteDescription: 'I build full-stack products — mobile clients, APIs, and the admin systems that run them.',
  heroKicker: 'Software engineer',
  heroName: 'Manish Jangra',
  heroText: 'I build full-stack products — mobile clients, APIs, and the admin systems that run them.',
  heroAvailability: 'Available for full-time roles and selected engagements',
  heroButton1Text: 'Get in touch',
  heroButton2Text: 'See selected work',
  capabilities: [
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
  ],
  location: 'Chandigarh, India',
  aboutTitle: 'Background, systems, and product thinking.',
  aboutText: 'I am a full-stack software engineer focused on building complete, dependable systems. My work spans the entire product stack — from responsive mobile interfaces in React Native to structured backend services in NestJS and PostgreSQL.',
  aboutText2: 'I prioritize system simplicity, reliable architecture, and typography-first interfaces over decorative trends. I design systems that operate predictably under load and write maintainable code that teams can evolve with confidence.',
  showAboutImage: false,
  contactHeading: 'Get in touch.',
  contactDescription: 'Full-time product engineering roles and selected freelance engagements. The best first step is email.',
  resumeUrl: '',
  socialLinks: {
    github: 'https://github.com/manishjangra1',
    linkedin: 'https://linkedin.com/in/manishjangra1',
    twitter: '',
    email: 'dev.jangramanish@gmail.com',
    portfolio: 'https://manishj.dev',
    whatsapp: '',
  },
};

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing in .env.local');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  console.log('Clearing old projects, experiences, and settings...');
  await Project.deleteMany({});
  await Experience.deleteMany({});
  await Settings.deleteMany({});

  console.log('Inserting seed projects...');
  await Project.insertMany(seedProjects);

  console.log('Inserting seed experiences...');
  await Experience.insertMany(seedExperience);

  console.log('Inserting seed settings...');
  await Settings.create(seedSettings);

  console.log('Seeding complete successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
