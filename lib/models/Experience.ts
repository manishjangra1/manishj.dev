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
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
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
    },
    logo: {
      type: String,
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

const Experience: Model<IExperience> = mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;

