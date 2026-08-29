import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProjectSection {
  title: string;
  content: string;
}

export interface ICaseStudy {
  problem?: string[];
  role?: string[];
  approach?: string[];
  highlights?: string[];
  outcome?: string[];
  sections?: IProjectSection[];
  figure?: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface IProject extends Document {
  title: string;
  slug: string;
  kicker?: string;
  year?: string;
  role?: string;
  imageAlt?: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  isCurrentlyWorking: boolean;
  published: boolean;
  order: number;
  content?: string; // Markdown fallback
  caseStudy?: ICaseStudy;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSectionSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const CaseStudySchema: Schema = new Schema(
  {
    problem: { type: [String], default: [] },
    role: { type: [String], default: [] },
    approach: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    outcome: { type: [String], default: [] },
    sections: { type: [ProjectSectionSchema], default: [] },
    figure: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
  },
  { _id: false }
);

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    kicker: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    imageAlt: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isCurrentlyWorking: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
    },
    caseStudy: {
      type: CaseStudySchema,
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
