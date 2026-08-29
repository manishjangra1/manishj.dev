const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: [String], default: [] },
    current: { type: Boolean, default: false },
    location: { type: String },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);

async function fixOrder() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  // Find all experiences and sort them by current: -1, startDate: -1
  const exps = await Experience.find().sort({ current: -1, startDate: -1 });
  console.log(`Found ${exps.length} experiences to order:`);

  for (let i = 0; i < exps.length; i++) {
    const exp = exps[i];
    const newOrder = i + 1;
    exp.order = newOrder;
    await exp.save();
    console.log(`Updated ${exp.company} (${exp.role}) -> Order: ${newOrder}, Current: ${exp.current}`);
  }

  console.log('Experience ordering updated successfully!');
  await mongoose.disconnect();
}

fixOrder().catch((err) => {
  console.error(err);
  process.exit(1);
});
