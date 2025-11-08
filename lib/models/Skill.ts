import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string;
  proficiency: number; // 0-100
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    category: {
      type: String,
      enum: ['frontend', 'backend', 'tools', 'other'],
      required: [true, 'Category is required'],
    },
    icon: {
      type: String,
    },
    proficiency: {
      type: Number,
      required: [true, 'Proficiency is required'],
      min: 0,
      max: 100,
      default: 50,
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

const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;

