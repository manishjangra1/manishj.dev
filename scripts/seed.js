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
      sections: [
        {
          title: String,
          content: String,
        },
      ],
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

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String },
    proficiency: { type: Number, default: 85 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

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
      sections: [
        {
          title: 'Problem',
          content:
            'On-demand home services frequently suffer from poor coordination between customers and service providers. Customers face unpredictable arrival times and opaque pricing, while technicians struggle with manual job matching and delayed disbursements.\n\nThe goal of Servyq was to engineer a unified two-sided marketplace that handles real-time job dispatch, technician location streaming, in-app messaging, and automated milestone payouts.',
        },
        {
          title: 'Role and Constraints',
          content:
            'I led the end-to-end architecture and implementation: designing the React Native mobile application for both client and provider roles, implementing the NestJS microservices backend, and modeling the PostgreSQL database schemas.\n\nKey constraints included supporting low-bandwidth network environments in emerging markets, ensuring zero-downtime ledger consistency during payment capture, and maintaining low-latency location broadcasting across mobile clients.',
        },
        {
          title: 'Approach & Architecture',
          content:
            'The backend is built around an event-driven NestJS architecture with Redis Pub/Sub managing live WebSocket connections for real-time technician tracking and status transitions.\n\nDatabase transactions are orchestrated through PostgreSQL with strict isolation levels to prevent double-booking and payment concurrency anomalies. The React Native mobile frontend utilizes offline-first caching to ensure smooth operation when moving between coverage dead zones.',
        },
        {
          title: 'Highlights',
          content:
            '1. Dual-Role Mobile Client: Single codebase powering customer booking flows and provider job management with dynamic role switching.\n\n2. Real-Time Dispatch Engine: Geo-spatial proximity matching algorithms assigning jobs to the closest available technicians within 300ms.\n\n3. Escrow Settlement: Automated payment capture, milestone holding, and instant payout disbursement upon digital job sign-off.',
        },
        {
          title: 'Outcome & Status',
          content:
            'Servyq was successfully shipped and deployed to production. The platform maintains sub-second dispatch latency and has processed thousands of live service bookings with zero ledger mismatch incidents.',
        },
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
      sections: [
        {
          title: 'Problem',
          content:
            'Most habit tracking apps are solitary experiences with high 30-day abandonment rates. Without external accountability or collaborative social dynamics, users easily lapse on daily commitments.\n\nDayzo was designed to introduce lightweight peer verification and shared milestones to turn routine building into a social, motivating habit loop.',
        },
        {
          title: 'Role and Constraints',
          content:
            'Engineered the cross-platform mobile client with Expo and React Native, focusing on fluid physics-based gestures and smooth offline consistency calculations.\n\nImplemented background push scheduling, streak calculation microservices, and database audit logs.',
        },
        {
          title: 'Approach & Architecture',
          content:
            'Built using React Native with Expo for rapid cross-platform deployment, backed by a NestJS API and Redis caching for instant streak calculation and feed generation.\n\nDesigned an off-screen milestone rendering engine allowing users to export custom high-resolution progress achievement cards natively.',
        },
        {
          title: 'Highlights',
          content:
            '1. Social Accountability: Co-op streak verification where buddies validate completed routines.\n\n2. Offline First: Local SQLite sync engine reconciling habit check-ins seamlessly upon reconnect.\n\n3. High Performance: 60 FPS gesture-driven UI with low battery overhead.',
        },
        {
          title: 'Outcome & Status',
          content:
            'Shipped to mobile app stores, achieving significantly higher 30-day retention compared to traditional solitary habit trackers.',
        },
      ],
    },
  },
  {
    title: 'Keyboard Olympics',
    slug: 'keyboard-olympics',
    kicker: 'Typing Esports SaaS',
    year: '2026',
    role: 'Full-Stack Architect & Lead Engineer',
    imageAlt: 'Keyboard Olympics real-time multiplayer racing arena, mechanical switch sound synthesis, and tournament brackets',
    description: 'Next-generation competitive typing SaaS and real-time multiplayer esports platform with 14 game modes, Web Audio acoustic switch synthesis, single-elimination tournament brackets, and server-side anti-cheat heuristics.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1280&auto=format&fit=crop',
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'MongoDB',
      'Mongoose',
      'Ably Realtime',
      'Web Audio API',
      'Zustand',
      'Framer Motion',
    ],
    liveUrl: 'https://keymasters.gg',
    githubUrl: 'https://github.com/manishjangra1/keyboard-olympics',
    featured: true,
    isCurrentlyWorking: false,
    published: true,
    order: 3,
    caseStudy: {
      problem: [
        'Most typing platforms (Monkeytype, TypeRacer) optimize strictly for sterile speed tests, lacking modern esports mechanics, real-time multiplayer depth, RPG progression, and robust anti-cheat validation.',
        'Keyboard Olympics was engineered to transform speed typing into a game-first competitive esport — combining zero-latency keystroke telemetry, real-time WebSocket racing, procedural acoustic mechanical switch synthesis, tournament bracket trees, and server-side Inter-Keystroke Interval Variance (IKIV) heuristics.',
      ],
      role: [
        'Architected and implemented the end-to-end platform: Next.js 15 App Router architecture, procedural Web Audio acoustic synthesizer, Ably WebSocket channels, and Mongoose database design.',
        'Engineered server-side anti-cheat telemetry verification and real-time single-elimination tournament bracket engines handling automated matchmaking and coin payouts.',
      ],
      approach: [
        'Engineered 14 specialized typing disciplines spanning Standard (Classic, Speed Burst, Code Sprint), Arcade (Reverse, Emoji Blitz, Weird Sentences, Sudden Death, Chaos), and Mastery (Zen Flow, Echo Memory blackout, N-Gram drills, Matrix Crunch).',
        'Implemented dual real-time multiplayer racing using Ably WebSockets with presence tracking, synchronized 3-2-1 countdown lockstep, floating opponent carets, and AI bot competitors calibrated from 40 to 120 WPM.',
        'Synthesized 8 hardware-accurate mechanical switch acoustic profiles (Creamy Thock, Clicky Blue, Topre, 8-Bit Synth, Alps Clack, Bubble Pop) using procedural Web Audio API nodes with pitch and volume variance.',
        'Built a complete single-elimination tournament engine supporting 4 to 64 competitors, head-to-head match duels, automated round advancement, and prize pool coin distributions.',
      ],
      highlights: [
        '14 Distinct Game Modes: Comprehensive suite across speed bursts, syntax-accurate code sprints, cognitive memory blackout drills, and arcade chaos glitching.',
        'Dual Real-Time Multiplayer: Sub-second multi-lane racetrack with shared glowing opponent carets, synchronized countdowns, and realistic human-cadence AI bots.',
        'Procedural Web Audio Engine: 8 authentic mechanical switch acoustic profiles synthesized via biquad filters and waveform nodes with pitch jitter.',
        'Server Anti-Cheat Telemetry: IKIV variance analysis and neuromuscular thresholding to isolate bots and paste injection attacks in ranked matchmaking.',
        'Esports Tournament Brackets: Automated single-elimination tree generation with direct match duels and instant coin distributions.',
      ],
      outcome: [
        'Shipped a production-grade typing esports SaaS featuring 5 neo-arcade themes, Level 1-100 XP progression, daily/weekly bounties, 30+ achievement badges, and enterprise admin operations.',
      ],
      sections: [
        {
          title: 'Problem',
          content:
            'Most typing platforms (e.g., Monkeytype, TypeRacer) optimize strictly for sterile speed tests, lacking modern esports mechanics, real-time multiplayer depth, RPG progression, and robust anti-cheat validation.\n\nKeyboard Olympics was engineered to transform speed typing into a game-first competitive esport — combining zero-latency keystroke telemetry, real-time WebSocket racing, procedural acoustic mechanical switch synthesis, tournament bracket trees, and server-side Inter-Keystroke Interval Variance (IKIV) heuristics.',
        },
        {
          title: 'Role and Constraints',
          content:
            'Architected and implemented the end-to-end platform: Next.js 15 App Router architecture, procedural Web Audio acoustic synthesizer, Ably WebSocket channels, and Mongoose database design.\n\nEngineered server-side anti-cheat telemetry verification and real-time single-elimination tournament bracket engines handling automated matchmaking and coin payouts.',
        },
        {
          title: 'Approach & Architecture',
          content:
            'Engineered 14 specialized typing disciplines spanning Standard (Classic, Speed Burst, Code Sprint), Arcade (Reverse, Emoji Blitz, Weird Sentences, Sudden Death, Chaos), and Mastery (Zen Flow, Echo Memory blackout, N-Gram drills, Matrix Crunch).\n\nImplemented dual real-time multiplayer racing using Ably WebSockets with presence tracking, synchronized 3-2-1 countdown lockstep, floating opponent carets, and AI bot competitors calibrated from 40 to 120 WPM.\n\nSynthesized 8 hardware-accurate mechanical switch acoustic profiles (Creamy Thock, Clicky Blue, Topre, 8-Bit Synth, Alps Clack, Bubble Pop) using procedural Web Audio API nodes with pitch and volume variance.\n\nBuilt a complete single-elimination tournament engine supporting 4 to 64 competitors, head-to-head match duels, automated round advancement, and prize pool coin distributions.',
        },
        {
          title: 'Highlights',
          content:
            '1. 14 Distinct Game Modes: Comprehensive suite across speed bursts, syntax-accurate code sprints, cognitive memory blackout drills, and arcade chaos glitching.\n\n2. Dual Real-Time Multiplayer: Sub-second multi-lane racetrack with shared glowing opponent carets, synchronized countdowns, and realistic human-cadence AI bots.\n\n3. Procedural Web Audio Engine: 8 authentic mechanical switch acoustic profiles synthesized via biquad filters and waveform nodes with pitch jitter.\n\n4. Server Anti-Cheat Telemetry: IKIV variance analysis and neuromuscular thresholding to isolate bots and paste injection attacks in ranked matchmaking.\n\n5. Esports Tournament Brackets: Automated single-elimination tree generation with direct match duels and instant coin distributions.',
        },
        {
          title: 'Outcome & Status',
          content:
            'Shipped a production-grade typing esports SaaS featuring 5 neo-arcade themes, Level 1-100 XP progression, daily/weekly bounties, 30+ achievement badges, and enterprise admin operations.',
        },
      ],
      figure: {
        src: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1280&auto=format&fit=crop',
        alt: 'Keyboard Olympics Architecture and Multiplayer Racetrack',
        caption: 'Figure 1: Real-time WebSocket racing architecture and anti-cheat telemetry verification pipeline.',
      },
    },
  },
  {
    title: 'InkEcho',
    slug: 'inkecho',
    kicker: 'Realtime Party Game',
    year: '2026',
    role: 'Full-Stack Architect & Lead Engineer',
    imageAlt: 'InkEcho realtime multiplayer drawing canvas, turn rotation state machine, and cinematic reveal carousel',
    description: 'Production-grade realtime multiplayer party game inspired by Telestrations, featuring touch-optimized Bézier drawing canvas, Ably WebSocket synchronization, deterministic turn rotation state machines, and cinematic reveal carousels.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1280&auto=format&fit=crop',
    technologies: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'MongoDB',
      'Prisma ORM',
      'Ably Realtime',
      'Cloudinary',
      'Upstash Redis',
      'Framer Motion',
      'Zustand',
      'Zod',
      'Vitest',
      'Playwright',
    ],
    liveUrl: 'https://inkecho.vercel.app',
    githubUrl: 'https://github.com/manishjangra1/inkecho',
    featured: true,
    isCurrentlyWorking: false,
    published: true,
    order: 4,
    caseStudy: {
      problem: [
        'Web-based party games often suffer from high friction (mandatory account creation, app downloads, complex lobby systems), brittle realtime networking (lost state on mobile tab switches or momentary drops), clunky canvas controls on touch devices, and dated user interfaces.',
        'InkEcho was designed to deliver a zero-friction, ultra-responsive party game platform built with modern web standards — combining 1-click room joining with ephemeral guest sessions, server-authoritative realtime sync via Ably Pub/Sub, mobile-optimized HTML5 drawing canvas with quadratic Bézier smoothing, and a cinematic Framer Motion reveal flow with community voting.',
      ],
      role: [
        'Architected and engineered the end-to-end full-stack platform: Next.js 15 App Router architecture, deterministic turn-rotation game engine, Ably WebSocket synchronization mesh, and HTML5 Bézier drawing canvas.',
        'Implemented dual authentication with 24-hour auto-expiring ephemeral guest JWTs, Cloudinary WebP asset streaming pipeline, Upstash Redis distributed rate limiting, and an admin content moderation suite.',
      ],
      approach: [
        'Structured the application using Clean Architecture and Domain-Driven Design (DDD), decoupling presentation, use-case application services, pure domain state machines, and infrastructure adapters.',
        'Engineered a deterministic turn rotation algorithm (assigned chain index = (i + R) mod N) ensuring players never receive their own work across alternating prompt-writing, drawing, and describing phases.',
        'Implemented sub-100ms global synchronization using Ably WebSocket channels (room, game, and chat) with client presence, synchronized countdown timers, and a 30-second disconnect recovery grace period.',
        'Constructed a touch-first HTML5 drawing canvas with quadratic Bézier stroke smoothing, coordinate normalization across mouse/touch/stylus, BFS flood fill, and direct compressed WebP streaming to Cloudinary.',
        'Built automated testing workflows covering Vitest domain unit tests, Testing Library component tests, and Playwright multi-browser end-to-end 3-player simulated room loops.',
      ],
      highlights: [
        'Zero-Friction Instant Play: 1-click room joining with 6-character room codes (ABC123), private invite links, and 24-hour auto-expiring ephemeral guest JWT sessions.',
        'Deterministic Turn Engine: Mathematical (i + R) mod N chain assignment ensuring no player ever receives their own work across dynamic prompt and drawing phases.',
        'Touch-First Bézier Canvas: Quadratic Bézier curve interpolation with dynamic brush sizes, flood fill, 50-step undo/redo stack, and direct Cloudinary WebP asset streaming.',
        'Sub-100ms Ably Realtime Mesh: Server-authoritative WebSocket synchronization with presence tracking, synchronized countdown lockstep, and 30-second disconnect grace periods.',
        'Cinematic Reveal Carousel: Framer Motion animated slideshow flow with live community reaction voting and exportable game recap histories.',
        'Enterprise Moderation & RBAC: Automated profanity filtering, player reporting queue, Upstash Redis rate limiting, and dedicated admin moderation suite.',
      ],
      outcome: [
        'Shipped a production-grade realtime party game platform combining responsive drawing physics, robust server-authoritative turn sequencing, and seamless multiplayer synchronization deployed on Vercel with MongoDB Atlas and Ably Realtime.',
      ],
      sections: [
        {
          title: 'Executive Summary & Core Concept',
          content:
            'Web-based party games often suffer from high friction (mandatory account creation, app downloads, complex lobby systems), brittle realtime networking (lost state on mobile tab switches or momentary drops), clunky canvas controls on touch devices, and dated user interfaces.\n\nInkEcho delivers a zero-friction, ultra-responsive party game platform built with modern web standards:\n• Instant Join: 1-click room joining with ephemeral guest sessions or persistent user accounts.\n• Server-Authoritative Realtime Sync: Powered by Ably Pub/Sub with heartbeat presence, reconnection resilience, and optimistic client updates.\n• High-Performance Canvas: Mobile-optimized, touch-first HTML5 drawing canvas with quadratic Bézier smoothing, layered undo/redo history, brush sizes, and instant color palettes.\n• Cinematic Reveal Flow: Framer Motion-powered carousel and animated turn progression with community voting and exportable recaps.\n\nThe game loop flows seamlessly from Lobby configuration (timers, round count, player caps, profanity filters) to Round 1 (Write Initial Prompt), Round 2 (Draw Prompt), Round 3 (Describe Drawing), repeating until the full chain completes, culminating in a step-by-step presentation reveal and community vote.',
        },
        {
          title: 'System Architecture & Domain-Driven Design',
          content:
            'InkEcho is architected using Domain-Driven Design (DDD) and Clean Architecture principles, ensuring strict separation of concerns across four discrete layers:\n\n1. Presentation Layer: Next.js 15 App Router pages, Server Components, Zustand stores for tool states, and Framer Motion micro-interactions.\n2. Application Layer: Orchestration use-case services (RoomService, GameService), input validation DTOs with Zod, and authorization gates.\n3. Domain Layer: Pure enterprise business logic, state machine transition rules, and turn rotation math without any dependencies on UI, framework, or database drivers.\n4. Infrastructure Layer: Prisma ORM repositories with MongoDB Atlas, Ably Realtime WebSocket gateway, Cloudinary asset storage, Upstash Redis rate limiter, and Pino structured logging.\n\nKey architectural pillars include server authority over game states and timers, optimistic UI updates with conflict rollback, decoupled realtime event emitters, and snapshot state fetching before subscribing to diff streams on reconnect.',
        },
        {
          title: 'Deterministic Game Engine & State Machine',
          content:
            'The core game loop is governed by a server-authoritative finite state machine transitioning through: LOBBY → PROMPT_WRITE → DRAWING → DESCRIBING → REVEAL_CAROUSEL → VOTING_RECAP → RETURN_TO_LOBBY.\n\nTo ensure dynamic, collision-free gameplay, the turn rotation engine implements a mathematical assignment formula:\nAssigned Chain Index = (i + R) mod N\nwhere N is the number of players, i is the player index, and R is the active round index. This guarantees that in Round 0, Player i creates Chain i; in Round 1, Player i draws Chain (i+1) mod N; and no player ever receives their own submission during the match.\n\nThe engine also handles edge cases gracefully: if a player disconnects or lets the countdown timer expire, the server automatically submits placeholder content or the previous turn data to keep the multiplayer room moving without stalling.',
        },
        {
          title: 'Realtime Synchronization & Ably WebSocket Mesh',
          content:
            'Global multiplayer state synchronization operates with sub-100ms latency via Ably Realtime WebSockets structured into dedicated channels:\n• room:[roomId] — Lobby state, player readiness, settings mutations, host migrations, and room closures.\n• game:[gameId] — Phase transitions, synchronized countdown timers, turn submissions, and reveal progression.\n• chat:[roomId] — Ephemeral in-lobby and spectator text messaging.\n\nClients authenticate via /api/realtime/auth to receive signed TokenRequests before entering presence sets (playerId, name, role). Connection health is continuously monitored via presence heartbeats; if a client drops (e.g. mobile tab backgrounding), status transitions to RECONNECTING with a 30-second grace window, allowing seamless state recovery without kicking the player.',
        },
        {
          title: 'Touch-First Drawing Engine & Asset Pipeline',
          content:
            'The HTML5 drawing canvas is built from the ground up for high responsiveness on mouse, touch, and stylus (Apple Pencil / S-Pen):\n• Smooth Bézier Interpolation: Pointer input events are smoothed using quadratic Bézier curves to eliminate jagged angles during high-speed strokes.\n• Coordinate Normalization: Normalizes coordinates (x_norm = x / width, y_norm = y / height) to guarantee visual parity across varying screen resolutions and aspect ratios.\n• Tooling Suite: Dynamic brush thickness (2px - 48px), matching eraser indicators, BFS flood fill on canvas ImageData, 16 curated vibrant/pastel color swatches, custom HEX color picker, and a 50-step undo/redo snapshot stack.\n\nUpon turn completion, the canvas exports a compressed image/webp binary (0.85 quality) streamed directly to Cloudinary under inkecho/drawings. The resulting CDN URI and public_id are stored in the GameTurn document in MongoDB.',
        },
        {
          title: 'Dual Authentication & Session Management',
          content:
            'InkEcho accommodates both casual party participants and returning power users through a dual-authentication strategy:\n\n1. Guest Mode: Zero-friction onboarding where users enter a display name and immediately join rooms. An ephemeral JWT is signed via jose, stored in an HttpOnly cookie, and tracked with MongoDB TTL indexes for automatic garbage collection after 24 hours.\n2. Registered Mode: Authenticated via NextAuth.js (supporting Email/Password credentials with bcryptjs hashing and Google/GitHub OAuth). Registered accounts track lifetime statistics (games played, win rates, chains completed), game match histories, and unlockable achievement badges.',
        },
        {
          title: 'Security, Moderation & Admin Operations',
          content:
            'Comprehensive safety and moderation safeguards are embedded throughout the stack:\n• Strict Validation: Every API route and Server Action payload is validated with runtime Zod schemas.\n• Rate Limiting: Distributed token-bucket rate limiting via Upstash Redis REST API prevents DDoS and lobby spam.\n• Content Safety: Integrated profanity wordlist filtering sanitizes text prompts and user display names against harassment and XSS attacks.\n• Reporting Pipeline: In-game reporting tools allow players to flag toxic text or inappropriate drawings, immediately routing submissions to the moderation queue.\n• Admin Portal: Protected by Role-Based Access Control (RBAC), the /admin dashboard allows verified administrators to review reported content, ban abusive players, and curate starter prompt pools across FUNNY, OBJECT, ACTION, and POP_CULTURE categories.',
        },
        {
          title: 'Testing, Quality Assurance & Production Infrastructure',
          content:
            'InkEcho maintains rigorous quality assurance across all architectural layers:\n• Vitest: Unit tests for turn rotation math, state machine transitions, and countdown timer deadline calculators.\n• React Testing Library: Component integration tests for lobby controls, canvas toolbar interactions, and reveal carousels.\n• Playwright: Multi-browser end-to-end integration tests simulating 3-player concurrent room loops from lobby creation to voting recap.\n\nProduction infrastructure is hosted on Vercel with Serverless and Edge route optimization, MongoDB Atlas replica set clusters for transactional integrity, Ably Realtime edge network for WebSocket distribution, Cloudinary CDN for media delivery, and Vercel Cron jobs running /api/cron/cleanup every 10 minutes to prune stale rooms and expired guest records.',
        },
        {
          title: 'Highlights',
          content:
            '1. Zero-Friction Instant Play: 1-click room joining with 6-character room codes (ABC123), private invite links, and 24-hour auto-expiring ephemeral guest JWT sessions.\n\n2. Deterministic Turn Engine: Mathematical (i + R) mod N chain assignment ensuring no player ever receives their own work across dynamic prompt and drawing phases.\n\n3. Touch-First Bézier Canvas: Quadratic Bézier curve interpolation with dynamic brush sizes, flood fill, 50-step undo/redo stack, and direct Cloudinary WebP asset streaming.\n\n4. Sub-100ms Ably Realtime Mesh: Server-authoritative WebSocket synchronization with presence tracking, synchronized countdown lockstep, and 30-second disconnect grace periods.\n\n5. Cinematic Reveal Carousel: Framer Motion animated slideshow flow with live community reaction voting and exportable game recap histories.\n\n6. Enterprise Moderation & RBAC: Automated profanity filtering, player reporting queue, Upstash Redis rate limiting, and dedicated admin moderation suite.',
        },
        {
          title: 'Outcome & Status',
          content:
            'Shipped a production-grade realtime party game platform combining responsive drawing physics, robust server-authoritative turn sequencing, and seamless multiplayer synchronization deployed on Vercel with MongoDB Atlas and Ably Realtime.',
        },
      ],
      figure: {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1280&auto=format&fit=crop',
        alt: 'InkEcho Realtime Architecture and Canvas State Machine',
        caption: 'Figure 1: Deterministic turn rotation state machine and Ably Realtime pub/sub synchronization pipeline.',
      },
    },
  },
  {
    title: 'The Internet Throne',
    slug: 'the-internet-throne',
    kicker: 'Persistent Global Esports',
    year: '2026',
    role: 'Lead Architect & Full-Stack Engineer',
    imageAlt: 'The Internet Throne live monarch visualizer, real-time battle arena, and Hall of Kings historical archive',
    description: 'Persistent real-time global competitive entertainment platform where exactly one person rules the internet at any second, featuring CAS concurrency locks, Ably WebSocket broadcasting, deterministic mini-game engines, and immutable historical archives.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1280&auto=format&fit=crop',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'MongoDB',
      'Ably Realtime',
      'Auth.js',
      'Zod',
      'Vitest',
      'Playwright',
    ],
    liveUrl: 'https://theinternetthrone.com',
    githubUrl: 'https://github.com/manishjangra1/theinternetthrone',
    featured: true,
    isCurrentlyWorking: false,
    published: true,
    order: 5,
    caseStudy: {
      problem: [
        'Digital competitive games frequently dilute prestige through infinite server shards, pay-to-win mechanics, and ephemeral leaderboard resets where victories carry no lasting historical weight.',
        'The Internet Throne was designed around absolute digital scarcity and immutable prestige — creating a single global Throne where exactly one person rules the internet at any given second, defended through skill-based mini-games and recorded permanently into the Hall of Kings.',
      ],
      role: [
        'Architected and implemented the full-stack system: Next.js 16 App Router monolith, multi-document ACID Compare-And-Swap (CAS) concurrency model, server-authoritative anti-cheat engine, and Ably Realtime broadcast mesh.',
        'Engineered 3 deterministic skill mini-game engines (Typing Arena, Reaction Chamber, Memory Matrix) with millisecond-precision server-side scoring and false-start prevention.',
      ],
      approach: [
        'Engineered a singleton CAS locking mechanism on the global Throne document with monotonically increasing version counters, eliminating race conditions and preventing dual-monarch splits.',
        'Built a server-authoritative zero-trust validation pipeline where clients submit raw keystroke and timing transcripts, re-simulated server-side against cryptographic seeds before crowning.',
        'Constructed sub-100ms global state distribution via Ably Realtime channels (throne:global, battle:<id>, feed:global) with automated REST polling fallback.',
        'Implemented dual player identity with cookie-hashed guest sessions allowing immediate friction-free challenges and one-click account claiming into Auth.js permanent profiles.',
        'Created an immutable append-only historical database archiving every reign, duration, defense count, and dethroning battle into the Hall of Kings.',
      ],
      highlights: [
        'Absolute Global Scarcity: Exactly one global Throne document across the entire internet; zero duplicate shards or pay-to-win shields.',
        'Atomic CAS Concurrency: Monotonically increasing version counter with single-contender lock preventing race conditions during viral traffic spikes.',
        'Server-Authoritative Anti-Cheat: Deterministic re-simulation, cryptographic nonces, and biometric threshold validation (WPM < 250, Reaction > 80ms).',
        '3 Skill Mini-Game Disciplines: Typing Arena, Reaction Chamber, and Memory Matrix with authoritative server evaluation and tie-breaker mechanics.',
        'Real-Time Broadcast Mesh: Sub-second global event notifications via Ably WebSockets for dethroning events, live battle states, and spectator feeds.',
        'Immutable Hall of Kings: Permanent append-only digital archive recording every reign, duration, defense tally, and dethroning challenger.',
      ],
      outcome: [
        'Shipped a production-grade high-concurrency competitive platform featuring sub-100ms real-time battle distribution, zero-collision CAS state transitions, and permanent historical reign archives.',
      ],
      sections: [
        {
          title: 'Executive Summary & Core Concept',
          content:
            'The Internet Throne is a persistent, real-time, global competitive platform centered around a single, scarce digital status object: The Throne.\n\n• At any given second in time, exactly one person rules the internet.\n• Any visitor (guest or registered user) can step up and challenge the sitting King or Queen to a real-time, skill-based mini-game (Typing, Reaction Speed, or Memory).\n• If the Challenger wins, the incumbent ruler is instantly dethroned, the Challenger is crowned, and the event is broadcast globally in real time.\n• If the Defender prevails, their defense count increments, their reign continues, and their legacy grows.\n• Every reign, defense, score, and dethroning is archived forever into the Hall of Kings.\n\nCore psychological pillars center on absolute scarcity (one global throne that cannot be duplicated or split), skill-based legitimacy (power earned strictly through human skill, zero pay-to-win), immediate curiosity ("Who rules the internet right now?"), and permanent historical immortality.',
        },
        {
          title: 'System Architecture & Golden Engineering Tenets',
          content:
            'The platform is built as a high-performance, edge-ready monolith adhering to Five Golden Engineering Tenets:\n\n1. Server Authority (Zero-Trust Client): Clients submit raw inputs and millisecond timestamps; the server computes scores, validates accuracy, checks physics, and declares outcomes.\n2. MongoDB Decides, Ably Distributes: Database transactions are the authoritative single source of truth. Real-time messages are published strictly after database ACID commits succeed.\n3. Compare-And-Swap (CAS) Concurrency: The Throne document uses a strict monotonically increasing version counter and activeBattleId lock to guarantee zero race conditions or dual-monarch splits.\n4. Permanent Historical Immutability: Ended reigns, historical battles, and audit logs are append-only and immutable.\n5. Seamless Guest-to-User Identity Conversion: First-time players can battle immediately as Guests without signup barriers, retaining the ability to claim and merge their prestige into a permanent Auth.js account later.\n\nThe application layers cleanly decouple UI controllers (/api/v1/battles, /api/v1/throne, /api/v1/hall), Application Services (ThroneService, BattleService, AntiCheatEngine, ProgressionService), and MongoDB Repositories.',
        },
        {
          title: 'Database Architecture & Data Models',
          content:
            'The persistence layer is modeled in MongoDB using multi-document ACID transactions:\n\n• thrones Collection (Singleton Document): _id: "global", state (OCCUPIED, VACANT, MAINTENANCE), currentRulerId, currentReignId, activeBattleId (mutex lock for ongoing battles), defenseCount, bountyPoints, seasonId, and version (CAS lock counter).\n• reigns Collection (Immutable Reign Archive): _id, throneId, rulerId, rulerType (user | guest), startedAt, endedAt, endReason (DETHRONED | ADMIN | MAINTENANCE_RESET), defenseCount snapshot, bountyPointsSnapshot, and endedByBattleId.\n• battles Collection (Battle State Engine): _id, target, challengeType (typing | reaction | memory), state (CREATED through COMPLETED/CANCELLED/DISPUTED), challengerId, defenderId, throneVersionAtCreate, cryptographic seeds, participant submissions/scores, outcome, and server-enforced playDeadlineAt.\n• Supporting Collections: users (credentials & OAuth bindings), guest_identities (cookie-hashed sessions), profiles, audit_logs (security and anti-cheat trail), creator_thrones, and world_kingdoms.',
        },
        {
          title: 'Throne Concurrency, CAS State Machine & Rulebook',
          content:
            'Throne state transitions are governed by strict mathematical and concurrency rules:\n\n• TR-010 (Cardinality): Exactly one global Throne singleton document (_id: "global").\n• TR-040 (Concurrency & Single-Contender Lock): At most one active Throne Battle can occur at any time. Any concurrent challenge requests receive 409 CONFLICT ("Throne is Contested").\n• TR-050 (Cooldowns): After a battle completes, the challenger must wait 60,000ms before challenging the same ruler again.\n• TR-070 (Defense Count): Increments atomically by +1 on each successful defense; resets to 0 when a new ruler takes the Throne.\n• TR-080 (Bounty Prestige): Bounty Points = ⌊Reign Duration (ms) / 60000⌋ + (Defense Count × 10).\n• TR-090 (Defender Fatigue Tier): Fatigue Tier = min(3, ⌊Defense Count / 5⌋), adding +15s challenger cooldown per tier to prevent monarch burnout.\n• TR-120 (Incumbent Advantage in Ties): If challenger and defender post identical validated scores, the Defender wins.\n• TR-160 (Atomic Dethroning): Crown handoff occurs in a single multi-document ACID transaction verifying expected version.',
        },
        {
          title: 'Competitive Mini-Game Disciplines & Scoring Engines',
          content:
            'Power is contested across 3 server-authoritative skill disciplines:\n\n1. Typing Arena (typing): Server provides a deterministic prompt seed (promptId). Both players type against a 60-second play window. The server parses raw keystroke transcripts, validates accuracy (minimum 85% threshold), and computes official WPM (client-reported WPM is ignored).\n2. Reaction Chamber (reaction): 5 randomized stimulus trials within a 45-second window. The server validates cryptographic trigger nonces. Responses earlier than stimulus triggers are flagged as false starts. Valid latency window is 80ms - 1500ms, and lowest mean reaction time wins.\n3. Memory Matrix (memory): Server generates an 8-symbol random sequence. A timed encode phase is followed by a timed recall phase (90-second play window). The server validates exact position matches; ties are broken by submission speed, followed by incumbent advantage.',
        },
        {
          title: 'Security, Anti-Cheat Shield & Resilience',
          content:
            'A multi-layered defense shield ensures competitive integrity:\n\n• Cryptographic Challenge Nonces: Seeds and stimulus sequences are generated server-side during the STARTING countdown and emitted exclusively to active participants.\n• Physics & Biometrics Sanity Checks: Input velocities (WPM < 250, Reaction Time > 80ms) are validated to eliminate bots and macros.\n• Deterministic Re-Simulation: Server re-executes player inputs against the puzzle rules to verify claimed scores.\n• Server-Enforced Timeouts: Strict playDeadlineAt timestamps prevent offline manipulation.\n• Rate-Limiting & Dispute Isolation: Token bucket rate limiters protect API gates, while suspicious runs are routed to DISPUTED status for audit.\n• Resilient Fallback: If Ably WebSocket connectivity drops, clients automatically fall back to REST polling (/api/v1/throne).',
        },
        {
          title: 'Identity Lifecycle & Growth Roadmap',
          content:
            'The platform features a frictionless user onboarding and progression model:\n\n• Dual Identity: Players can jump directly into battles as Guests via cookie-hashed sessions. Upon registration or OAuth sign-in (GitHub, Google, Discord via Auth.js), players can merge their full match history, reign archives, defense tallies, and trophies into a permanent verified account.\n• Product Roadmap:\n  - Phase 1 (MVP Core — Complete): Single Throne architecture, 3 mini-game disciplines, CAS concurrency locks, Ably real-time broadcast mesh, and guest identity flow.\n  - Phase 2 (Growth & Community): Hall of Kings historical viewer, Profile claiming, Achievements, and automated seasonal soft resets.\n  - Phase 3 (Creator & Scale): Creator custom thrones, regional territory conquest (World Map), and cosmetic throne customizations.',
        },
        {
          title: 'Testing, Quality Assurance & Engineering Standards',
          content:
            'The codebase enforces comprehensive quality gates across all layers:\n\n• Vitest: Unit tests for domain state machine transitions, CAS version counters, fatigue tier math, and anti-cheat verification.\n• Integration Tests: Repository transactions verifying atomic MongoDB multi-document commits during simultaneous challenge requests.\n• Playwright: End-to-end multi-browser test suites simulating concurrent challenger queues, real-time battle play, and dethroning broadcasts.',
        },
        {
          title: 'Highlights',
          content:
            '1. Absolute Global Scarcity: Exactly one global Throne document across the entire internet; zero duplicate shards or pay-to-win shields.\n\n2. Atomic CAS Concurrency: Monotonically increasing version counter with single-contender lock preventing race conditions during viral traffic spikes.\n\n3. Server-Authoritative Anti-Cheat: Deterministic re-simulation, cryptographic nonces, and biometric threshold validation (WPM < 250, Reaction > 80ms).\n\n4. 3 Skill Mini-Game Disciplines: Typing Arena, Reaction Chamber, and Memory Matrix with authoritative server evaluation and tie-breaker mechanics.\n\n5. Real-Time Broadcast Mesh: Sub-second global event notifications via Ably WebSockets for dethroning events, live battle states, and spectator feeds.\n\n6. Immutable Hall of Kings: Permanent append-only digital archive recording every reign, duration, defense tally, and dethroning challenger.',
        },
        {
          title: 'Outcome & Status',
          content:
            'Shipped a production-grade high-concurrency competitive platform featuring sub-100ms real-time battle distribution, zero-collision CAS state transitions, and permanent historical reign archives.',
        },
      ],
      figure: {
        src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1280&auto=format&fit=crop',
        alt: 'The Internet Throne Architecture and CAS Battle State Machine',
        caption: 'Figure 1: Compare-And-Swap (CAS) concurrency lock pipeline and Ably Realtime broadcast architecture.',
      },
    },
  },
  {
    title: 'PostgresD',
    slug: 'postgresd',
    kicker: 'Desktop Database Studio',
    year: '2026',
    role: 'Lead Systems & Full-Stack Architect',
    imageAlt: 'PostgresD desktop database studio interface, Prisma Studio-style relational navigation, and virtualized data grid',
    description: 'Modern, lightweight desktop PostgreSQL client and database management studio built with Tauri v2, React 19, and Rust, featuring in-place transactional editing, automatic foreign-key relational graph navigation, Monaco SQL workspace with active cancellation, and OS-native keychain credential security.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1280&auto=format&fit=crop',
    technologies: [
      'Tauri v2',
      'Rust',
      'React 19',
      'TypeScript',
      'PostgreSQL',
      'SQLx',
      'Tokio',
      'Tailwind CSS',
      'Zustand',
      'TanStack Query',
      'TanStack Virtual',
      'Monaco Editor',
    ],
    liveUrl: 'https://github.com/manishjangra1/PostgresD',
    githubUrl: 'https://github.com/manishjangra1/PostgresD',
    featured: true,
    isCurrentlyWorking: false,
    published: true,
    order: 6,
    caseStudy: {
      problem: [
        'Traditional database clients (pgAdmin, DBeaver, DataGrip) suffer from high memory overhead (Electron or JVM footprints exceeding 400MB+ RAM), cluttered interfaces with deep submenus, and cumbersome workflows for simple relational traversals and CRUD mutations.',
        'PostgresD was engineered to deliver a blazingly fast, lightweight desktop database studio built with Tauri v2 and native Rust — combining minimal memory consumption (~45MB–80MB RAM), Prisma Studio-inspired zero-JOIN relational navigation, transactional in-place editing, and OS-level keychain security.',
      ],
      role: [
        'Architected and implemented the end-to-end native desktop application: Tauri v2 IPC bridge, asynchronous Rust backend services, SQLx connection pool caching, and React 19 frontend design system.',
        'Engineered the dynamic PostgreSQL type decoding engine, parameterized filter compiler, atomic transaction mutation engine (`apply_changes`), and Monaco SQL active cancellation subsystem.',
      ],
      approach: [
        'Decoupled the architecture into a React 19 virtualized webview frontend communicating across high-speed Tauri IPC commands to a native multi-threaded Tokio Rust backend.',
        'Implemented an interactive data grid with in-memory dirty change staging, visual pending change diff drawer, and single-transaction atomic batch commits (`BEGIN ... COMMIT`) with complete rollback protection.',
        'Engineered automatic foreign key badge inspection and dynamic reverse-relation count columns (`Table []`) by querying `information_schema` constraint graphs for frictionless parent-child traversals.',
        'Integrated a Monaco SQL code editor with real-time execution timers and active query cancellation using PostgreSQL backend PID registration (`SELECT pg_cancel_backend(pid)`).',
        'Built a streaming CSV export engine using Rust futures streams and `csv::Writer` to export gigabyte-scale datasets directly to disk with UTF-8 BOM injection for Excel compatibility.',
      ],
      highlights: [
        'Native Speed & Minimal Footprint: Tauri v2 + Rust architecture consuming ~45MB–80MB baseline RAM compared to 400MB+ for Electron-based clients.',
        'Prisma Studio-Style Relational Navigation: 1-click foreign key inspection and incoming sub-relation virtual count columns (Table []) for zero-JOIN traversals.',
        'Transactional In-Place Editing: Double-click inline cell edits staged in memory with diff review drawer and atomic multi-row transaction commits.',
        'OS-Native Keychain Security: Passwords stored securely in macOS Keychain, Windows Credential Manager, and Linux Secret Service via keyring-rs.',
        'Monaco SQL & Active Cancellation: Full-featured SQL workspace with asynchronous execution and non-blocking pg_cancel_backend query aborts.',
        'Virtualized Grid & Streaming Exports: 10,000+ row virtualized rendering at 60 FPS and direct-to-disk streaming CSV exports with UTF-8 BOM.',
      ],
      outcome: [
        'Shipped a production-ready, open-source cross-platform desktop PostgreSQL management studio distributed across macOS (.dmg, .app), Windows (.msi, .exe), and Linux (.deb, AppImage).',
      ],
      sections: [
        {
          title: 'Executive Summary & Product Vision',
          content:
            'Traditional database clients (such as pgAdmin, DBeaver, or DataGrip) often suffer from high memory overhead (Electron or Java VM footprints exceeding 400MB+ RAM), cluttered user interfaces with hundreds of nested submenus, and complex workflows for standard CRUD operations.\n\nPostgresD was engineered to solve these pain points by offering:\n• Minimal Memory Footprint: Powered by Tauri v2 and Rust instead of Chromium/Electron, consuming a fraction of the RAM and CPU (~45MB–80MB baseline RAM).\n• Prisma Studio-Inspired Relational Navigation: Automatic detection of foreign keys and reverse references, enabling developers to traverse parent and child relations without manually writing JOIN queries.\n• Instant In-Place Editing: Double-click cell modifications, staging dirty edits with a safety review drawer before batch committing them inside an atomic transaction.\n• Native Security: Passwords are never stored in plain-text localStorage or JSON configuration files; they are delegated to native OS Keychains (macOS Keychain, Windows Credential Manager, Linux Secret Service).\n• Developer Ergonomics: Integrated Monaco SQL editor with active query cancellation, stream-based export pipelines, dark/light dynamic theme switching, and pixel-perfect header/footer symmetry.',
        },
        {
          title: 'High-Level System Architecture & IPC Pipeline',
          content:
            'PostgresD adopts a decoupled architecture separating the desktop presentation layer from native systems programming:\n\n1. Presentation Layer (React 19, TypeScript, TailwindCSS v4): Renders the virtualized data grid, Monaco SQL editor, relation overlays, and connection management UI.\n2. Tauri IPC Bridge: Type-safe command routing executing asynchronous invoke() requests.\n3. Native Rust Backend (Tokio & SQLx): High-performance asynchronous execution engine divided into modular subsystems:\n   - Command Handlers: IPC request routers validating payloads.\n   - Connection Manager: Thread-safe PgPool connection pool caching per database ID.\n   - Query Registry: Mutex-guarded tracking of active PostgreSQL backend PIDs for non-blocking query cancellation.\n   - Metadata Extractor: Introspects information_schema and pg_catalog for schemas, tables, columns, indexes, and foreign key graphs.\n   - Dynamic Executor: Handles generic PostgreSQL type decoding and atomic transaction lifecycles.\n   - Keyring Engine: Interfaces with native OS credential vaults for secure password storage.\n4. PostgreSQL Instance: Direct async TCP/TLS connections to cloud or local PostgreSQL databases (versions 12 through 17+).',
        },
        {
          title: 'Interactive Data Grid & Transactional In-Place CRUD',
          content:
            'Data manipulation in PostgresD blends instant UI responsiveness with strict transactional safety:\n\n• Double-Click Cell Editing: Double-clicking any non-primary-key cell turns it into an active inline editor matching its schema type.\n• Dirty State Accumulator: Edits are staged in memory as PendingChange objects without triggering immediate destructive database writes. Dirty cells are visually highlighted.\n• Pending Changes Review Drawer: A slide-over panel displays the exact structured diff of pending insert, update, and delete operations with target primary keys and new values.\n• Atomic Batch Commit (apply_changes): Commits all pending changes within a single PostgreSQL transaction (BEGIN ... COMMIT). If any foreign key or check constraint fails, the entire transaction is rolled back (ROLLBACK) and the exact PostgreSQL error message is displayed.\n• New Record Modal & Batch Deletion: Auto-generates modal input forms based on column types and nullable flags, and supports multi-row checkbox selection for batch deletions.\n• Virtualized Performance: Utilizes @tanstack/react-virtual to render only visible DOM nodes, enabling smooth 60 FPS scrolling across 10,000+ row datasets with dynamic drag-to-resize columns.',
        },
        {
          title: 'Relational Graph Previews & Sub-Relation Navigation',
          content:
            'PostgresD revolutionizes relational database exploration by eliminating manual SQL JOIN writing for standard entity navigation:\n\n• Outgoing Foreign Key Badges: Foreign key columns display a distinct badge with an external link indicator. Clicking the badge extracts the foreign key value and queries the referenced parent record in real time.\n• Incoming Sub-Relation Synthesizer (Table []): PostgresD inspects the information_schema constraint graph to find all other tables referencing the active table. It synthesizes dynamic virtual count columns (e.g. orders [], reviews []).\n• Dual-Layout Reference Overlay Sheet:\n  - Single Parent Record: Rendered as a clean vertical key-value attribute inspection sheet.\n  - Multiple Child Records: Rendered as a nested, horizontally scrollable relational data table allowing sub-level filtering and inspection.',
        },
        {
          title: 'Monaco SQL Workspace & Asynchronous Query Cancellation',
          content:
            'For complex analytical workflows, PostgresD provides an integrated SQL workspace:\n\n• Full Monaco Editor Integration: Complete SQL syntax highlighting, auto-completion, multi-cursor editing, bracket matching, and multi-tab side-by-side query workspaces.\n• Asynchronous Tokio Execution: Queries run on independent Tokio worker threads, keeping the desktop UI responsive at all times.\n• Execution Telemetry: Displays accurate millisecond execution timers (execution_time_ms) and total affected row counts.\n• Active Query Cancellation (pg_cancel_backend): When a query begins, its PostgreSQL backend PID is registered in a thread-safe QueryRegistry. Clicking "Cancel Query" executes SELECT pg_cancel_backend(pid) on an independent connection, terminating long-running queries instantly without severing the client connection.',
        },
        {
          title: 'Rust Backend Architecture & Dynamic Type Decoding',
          content:
            'Because runtime table structures are dynamic, SQLx cannot use compile-time macros. PostgresD implements a generic type decoder (pg_row_to_json) matching on PostgreSQL column type OIDs:\n\n• Booleans: BOOL → serde_json::Value::Bool\n• Integers & Floats: INT2, INT4, INT8, FLOAT4, FLOAT8 → serde_json::Value::Number\n• Strings & Text: VARCHAR, CHAR, TEXT, BPCHAR → serde_json::Value::String\n• UUIDs: Decoded via uuid::Uuid to canonical hyphenated strings\n• JSON / JSONB: Parsed directly into nested serde_json::Value objects\n• Date & Timestamps: TIMESTAMPTZ, TIMESTAMP, DATE, TIME decoded via chrono to ISO-8601 strings\n• Arrays & Enums: Homogeneous vector decoding with fallback UTF-8 byte conversion.\n\nDynamic filter expressions are compiled safely using parameterized SQL ($1, $2, ...) and identifier sanitization via quote_ident() to prevent SQL injection.',
        },
        {
          title: 'Multi-Format Streaming Export Engine',
          content:
            'PostgresD includes a high-throughput export pipeline capable of exporting selected rows or entire tables:\n\n• JSON & CSV Formats: Cleanly serializes records while stripping UI-only virtual relation columns.\n• Direct-to-Disk Streaming: Full-table exports stream asynchronously from PostgreSQL via sqlx::query().fetch() directly into a csv::Writer backed by std::fs::File, exporting gigabyte-scale datasets without hitting webview memory limits.\n• Excel Compatibility: Automatically injects a UTF-8 Byte Order Mark (\\uFEFF) at the start of CSV files, guaranteeing international characters render correctly in Microsoft Excel on Windows and macOS.',
        },
        {
          title: 'Security, Isolation & OS-Native Keychains',
          content:
            'Security is enforced through native operating system integration and strict input hygiene:\n\n• Zero Plain-Text Credentials: Password credentials are never saved in local storage or unencrypted config files. They are stored in native OS credential vaults (macOS Keychain, Windows Credential Manager, Linux Secret Service) via keyring-rs.\n• Parameterized Query Execution: All filter builder queries and mutation statements use parameterized SQL ($1, $2), eliminating SQL injection vectors.\n• Identifier Sanitization: Schema, table, and column names are wrapped with quote_ident() to prevent identifier injection.\n• Sandboxed Desktop Runtime: The webview runs with minimal privileges restricted by Tauri v2 capability configuration files.',
        },
        {
          title: 'Testing Environment, CI/CD & Cross-Platform Distribution',
          content:
            'The project includes a comprehensive local Docker development environment and multi-platform build pipeline:\n\n• Docker Relational Test Suite: Provides a complete e-commerce test schema (users, categories with self-referencing hierarchies, products, orders, order items, reviews, and JSONB audit logs).\n• Automated GitHub Actions CI/CD: Multi-target release workflow triggering on version tags to compile universal binaries for macOS (.dmg, .app), Windows (x86_64 NSIS .msi, .exe), and Linux (.deb, AppImage) with automated GitHub release drafting.',
        },
        {
          title: 'Highlights',
          content:
            '1. Native Speed & Minimal Footprint: Tauri v2 + Rust architecture consuming ~45MB–80MB baseline RAM compared to 400MB+ for Electron-based clients.\n\n2. Prisma Studio-Style Relational Navigation: 1-click foreign key inspection and incoming sub-relation virtual count columns (Table []) for zero-JOIN traversals.\n\n3. Transactional In-Place Editing: Double-click inline cell edits staged in memory with diff review drawer and atomic multi-row transaction commits.\n\n4. OS-Native Keychain Security: Passwords stored securely in macOS Keychain, Windows Credential Manager, and Linux Secret Service via keyring-rs.\n\n5. Monaco SQL & Active Cancellation: Full-featured SQL workspace with asynchronous execution and non-blocking pg_cancel_backend query aborts.\n\n6. Virtualized Grid & Streaming Exports: 10,000+ row virtualized rendering at 60 FPS and direct-to-disk streaming CSV exports with UTF-8 BOM.',
        },
        {
          title: 'Outcome & Status',
          content:
            'Shipped a production-ready, open-source cross-platform desktop PostgreSQL management studio distributed across macOS (.dmg, .app), Windows (.msi, .exe), and Linux (.deb, AppImage).',
        },
      ],
      figure: {
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1280&auto=format&fit=crop',
        alt: 'PostgresD Desktop Architecture and Virtualized Data Grid',
        caption: 'Figure 1: Tauri v2 IPC architecture, native Rust connection pooling, and virtualized data grid pipeline.',
      },
    },
  },
  {
    title: 'Sahaayikaa',
    slug: 'sahaayikaa',
    kicker: "Women's Emotional Support Network",
    year: '2026',
    role: 'Full-Stack Architect & Lead Engineer',
    imageAlt: 'Sahaayikaa empathetic sanctuary feed, voice confession transcription, and AI emotional support companion',
    description: 'Empathetic, privacy-first emotional support network and safe sanctuary for women featuring dual-identity storytelling, in-browser voice confessions with Whisper-1 transcription, 24/7 AI emotional companion, timezone-aware daily check-ins, and triple-tier crisis intercept moderation.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1280&auto=format&fit=crop',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'MongoDB',
      'Mongoose 9',
      'OpenAI GPT-4o-mini',
      'OpenAI Whisper-1',
      'Cloudinary',
      'Framer Motion',
      'Zustand',
      'TanStack Query',
      'Recharts',
    ],
    liveUrl: 'https://sahaayikaa.com',
    githubUrl: 'https://github.com/manishjangra1/sahaayikaa',
    featured: true,
    isCurrentlyWorking: false,
    published: true,
    order: 7,
    caseStudy: {
      problem: [
        'Mainstream social media platforms are optimized for engagement through vanity metrics (likes, follower counts, algorithmic outrage, and public exposure), inducing anxiety rather than relief for women facing deep personal challenges like domestic distress, burnout, postpartum anxiety, societal judgment, or workplace harassment.',
        'Sahaayikaa was engineered as a zero-judgment emotional sanctuary — pairing uncompromised privacy and dual anonymity with affirmative empathy reactions, in-browser voice confessions with Whisper-1 transcription, non-clinical AI companionship, and timezone-aware emotional health tracking.',
      ],
      role: [
        'Architected and implemented the complete full-stack web and PWA application: Next.js 16 App Router architecture, Mongoose 9 database caching, Cloudinary media pipeline, and OpenAI Whisper/GPT-4o-mini integrations.',
        'Engineered the timezone-aware streak calculation engine, audio voice confession recorder pipeline, private therapeutic journal with longitudinal sentiment analytics, and triple-tier crisis intercept moderation framework.',
      ],
      approach: [
        'Structured the platform around a privacy-first identity architecture allowing seamless toggling between pseudonymous profiles and 100% pure anonymous publication where author metadata is completely severed on the server.',
        'Replaced toxic engagement loops with affirmative reactions (🫂 Hugs, 💜 Not Alone, ✨ Empathy) and interactive community polls with dynamic animated vote distribution bars.',
        'Built an in-browser audio recording pipeline using Web MediaRecorder, streaming compressed WebM audio to Cloudinary and generating synchronous transcripts via OpenAI Whisper-1.',
        'Designed an encrypted therapeutic journal featuring automated AI emotional reflection insights and longitudinal Healing Score tracking visualized via Recharts.',
        'Implemented a triple-tier safety guardrail combining local heuristic keyword matching, OpenAI semantic moderation, and automatic crisis detection with immediate 24/7 emergency helpline intercepts.',
      ],
      highlights: [
        'Zero Vanity Metrics & Dual Anonymity: Uncompromised identity protection with heartfelt 🫂 Hugs, 💜 Not Alone, and ✨ Empathy reactions.',
        'Voice Confessions with Whisper-1: In-browser WebM audio recording with synchronous Cloudinary CDN streaming and OpenAI transcript generation.',
        'Triple-Tier Safety & Crisis Intercept: Heuristic, semantic, and automated crisis hotline intercept protecting vulnerable users.',
        'Timezone-Aware Streak Engine: Client-offset calendar normalization guaranteeing accurate daily wellness streaks globally.',
        'Private Journal & AI Healing Index: Encrypted private diaries with GPT-4o-mini therapeutic insights and Recharts mood analytics.',
        'Privacy Shield & Panic Button: Quick-escape browser redirects, sensitive content blurs, and dynamic session watermarking.',
      ],
      outcome: [
        'Shipped a production-ready emotional wellness sanctuary for women featuring zero-judgment community storytelling, AI-assisted reflections, and end-to-end privacy guarantees.',
      ],
      sections: [
        {
          title: 'Executive Summary & Core Mission',
          content:
            'Mainstream social media platforms are optimized for engagement through vanity metrics (likes, follower counts, algorithmic outrage, and public exposure). For women facing deep personal challenges—such as domestic distress, burnout, postpartum anxiety, societal judgment, or workplace harassment—these environments induce anxiety rather than relief. The risk of identity exposure and toxic reactions discourages authentic vulnerability.\n\nSahaayikaa is built as a zero-judgment emotional sanctuary combining:\n1. Uncompromised Privacy: Toggle between pseudonymity and complete anonymity on every post, comment, or poll vote.\n2. Empathy-Driven Feedback: Replaces superficial "likes" with heartfelt reactions (hugs, notAlone, empathy).\n3. Voice Confessions: An in-browser voice recorder that streams audio to cloud storage and transcribes thoughts in real time via OpenAI Whisper-1.\n4. Therapeutic AI Assistance: Non-clinical, empathetic companion (GPT-4o-mini) providing gentle guidance and safe crisis-intercept mechanisms.\n5. Private Journaling & Mood Analytics: End-to-end private diary that analyzes emotional states and tracks longitudinal healing scores and streaks.',
        },
        {
          title: 'System Architecture & Full-Stack Flow',
          content:
            'Sahaayikaa is built on Next.js 16 App Router leveraging React 19 concurrent features, Mongoose 9 singleton connection caching, Cloudinary media storage, and OpenAI intelligence services:\n\n• Frontend Layer: React 19 with Tailwind CSS v4, custom HSL design tokens, Framer Motion animations, Recharts data visualizers, Zustand global stores (useAppStore, usePrivacyStore), and TanStack React Query v5.\n• Backend & API Layer: Next.js Server Route Handlers, JWT cookie authentication (sahaayikaa_token in HttpOnly/Secure cookies), and bcryptjs password hashing.\n• Storage & AI Cloud: MongoDB Atlas document database, Cloudinary media CDN, and OpenAI GPT-4o-mini, Whisper-1, and Moderation models.\n\nFor voice confessions, the client records compressed audio via the MediaRecorder API, dispatches multipart streams to /api/upload for Cloudinary CDN storage, transcribes the speech via OpenAI Whisper-1, screens for toxicity via the Moderation API, and commits the unified document to MongoDB.',
        },
        {
          title: 'Anonymous Storytelling Feed & Empathy Ecosystem',
          content:
            'The platform completely reimagines community social dynamics by prioritizing vulnerability over vanity metrics:\n\n• Dual Identity Mode: Users can post under their chosen pseudonymous handle (e.g. Sunflower_Soul) or check "100% Pure Anonymous", which completely wipes the author payload on the server and renders the creator as "Ally".\n• Zero Vanity Metrics: The platform omits view counters, follower lists, and generic "Likes", replacing them with affirmative emotional resonance:\n  - 🫂 Hugs: Virtual emotional warmth and embrace.\n  - 💜 Not Alone: Deep resonance affirming shared life experience.\n  - ✨ Empathy: Validating another woman\'s feelings and courage.\n• Interactive Community Polls: Supports single-choice (MCQ) and multiple-selection (MSQ) polls on sensitive topics with dynamic Framer Motion animated vote distribution bars.',
        },
        {
          title: 'Voice Confessions & OpenAI Whisper-1 Pipeline',
          content:
            'To remove the cognitive barrier of typing during emotional distress, Sahaayikaa incorporates a seamless voice confession engine:\n\n• In-Browser Capture: Utilizes the Web MediaRecorder API to record compressed WebM audio streams across mobile and desktop browsers.\n• Cloudinary & Whisper-1 Pipeline: Uploads audio streams securely to Cloudinary, triggering OpenAI Whisper-1 for instant, high-accuracy speech-to-text transcription.\n• Waveform Audio Presentation: The published story card embeds an interactive audio player with waveform visualizers alongside the synchronous text transcription, allowing community members to listen or read according to their preference.',
        },
        {
          title: 'Thematic Support Circles & Community Spaces',
          content:
            'Support Circles organize the sanctuary into curated spaces matching specific life stages and shared emotional contexts:\n\n• Curated Domains: Anxiety & Overwhelm, Maternal Health & Postpartum, Career & Financial Independence, Healing from Heartbreak, and Caregiver Support.\n• Featured Moderator Prompts: Circle moderators post guided reflection prompts to spark deep, constructive community exchanges.\n• Membership Access Controls: Only joined members can create posts within specific circles, maintaining safe, focused environments.',
        },
        {
          title: 'Private Therapeutic Journal & AI Sentiment Insights',
          content:
            'For individual emotional processing, Sahaayikaa offers an encrypted, 100% private self-care diary:\n\n• Private Diary: Entries are protected and visible only to the authenticated user.\n• AI Therapeutic Feedback: Saving a journal entry triggers generateJournalInsights() via GPT-4o-mini, generating a comforting, non-clinical therapeutic reflection (2–3 sentences) and a Healing Score Index (1–100).\n• Longitudinal Analytics: Visualizes healing scores and mood trajectories over time using interactive Recharts area graphs.',
        },
        {
          title: 'Timezone-Aware Daily Check-In & Streak Engine',
          content:
            'To prevent common UTC date-shift streak bugs where daily check-ins reset incorrectly for international users, Sahaayikaa implements a timezone-aware streak calculator (lib/streak.ts):\n\n• Client Offset Injection: The client passes timezoneOffset = new Date().getTimezoneOffset() (e.g., -330 for IST).\n• Calendar Normalization: Converts all stored check-in timestamps to the user\'s local calendar date string (YYYY-MM-DD) and deduplicates multiple check-ins on the same calendar day.\n• Contiguous Traversal: Traverses historical check-in dates backward from today/yesterday to calculate the Current Streak, and traverses forward to determine the user\'s Lifetime Record Streak.\n• Holistic Tracking: Captures Mood Grid selections, Energy Level (1–10), Anxiety Level (1–10), Sleep Hours, Gratitude Notes, and Reflection logs.',
        },
        {
          title: '24/7 AI Companion & Triple-Tier Crisis Intercept',
          content:
            'Sahaayikaa provides non-judgmental guidance while enforcing strict clinical boundaries:\n\n• 24/7 AI Companion: Empathetic conversational assistant (GPT-4o-mini) offering mindfulness and grounding exercises, with strict guardrails prohibiting medical or psychiatric diagnosis.\n• Triple-Tier Safety Pipeline:\n  1. Local Heuristic Filter: High-speed regex checks against prohibited self-harm and abuse keywords.\n  2. OpenAI Moderation API: Semantic screening detecting harassment, hate speech, and violence.\n  3. Crisis Intercept Guardrail: If crisis language is detected (detectCrisisLocal()), the system intercepts the action with [CRISIS_DETECTED], displaying immediate emergency helpline resources (Vandrevala Foundation, AASRA, Kiran 24/7 Helpline).',
        },
        {
          title: 'Privacy Shield, Sensitive Content Blur & Moderation Portal',
          content:
            'Multiple defensive layers safeguard users in high-risk environments:\n\n• Panic Button / Quick Escape: Dedicated 1-click button that instantly redirects the browser to Google Search and clears in-memory state if privacy is compromised.\n• Sensitive Content Blur: Stories with grief or trauma tags are blurred by default with a SensitiveReveal click-to-view toggle.\n• Dynamic Watermarking: Overlays subtle user session tokens across sensitive screens to deter unauthorized screenshots.\n• Admin Console (/admin): Real-time community health metrics, flagged content resolution queues, false-report dismissals, and single-click content deletion or user bans.',
        },
        {
          title: 'Highlights',
          content:
            '1. Zero Vanity Metrics & Dual Anonymity: Uncompromised identity protection with heartfelt 🫂 Hugs, 💜 Not Alone, and ✨ Empathy reactions.\n\n2. Voice Confessions with Whisper-1: In-browser WebM audio recording with synchronous Cloudinary CDN streaming and OpenAI transcript generation.\n\n3. Triple-Tier Safety & Crisis Intercept: Heuristic, semantic, and automated crisis hotline intercept protecting vulnerable users.\n\n4. Timezone-Aware Streak Engine: Client-offset calendar normalization guaranteeing accurate daily wellness streaks globally.\n\n5. Private Journal & AI Healing Index: Encrypted private diaries with GPT-4o-mini therapeutic insights and Recharts mood analytics.\n\n6. Privacy Shield & Panic Button: Quick-escape browser redirects, sensitive content blurs, and dynamic session watermarking.',
        },
        {
          title: 'Outcome & Status',
          content:
            'Shipped a production-ready emotional wellness sanctuary for women featuring zero-judgment community storytelling, AI-assisted reflections, and end-to-end privacy guarantees.',
        },
      ],
      figure: {
        src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1280&auto=format&fit=crop',
        alt: 'Sahaayikaa Emotional Sanctuary Architecture and Crisis Intercept Pipeline',
        caption: 'Figure 1: Voice confession transcription flow, timezone-aware streak engine, and triple-tier crisis intercept pipeline.',
      },
    },
  },
  {
    title: 'Routeory',
    slug: 'routeory',
    kicker: 'Collaborative Travel Storytelling OS',
    year: '2026',
    role: 'Lead Full-Stack & Mobile Systems Architect',
    imageAlt: 'Routeory collaborative travel storytelling mobile app, interactive timeline, cinematic route replay, and expense settlement engine',
    description: 'Collaborative travel storytelling operating system and expedition chronicle platform built with NestJS (Fastify), React Native (Expo SDK 56), and PostgreSQL, featuring real-time Socket.io multi-user sync, greedy bipartite debt settlement, GPT-4o narrative synthesis, and cinematic OSRM route replays.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1280&auto=format&fit=crop',
    technologies: [
      'NestJS',
      'Fastify',
      'React Native',
      'Expo SDK 56',
      'TypeScript',
      'PostgreSQL',
      'Prisma ORM',
      'Socket.io',
      'OpenAI GPT-4o',
      'OSRM Routing',
      'Cloudinary',
      'Zustand',
      'TanStack Query',
      'NativeWind',
    ],
    liveUrl: 'https://routeory.app',
    githubUrl: 'https://github.com/manishjangra1/routeory',
    featured: true,
    isCurrentlyWorking: false,
    published: true,
    order: 8,
    caseStudy: {
      problem: [
        'Travel memories and expedition logs are fragmented across disconnected apps: WhatsApp chat threads, camera rolls, Splitwise ledgers, Apple Notes, and Google Maps pins — leading to lost moments, painful post-trip debt calculations, and cumbersome manual album curation.',
        'Routeory unifies the entire expedition lifecycle into a single collaborative operating system — combining real-time multi-user timeline logging, greedy bipartite debt settlement algorithms, GPT-4o autonomous travelogues, and cinematic animated route replays.',
      ],
      role: [
        'Architected and implemented the end-to-end distributed system: NestJS Fastify backend API, Prisma ORM PostgreSQL schema, real-time Socket.io collaboration gateway, and cross-platform Expo SDK 56 React Native mobile app.',
        'Engineered the greedy bipartite debt settlement engine, direct-to-cloud presigned upload pipeline, OSRM geospatial route caching layer, and multi-format canvas story export system.',
      ],
      approach: [
        'Built a high-throughput Fastify backend utilizing NestJS inversion-of-control architecture with bi-directional Socket.io room broadcasting for instant multi-user timeline synchronization.',
        'Designed an offline-first mobile architecture using Zustand stores and React Query caches to ensure travelers can seamlessly log moments off-grid with automatic background flushing upon reconnection.',
        'Implemented a greedy bipartite balance reduction algorithm that resolves multi-party debts with the absolute minimum number of peer-to-peer monetary transfers.',
        'Constructed an automated AI storytelling synthesis pipeline with OpenAI GPT-4o, converting raw coordinates, notes, and expense tallies into evocative daily travel essays.',
        'Developed an animated map replay engine connecting sequential waypoints with cached OSRM polylines (30-day TTL) and dynamic camera heading/pitch transitions.',
      ],
      highlights: [
        'High-Throughput Fastify Engine: Sub-millisecond route handling and Socket.io event broadcasting for real-time co-traveler synchronization.',
        'Greedy Minimal-Transaction Debt Settlement: Bipartite balance reduction algorithm simplifying group expense settlements.',
        'Autonomous GPT-4o Storytelling: Converts raw GPS coordinates, notes, and timestamps into published literary travelogues.',
        'Cinematic Replay with OSRM Caching: Animated map tracking with 30-day GeoJSON route caching in PostgreSQL.',
        'Direct-to-Cloud Presigned Media Pipeline: Zero server-bandwidth media uploads using Cloudinary HMAC SHA-256 signatures.',
        'Multi-Format Social Story Designer: Offline canvas rendering across Polaroid, Magazine, and Minimal templates.',
      ],
      outcome: [
        'Shipped a production-grade full-stack travel operating system combining mobile native ergonomics, real-time collaboration, and automated narrative intelligence.',
      ],
      sections: [
        {
          title: 'Executive Summary & Core Value Proposition',
          content:
            'Travel memories and logistics are frequently fragmented across disparate applications: WhatsApp chat threads, photo rolls, Splitwise ledgers, Apple Notes, and Google Maps pins. Routeory unifies the entire expedition lifecycle into a single, cohesive operating system:\n\n1. Live Co-Creation: Multiple co-travelers log notes, photos, places, and expenses into a shared chronological timeline synced over WebSockets in real time.\n2. Autonomous AI Storytelling: Ingests raw trip coordinates, notes, expenses, and logs to produce high-grade travel editorial narratives powered by OpenAI GPT-4o.\n3. Automated Debt Settlement: Calculates exact multi-party expense splits and runs a greedy bipartite ledger reduction algorithm to settle debts with minimum transactions.\n4. Cinematic Route Replay: Connects visited waypoints using cached OSRM routing data and renders animated playback over map projections.\n5. Instant Export & Social Sharing: Renders high-resolution story cards with customizable templates (Polaroid, Editorial, Minimalist, Magazine) ready for social media dispatch or web publishing.',
        },
        {
          title: 'High-Level System Architecture & Client-Server Pipeline',
          content:
            'Routeory is organized as a monorepo containing a high-throughput backend service and an offline-ready mobile application:\n\n• Backend API Engine (backend-api): Built with NestJS and the Fastify HTTP platform adapter for maximum request throughput and low serialization overhead. Prisma ORM interfaces with PostgreSQL, and Socket.io powers bi-directional event distribution.\n• Mobile Client Stack (mobile-app): React Native built on Expo SDK 56 with Expo Router file-based typed routing, NativeWind v4 styling, Zustand global state, TanStack React Query v5 server caching, and hardware-backed Expo SecureStore for JWT tokens.\n• Direct-to-Cloud Upload Pipeline: To keep backend nodes bandwidth-free, the mobile client requests presigned HMAC SHA-256 signatures from GET /media/signature and uploads images/videos directly to Cloudinary, submitting only media URLs and metadata to the database.',
        },
        {
          title: 'Real-Time Collaboration & Socket.io Synchronization Engine',
          content:
            'The CollaborationGateway synchronizes expedition activities across all active co-travelers:\n\n• Handshake Token Authentication: Extracts and verifies JWT credentials from socket connection headers before granting room access.\n• Multi-Room Event Routing:\n  - user:<userId>: Dedicated private room for real-time invitations, friend requests, and individual alert payloads.\n  - trip:<tripId>: Broadcast channel for active co-travelers on a specific journey.\n• Event Mesh: Broadcasts timeline_update → on_timeline_update and budget_update → on_budget_update across the crew room.\n• Offline Resilience: Local Zustand stores maintain mutation queues while off-grid; when network connectivity returns, drafts are flushed sequentially and React Query invalidates cached timeline slices.',
        },
        {
          title: 'Chronological Timeline & Multi-Modal Expedition Logging',
          content:
            'Expeditions are structured into chronological dayNumber buckets with support for multi-modal milestone entries:\n\n• Photos & Media: High-resolution assets with Cloudinary public IDs, dimensions, and optimized thumbnails.\n• Quick Notes: Ephemeral thoughts and trail observations.\n• Geocoded Places: Linked geographic pins with Google Place IDs, addresses, and GPS coordinates.\n• Linked Expenses: Financial records tied directly to timeline events.\n• AI Journal Cards: Beautifully formatted editorial summaries generated for each day.\n\nEntries support offline timestamp recording and re-ordering, slotting seamlessly into historical sequence upon synchronization.',
        },
        {
          title: 'Expense Tracking & Greedy Bipartite Debt Settlement',
          content:
            'Routeory manages complex multi-party travel budgets with extreme precision:\n\n• Multi-Currency Split Ledger: Records expenses with high precision (Decimal(12, 2)), currency codes, category tags (Food, Accommodation, Transport, etc.), and custom or equal split allocations.\n• Greedy Minimal-Transaction Algorithm:\n  1. Computes Net Balance for each traveler: NetBalance[i] = TotalPaidBy[i] - TotalOwedBy[i].\n  2. Partitions travelers into sorted lists: Creditors (NetBalance > 0 descending) and Debtors (NetBalance < 0 descending by absolute debt).\n  3. Executes a two-pointer reduction loop matching top creditors with top debtors, eliminating circular transfers and resolving all crew balances with the absolute minimal transaction count.',
        },
        {
          title: 'AI Storyteller & GPT-4o Narrative Synthesis',
          content:
            'The AiService turns raw chronological logs into literary travelogues:\n\n• Context Aggregation: Collects all notes, places visited, media captions, and expense summaries for a specified dayNumber.\n• Prompt Engineering: Structured system instructions emphasize vivid travel prose, sensory detail, tone selection, and an evocative one-sentence summary caption.\n• Atomic Storage: Saves the synthesized narrative in the Journal database table inside an atomic transaction, generating a JOURNAL timeline card.\n• Fallback Pipeline: Operates with a deterministic procedural narrative generator when running in offline or sandbox environments.',
        },
        {
          title: 'Cinematic Travel Replay & Geospatial Route Caching',
          content:
            'The ReplayService generates animated expedition playback packages:\n\n• Intelligent Geospatial Caching: Waypoint coordinates are rounded to 5 decimal places (originKey, destKey) and checked against the PostgreSQL RouteCache table (30-day TTL). On cache misses, OSRM turn-by-turn routing coordinates are retrieved and stored as GeoJSON polylines.\n• Animated Map Controller: The mobile client utilizes useReplayTimelineEngine to smoothly interpolate map camera pitch, heading, waypoint progress markers, and zoom levels across playback speeds (1x, 2x, 4x).',
        },
        {
          title: 'Story Sharing, Canvas Export & Public Web Publishing',
          content:
            'Travelers can export and showcase their memories across multiple formats:\n\n• Visual Story Templates: Features pre-built designer templates including Polaroid (nostalgic frame with handwritten caption notes), Editorial/Magazine (modern typographical showcase), and Minimalist (clean photo display with coordinates).\n• Native Canvas Capture: Uses react-native-view-shot to render off-screen components into crisp PNG/JPEG files and triggers expo-sharing for instant Instagram or WhatsApp dispatch.\n• Public Web Publishing: Trip owners can publish public chronicles via unique PublicStory slugs, rendering responsive web views for friends and family.',
        },
        {
          title: 'Database Architecture & Performance Engineering',
          content:
            'The backend persistence layer is built on PostgreSQL with Prisma ORM:\n\n• High-Performance Indexing: High-cardinality compound indices on [tripId, loggedAt], [userId, createdAt], and [ownerId], alongside unique constraints on [tripId, userId] (collaborators) and [expenseId, userId] (splits).\n• Fastify HTTP Advantage: Replaces standard Express with Fastify, doubling route execution throughput and minimizing JSON serialization latency.\n• Stateless Architecture: Decoupled socket rooms and JWT session handling allow seamless horizontal node clustering behind a Redis Pub/Sub adapter.',
        },
        {
          title: 'Highlights',
          content:
            '1. High-Throughput Fastify Engine: Sub-millisecond route handling and Socket.io event broadcasting for real-time co-traveler synchronization.\n\n2. Greedy Minimal-Transaction Debt Settlement: Bipartite balance reduction algorithm simplifying group expense settlements.\n\n3. Autonomous GPT-4o Storytelling: Converts raw GPS coordinates, notes, and timestamps into published literary travelogues.\n\n4. Cinematic Replay with OSRM Caching: Animated map tracking with 30-day GeoJSON route caching in PostgreSQL.\n\n5. Direct-to-Cloud Presigned Media Pipeline: Zero server-bandwidth media uploads using Cloudinary HMAC SHA-256 signatures.\n\n6. Multi-Format Social Story Designer: Offline canvas rendering across Polaroid, Magazine, and Minimal templates.',
        },
        {
          title: 'Outcome & Status',
          content:
            'Shipped a production-grade full-stack travel operating system combining mobile native ergonomics, real-time collaboration, and automated narrative intelligence.',
        },
      ],
      figure: {
        src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1280&auto=format&fit=crop',
        alt: 'Routeory Mobile Architecture and Real-Time Synchronization Engine',
        caption: 'Figure 1: NestJS Fastify backend pipeline, Socket.io collaboration mesh, and React Native mobile architecture.',
      },
    },
  },
  {
    title: 'Wurbr',
    slug: 'wurbr',
    kicker: 'Autonomous VPS PaaS Control Plane',
    year: '2026',
    role: 'Lead Systems Architect & Core Engineer',
    imageAlt: 'Wurbr autonomous deployment and operations platform dashboard, real-time log streaming, and VPS infrastructure manager',
    description: 'Autonomous deployment and operations control plane for customer-owned VPS infrastructure built with Clean Architecture, Next.js 16, Hono, BullMQ, and PostgreSQL, featuring zero-SSH operations, dual automatic/guided deployment modes, real-time Ably log streaming, AES-256-GCM envelope encryption, and instantaneous rollbacks.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1280&auto=format&fit=crop',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Hono',
      'Node.js',
      'BullMQ',
      'Redis',
      'PostgreSQL',
      'Prisma ORM',
      'Ably Realtime',
      'Tailwind CSS v4',
      'Docker',
      'Turborepo',
    ],
    liveUrl: 'https://wurbr.dev',
    githubUrl: 'https://github.com/manishjangra1/wurbr',
    featured: true,
    isCurrentlyWorking: false,
    published: true,
    order: 9,
    caseStudy: {
      problem: [
        'Managing customer-owned VPS infrastructure traditionally forces developers to manually SSH into production servers for routine tasks: pulling Git repositories, configuring environment variables, installing system packages, generating systemd units, configuring Nginx/Caddy reverse proxies, provisioning SSL certificates, and troubleshooting failed deployments — introducing human error and operational overhead compared to expensive PaaS vendors.',
        'Wurbr was engineered as a self-hostable autonomous control plane that brings the developer experience of modern PaaS platforms directly to customer-owned VPS hardware — delivering zero-SSH operations, automated framework detection, real-time log streaming, and AES-256-GCM envelope encryption.',
      ],
      role: [
        'Architected and implemented the end-to-end distributed system: Clean Architecture monorepo (Turborepo + pnpm), Hono HTTP API, BullMQ asynchronous worker subsystem, and Next.js 16 App Router web console.',
        'Engineered the phased deployment execution engine, automated SSH connection gateway with connection pooling, interactive HMAC-authenticated WebSocket web terminal, and AES-256-GCM credentials encryption layer.',
      ],
      approach: [
        'Enforced strict Clean Architecture (Hexagonal / Ports & Adapters) separation across packages/domain (pure logic, zero dependencies), packages/application (use cases), and infrastructure adapters (Prisma repositories, SSH2 gateway, BullMQ publishers).',
        'Built an asynchronous worker isolation model (ADR-0002) offloading long-running SSH executions, Git operations, builds, and metric harvests into dedicated BullMQ queues backed by Redis distributed locks.',
        'Engineered dual deployment paradigms: push-to-deploy Automatic Mode with zero-downtime symlink cutover and interactive Guided Mode (ADR-0017) allowing live in-flight command and configuration file inspection.',
        'Developed a real-time telemetry pipeline utilizing Ably Realtime tokens for live stdout/stderr log streaming and stage state transitions with automated REST polling fallback.',
        'Constructed an interactive web terminal (ADR-0009) via WebSocket PTY gateways authenticated by single-use 60-second HMAC tickets, piping remote SSH sessions directly to in-browser xterm.js.',
      ],
      highlights: [
        'Zero-SSH Autonomous Operations: Complete web-based VPS management for provisioning, deployments, logs, and monitoring.',
        'Clean Architecture & Worker Isolation: Strict package boundaries with domain isolation and asynchronous BullMQ job processing.',
        'Dual Deployment Modes: Automatic push-to-deploy CI/CD and interactive Guided Mode with live configuration editing.',
        'AES-256-GCM Envelope Encryption: Enterprise-grade security for SSH private keys, API secrets, and environment variables.',
        'Real-Time Ably Log Streaming & Web Terminal: Live execution output and HMAC-authenticated WebSocket SSH PTY sessions.',
        'Instant Symlink Rollback: Millisecond rollback to prior releases without rebuilds or Git fetches.',
      ],
      outcome: [
        'Shipped an enterprise-grade, open-source self-hostable PaaS control plane delivering modern cloud developer ergonomics directly to customer-owned VPS infrastructure.',
      ],
      sections: [
        {
          title: 'Executive Summary & Core Value Proposition',
          content:
            'Wurbr is a self-hostable control plane that brings the seamless developer experience of modern PaaS platforms (such as Vercel or Render) to customer-owned VPS infrastructure (Hetzner, DigitalOcean, AWS EC2, Linode, OVH, or bare metal).\n\nKey Value Pillars:\n1. Zero-SSH Operations: Provision, deploy, configure environment variables, manage custom domains, provision SSL certificates, inspect metrics, and stream live logs directly from the web interface.\n2. Infrastructure Ownership: All application workloads run directly on the user\'s servers, while Wurbr operates as the control plane orchestration engine.\n3. Dual Deployment Paradigms: Continuous push-to-deploy Automatic Mode and interactive stage-by-stage Guided Mode.\n4. Security by Default: Client credentials, private SSH keys, and environment variables are encrypted at rest using AES-256-GCM, with HMAC authentication across webhooks and web terminal sessions.',
        },
        {
          title: 'System Architecture & Clean Architecture Boundaries',
          content:
            'Wurbr is architected as a modular monolith adhering strictly to Clean Architecture (Hexagonal / Ports & Adapters):\n\n• Inward Dependency Rule: packages/domain contains pure business entities, value objects, and port interfaces with zero external runtime dependencies. packages/application coordinates use cases and depends only on domain contracts. Outer packages (packages/database, packages/ssh, apps/api, apps/worker) implement domain ports.\n• Web & Database Isolation: apps/web never connects directly to PostgreSQL or remote SSH servers. All state operations route through apps/api or shared client DTOs.\n• Worker Isolation (ADR-0002): All long-running SSH commands, Git clones, builds, Certbot certificate requests, and system metric harvests are strictly offloaded from HTTP request handlers into background BullMQ workers.',
        },
        {
          title: 'Asynchronous Job Processing & Distributed Worker Model',
          content:
            'All background workloads are dispatched through BullMQ queues backed by Redis 7:\n\n• Queues & Workers: deployments (builds, pipelines, rollbacks), health (SSH connectivity and host fingerprint validation), metrics (CPU, RAM, Disk utilization harvesting), and domain-ssl (TLS socket handshakes and DNS verification).\n• Distributed Locking (RedisLockService): Prevents race conditions during concurrent deployments on the same project or server.\n• Graceful Worker Shutdown: Traps SIGTERM and SIGINT signals, stops accepting new jobs, drains active deployment pipelines cleanly, and closes SSH connection pools safely.',
        },
        {
          title: 'Deployment Engine & Phased Execution Pipeline',
          content:
            'Every deployment execution follows a strictly structured lifecycle:\n\n1. Prepare: Acquires Redis distributed lock and initializes deployment stages.\n2. Source: Clones target Git repository or pulls commit to remote staging (/var/www/wurbr/apps/<project-id>/releases/<deployment-id>).\n3. Detect: Automatically identifies project framework (Next.js standalone, Node/Express/Fastify/Hono, Vite static HTML, Docker/Docker Compose).\n4. Build: Injects decrypted environment variables, installs dependencies, and runs build scripts.\n5. Release: Configures systemd unit files or Docker containers, updates reverse proxy configurations (Nginx/Caddy), reloads services, and updates the active /current symlink.\n6. Healthcheck: Probes the local application port for zero-downtime cutover.\n\nDual Modes & Rollbacks: Supports fully automated CI/CD alongside Guided Mode (ADR-0017) for interactive command/file editing. Rollbacks (ExecuteRollback) are instantaneous and non-destructive, re-pointing the /current symlink to prior successful releases without rebuilding.',
        },
        {
          title: 'Realtime Telemetry & Ably Log Streaming',
          content:
            'Wurbr provides sub-second visibility into all deployment and server events:\n\n• Scoped Token Issuer (ADR-0007): apps/api generates short-lived, capability-restricted Ably Realtime tokens for authenticated client sessions.\n• Live Streaming Mesh: apps/worker emits real-time stdout and stderr log lines alongside stage state transitions (deployments:<id>, servers:<id>).\n• Resilient Fallback: If Ably is unavailable or WebSocket connectivity drops, the frontend automatically falls back to REST polling endpoints (/v1/deployments/:id/logs).',
        },
        {
          title: 'Infrastructure, SSH Gateway & Interactive Web Terminal',
          content:
            'Server management is handled through a high-performance native SSH gateway:\n\n• Ssh2Gateway: Manages SSH key authentication, host fingerprint verification, and remote command streaming.\n• Interactive Web Terminal (ADR-0009): The web client requests a single-use 60-second HMAC token from POST /v1/servers/:id/terminal-ticket and opens a WebSocket to apps/worker (ws://.../terminal). The worker allocates an SSH pseudo-terminal (PTY) and pipes input/output bidirectionally to in-browser xterm.js.\n• Metrics Harvester: Executes lightweight non-interactive SSH commands (top -bn1, free -m, df -k, cat /proc/loadavg) and appends samples to PostgreSQL, with automated 7-day retention pruning and SVG sparkline visualizations.',
        },
        {
          title: 'Custom Domains, DNS Guidance & Let\'s Encrypt TLS',
          content:
            'Wurbr provides automated domain configuration and TLS lifecycle management:\n\n• Target DNS Guidance: Computes the target server IP and outputs exact A and CNAME record configuration instructions for custom domains.\n• Automated Certbot Provisioning: Remotely issues and renews Let\'s Encrypt SSL certificates over SSH with automated Nginx/Caddy renewal hooks.\n• Continuous TLS Verification: Background workers periodically probe SSL expiration dates and update domain status badges (ACTIVE, EXPIRING, EXPIRED).',
        },
        {
          title: 'Security Architecture & Threat Mitigation',
          content:
            'Security is engineered into every layer of the platform:\n\n• Envelope Encryption at Rest (AES-256-GCM, ADR-0005): SSH private keys, passphrases, and environment variables are encrypted with 256-bit keys and stored as wurbr1.<iv>.<tag>.<ciphertext>.\n• Session Revocation & JWT Versioning (ADR-0014): Incrementing sessionVersion on user models instantly invalidates all other active JWT sessions upon password reset.\n• GitHub Webhook HMAC Verification: Validates x-hub-signature-256 signatures with Redis delivery ID tracking to prevent replay attacks.\n• Immutable Audit Trail: Every critical mutation generates an immutable AuditLog record capturing actor, action, resource, and scrubbed metadata.',
        },
        {
          title: 'Database Architecture & Data Model',
          content:
            'The database layer uses PostgreSQL with Prisma ORM structuring multi-tenant entities:\n\n• Tenancy & Membership: User, Organization, and OrganizationMember with granular RBAC roles (OWNER, MEMBER, VIEWER).\n• Workloads & Infrastructure: Project, Server (with credentialsEncrypted), Deployment, DeploymentStage, DeploymentStep, DeploymentLogLine, and ServerMetricSample.',
        },
        {
          title: 'Highlights',
          content:
            '1. Zero-SSH Autonomous Operations: Complete web-based VPS management for provisioning, deployments, logs, and monitoring.\n\n2. Clean Architecture & Worker Isolation: Strict package boundaries with domain isolation and asynchronous BullMQ job processing.\n\n3. Dual Deployment Modes: Automatic push-to-deploy CI/CD and interactive Guided Mode with live configuration editing.\n\n4. AES-256-GCM Envelope Encryption: Enterprise-grade security for SSH private keys, API secrets, and environment variables.\n\n5. Real-Time Ably Log Streaming & Web Terminal: Live execution output and HMAC-authenticated WebSocket SSH PTY sessions.\n\n6. Instant Symlink Rollback: Millisecond rollback to prior releases without rebuilds or Git fetches.',
        },
        {
          title: 'Outcome & Status',
          content:
            'Shipped an enterprise-grade, open-source self-hostable PaaS control plane delivering modern cloud developer ergonomics directly to customer-owned VPS infrastructure.',
        },
      ],
      figure: {
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1280&auto=format&fit=crop',
        alt: 'Wurbr Autonomous Control Plane Architecture and Phased Deployment Pipeline',
        caption: 'Figure 1: Clean Architecture monorepo, BullMQ asynchronous worker pipeline, and SSH gateway execution flow.',
      },
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
    order: 10,
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

const seedSkills = [
  { name: 'React Native', category: 'Clients', proficiency: 92, order: 1 },
  { name: 'Expo', category: 'Clients', proficiency: 90, order: 2 },
  { name: 'Next.js', category: 'Clients', proficiency: 94, order: 3 },
  { name: 'React', category: 'Clients', proficiency: 95, order: 4 },
  { name: 'TypeScript', category: 'Clients', proficiency: 92, order: 5 },
  { name: 'Tailwind CSS', category: 'Clients', proficiency: 90, order: 6 },
  { name: 'JavaScript', category: 'Clients', proficiency: 95, order: 7 },
  { name: 'HTML5 & CSS3', category: 'Clients', proficiency: 95, order: 8 },
  { name: 'Framer Motion', category: 'Clients', proficiency: 85, order: 9 },
  { name: 'Three.js', category: 'Clients', proficiency: 75, order: 10 },
  { name: 'NestJS', category: 'Servers', proficiency: 92, order: 1 },
  { name: 'Node.js', category: 'Servers', proficiency: 94, order: 2 },
  { name: 'Express.js', category: 'Servers', proficiency: 90, order: 3 },
  { name: 'REST APIs', category: 'Servers', proficiency: 95, order: 4 },
  { name: 'GraphQL', category: 'Servers', proficiency: 85, order: 5 },
  { name: 'Microservices', category: 'Servers', proficiency: 88, order: 6 },
  { name: 'PostgreSQL', category: 'Servers', proficiency: 90, order: 7 },
  { name: 'MongoDB', category: 'Servers', proficiency: 90, order: 8 },
  { name: 'Redis', category: 'Servers', proficiency: 85, order: 9 },
  { name: 'Prisma ORM', category: 'Servers', proficiency: 90, order: 10 },
  { name: 'Python', category: 'Servers', proficiency: 82, order: 11 },
  { name: 'Docker', category: 'Platform', proficiency: 85, order: 1 },
  { name: 'Git & GitHub', category: 'Platform', proficiency: 95, order: 2 },
  { name: 'AWS Cloud', category: 'Platform', proficiency: 80, order: 3 },
  { name: 'Socket.io', category: 'Platform', proficiency: 88, order: 4 },
  { name: 'CI/CD Pipelines', category: 'Platform', proficiency: 82, order: 5 },
  { name: 'Postman', category: 'Platform', proficiency: 90, order: 6 },
  { name: 'Jest / Testing', category: 'Platform', proficiency: 85, order: 7 },
  { name: 'UI/UX Design / Figma', category: 'Platform', proficiency: 82, order: 8 },
];

const seedBlogs = [
  {
    title: 'Engineering Real-Time Location Relays & Ledger Splits in On-Demand Marketplaces',
    slug: 'real-time-location-relays-and-split-payments-servyq',
    excerpt: 'How we architected high-frequency GPS journey tracking with Expo background tasks, NestJS WebSocket gateways, and automated split payout ledgers in Servyq.',
    publishedAt: new Date('2025-02-15'),
    published: true,
    tags: ['Architecture', 'React Native', 'NestJS', 'WebSockets', 'PostgreSQL'],
    featured: true,
    content: `When building Servyq — an on-demand service marketplace connecting domestic seekers with service providers — we faced two core architectural challenges: keeping battery-efficient live GPS telemetry synchronized across mobile devices, and executing safe, verifiable split payments upon job completion.`,
  },
  {
    title: 'Designing Offline-First Sync & Social Accountability Loops in Mobile Habit Engines',
    slug: 'offline-first-sync-and-habit-loops-dayzo',
    excerpt: 'Architectural patterns for optimistic offline action queues, peer streak verification, and low-latency feed generation in Dayzo.',
    publishedAt: new Date('2025-01-20'),
    published: true,
    tags: ['React Native', 'Expo', 'Mobile UI', 'Redis', 'Offline-First'],
    featured: false,
    content: `When building Dayzo, our goal was to fix the critical failure mode of habit tracking apps: solitary abandonment. By pairing routine building with lightweight peer verification and instant co-op streaks, we turned daily discipline into a social loop.`,
  },
  {
    title: 'Architecting a 100/100 Lighthouse Monochrome Portfolio & Headless CMS',
    slug: 'architecting-monochrome-portfolio-and-cms',
    excerpt: 'Engineering an editorial, typography-first developer portfolio with ISR, keyboard-first navigation, and strict design token separation.',
    publishedAt: new Date('2024-12-10'),
    published: true,
    tags: ['Next.js', 'TypeScript', 'Performance', 'Design Systems', 'MongoDB'],
    featured: false,
    content: `When building manishj.dev, the objective was uncompromising: create an editorial, brutalist monochrome developer portfolio with 100/100 Lighthouse scores, complete keyboard accessibility (⌘K), and a headless management layer.`,
  },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing in .env.local');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri);

  console.log('Clearing old projects, experiences, settings, skills, and blogs...');
  await Project.deleteMany({});
  await Experience.deleteMany({});
  await Settings.deleteMany({});
  await Skill.deleteMany({});
  await BlogPost.deleteMany({});

  console.log('Inserting seed projects...');
  await Project.insertMany(seedProjects);

  console.log('Inserting seed experiences...');
  await Experience.insertMany(seedExperience);

  console.log('Inserting seed settings...');
  await Settings.create(seedSettings);

  console.log('Inserting seed skills...');
  await Skill.insertMany(seedSkills);

  console.log('Inserting seed blog posts...');
  await BlogPost.insertMany(seedBlogs);

  console.log('Seeding complete successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
