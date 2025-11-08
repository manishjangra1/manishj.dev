import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  siteTitle: string;
  siteDescription: string;
  heroText: string;
  aboutText: string;
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
    aboutText: {
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

