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

const UPDATED_SKILLS = [
  // Clients / Frontend
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

  // Servers / Backend
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

  // Platform & DevOps
  { name: 'Docker', category: 'Platform', proficiency: 85, order: 1 },
  { name: 'Git & GitHub', category: 'Platform', proficiency: 95, order: 2 },
  { name: 'AWS Cloud', category: 'Platform', proficiency: 80, order: 3 },
  { name: 'Socket.io', category: 'Platform', proficiency: 88, order: 4 },
  { name: 'CI/CD Pipelines', category: 'Platform', proficiency: 82, order: 5 },
  { name: 'Postman', category: 'Platform', proficiency: 90, order: 6 },
  { name: 'Jest / Testing', category: 'Platform', proficiency: 85, order: 7 },
  { name: 'UI/UX Design / Figma', category: 'Platform', proficiency: 82, order: 8 },
];

const UPDATED_CAPABILITIES = [
  {
    label: 'Clients',
    items: ['React Native', 'Expo', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    label: 'Servers',
    items: ['NestJS', 'Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Microservices', 'PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM'],
  },
  {
    label: 'Platform',
    items: ['Docker', 'Git & GitHub', 'AWS Cloud', 'Socket.io', 'CI/CD Pipelines', 'Postman', 'Jest', 'Figma'],
  },
];

async function sync() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  // Replace skill records with standardized, beautifully categorized production skills
  console.log('Updating Skill collection...');
  await Skill.deleteMany({});
  await Skill.insertMany(UPDATED_SKILLS);
  console.log(`Inserted ${UPDATED_SKILLS.length} standardized skills.`);

  // Update Settings capabilities
  console.log('Updating Settings capabilities...');
  await Settings.findOneAndUpdate(
    {},
    { capabilities: UPDATED_CAPABILITIES },
    { upsert: true, new: true }
  );
  console.log('Settings capabilities updated successfully.');

  await mongoose.disconnect();
  console.log('Sync complete!');
}

sync().catch((err) => {
  console.error(err);
  process.exit(1);
});
