import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  siteTitle: string;
  siteDescription: string;
  heroText: string;
  heroButton1Text?: string;
  heroButton2Text?: string;
  aboutText: string;
  aboutText2?: string;
  aboutTechStack?: string[];
  aboutIcon?: string;
  aboutImage?: string;
  showAboutImage?: boolean;
  contactHeading?: string;
  contactDescription?: string;
  resumeUrl?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    portfolio?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema(
  {
    siteTitle: {
      type: String,
      default: 'Portfolio',
    },
    siteDescription: {
      type: String,
      default: 'Software Developer Portfolio',
    },
    heroText: {
      type: String,
      default: 'Full Stack Software Developer',
    },
    heroButton1Text: {
      type: String,
      default: 'Learn More',
    },
    heroButton2Text: {
      type: String,
      default: 'View Projects',
    },
    aboutText: {
      type: String,
      default: '',
    },
    aboutText2: {
      type: String,
      default: '',
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
      default: "Let's Connect",
    },
    contactDescription: {
      type: String,
      default: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      email: String,
      portfolio: String,
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;

