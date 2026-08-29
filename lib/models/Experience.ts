import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  description: string[];
  current: boolean;
  location?: string;
  logo?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
    },
    description: {
      type: [String],
      default: [],
    },
    current: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Experience: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;
