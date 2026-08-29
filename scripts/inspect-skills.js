const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

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

const SettingsSchema = new mongoose.Schema(
  {
    capabilities: [
      {
        label: { type: String, required: true },
        items: [String],
      },
    ],
  },
  { timestamps: true, strict: false }
);

const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to DB');

  const existingSkills = await Skill.find().lean();
  console.log('Existing Skills in DB (' + existingSkills.length + '):');
  console.log(JSON.stringify(existingSkills, null, 2));

  const existingSettings = await Settings.findOne().lean();
  console.log('Existing Settings.capabilities in DB:');
  console.log(JSON.stringify(existingSettings?.capabilities, null, 2));

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
