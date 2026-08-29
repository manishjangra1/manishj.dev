import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICapabilityGroup {
  label: string;
  items: string[];
}

export interface ISettings extends Document {
  siteTitle: string;
  siteDescription: string;
  heroKicker?: string;
  heroName?: string;
  heroText: string;
  heroAvailability?: string;
  heroButton1Text?: string;
  heroButton2Text?: string;
  capabilities: ICapabilityGroup[];
  location?: string;
  aboutTitle?: string;
  aboutText: string;
  aboutText2?: string;
  aboutTechStack?: string[];
  aboutIcon?: string;
  aboutImage?: string;
  showAboutImage?: boolean;
  contactHeading?: string;
  contactDescription?: string;
  resumeUrl?: string;
  githubUsername?: string;
  avatarUrl?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    portfolio?: string;
    whatsapp?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CapabilityGroupSchema: Schema = new Schema(
  {
    label: { type: String, required: true },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const SettingsSchema: Schema = new Schema(
  {
    siteTitle: {
      type: String,
      default: 'Manish Jangra — Full-Stack Software Engineer',
    },
    siteDescription: {
      type: String,
      default: 'I build full-stack products — mobile clients, APIs, and the admin systems that run them.',
    },
    heroKicker: {
      type: String,
      default: 'Software engineer',
    },
    heroName: {
      type: String,
      default: 'Manish Jangra',
    },
    heroText: {
      type: String,
      default: 'I build full-stack products — mobile clients, APIs, and the admin systems that run them.',
    },
    heroAvailability: {
      type: String,
      default: 'Available for full-time roles and selected engagements',
    },
    heroButton1Text: {
      type: String,
      default: 'Get in touch',
    },
    heroButton2Text: {
      type: String,
      default: 'See selected work',
    },
    capabilities: {
      type: [CapabilityGroupSchema],
      default: [
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
    },
    location: {
      type: String,
      default: 'Chandigarh, India',
    },
    aboutTitle: {
      type: String,
      default: 'Background, systems, and product thinking.',
    },
    aboutText: {
      type: String,
      default: 'I am a full-stack software engineer focused on building complete, dependable systems. My work spans the entire product stack — from responsive mobile interfaces in React Native to structured backend services in NestJS and PostgreSQL.',
    },
    aboutText2: {
      type: String,
      default: 'I prioritize system simplicity, reliable architecture, and typography-first interfaces over decorative trends. I design systems that operate predictably under load and write maintainable code that teams can evolve with confidence.',
    },
    aboutTechStack: {
      type: [String],
      default: [],
    },
    aboutIcon: {
      type: String,
      default: '👨‍💻',
    },
    aboutImage: {
      type: String,
      default: '',
    },
    showAboutImage: {
      type: Boolean,
      default: false,
    },
    contactHeading: {
      type: String,
      default: 'Get in touch.',
    },
    contactDescription: {
      type: String,
      default: 'Full-time product engineering roles and selected freelance engagements. The best first step is email.',
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    githubUsername: {
      type: String,
      default: 'manishjangra1',
    },
    avatarUrl: {
      type: String,
      default: 'https://github.com/manishjangra1.png',
    },
    socialLinks: {
      github: { type: String, default: 'https://github.com/manishjangra1' },
      linkedin: { type: String, default: 'https://linkedin.com/in/manishjangra1' },
      twitter: { type: String, default: '' },
      email: { type: String, default: 'dev.jangramanish@gmail.com' },
      portfolio: { type: String, default: 'https://manishj.dev' },
      whatsapp: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
