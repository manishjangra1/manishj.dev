const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Define schemas
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: { type: [String], default: [] },
  liveUrl: { type: String },
  githubUrl: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['frontend', 'backend', 'tools', 'other'], required: true },
  icon: { type: String },
  proficiency: { type: Number, required: true, min: 0, max: 100, default: 50 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: [String], default: [] },
  current: { type: Boolean, default: false },
  location: { type: String },
  logo: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  coverImage: { type: String },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
  tags: { type: [String], default: [] },
}, { timestamps: true });

// Get or create models
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

// Dummy data
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js and Node.js. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/example/ecommerce',
    featured: true,
    order: 1,
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Firebase.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
    technologies: ['React', 'Firebase', 'TypeScript', 'Material-UI', 'Redux'],
    liveUrl: 'https://example-tasks.com',
    githubUrl: 'https://github.com/example/task-manager',
    featured: true,
    order: 2,
  },
  {
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard that displays current weather conditions, forecasts, and weather maps. Includes location-based weather and weather alerts.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
    liveUrl: 'https://example-weather.com',
    githubUrl: 'https://github.com/example/weather-dashboard',
    featured: false,
    order: 3,
  },
  {
    title: 'Social Media Analytics',
    description: 'An analytics dashboard for social media metrics. Tracks engagement, follower growth, and provides insights with beautiful visualizations and reports.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    technologies: ['Next.js', 'Python', 'PostgreSQL', 'D3.js', 'Chart.js'],
    liveUrl: 'https://example-analytics.com',
    githubUrl: 'https://github.com/example/social-analytics',
    featured: true,
    order: 4,
  },
  {
    title: 'Recipe Sharing Platform',
    description: 'A community-driven recipe sharing platform where users can share, discover, and rate recipes. Features include search, filtering, and personalized recommendations.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    technologies: ['Vue.js', 'Express.js', 'MongoDB', 'AWS S3', 'JWT'],
    liveUrl: 'https://example-recipes.com',
    githubUrl: 'https://github.com/example/recipe-platform',
    featured: false,
    order: 5,
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing projects, skills, and experience. Built with Next.js and Three.js for 3D animations.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
    technologies: ['Next.js', 'Three.js', 'Framer Motion', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://example-portfolio.com',
    githubUrl: 'https://github.com/example/portfolio',
    featured: false,
    order: 6,
  },
];

const skills = [
  // Frontend
  { name: 'React', category: 'frontend', proficiency: 90, order: 1 },
  { name: 'Next.js', category: 'frontend', proficiency: 85, order: 2 },
  { name: 'TypeScript', category: 'frontend', proficiency: 88, order: 3 },
  { name: 'JavaScript', category: 'frontend', proficiency: 92, order: 4 },
  { name: 'HTML5', category: 'frontend', proficiency: 95, order: 5 },
  { name: 'CSS3', category: 'frontend', proficiency: 90, order: 6 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 85, order: 7 },
  { name: 'Vue.js', category: 'frontend', proficiency: 75, order: 8 },
  { name: 'Three.js', category: 'frontend', proficiency: 70, order: 9 },
  { name: 'Framer Motion', category: 'frontend', proficiency: 80, order: 10 },
  
  // Backend
  { name: 'Node.js', category: 'backend', proficiency: 88, order: 1 },
  { name: 'Express.js', category: 'backend', proficiency: 85, order: 2 },
  { name: 'Python', category: 'backend', proficiency: 82, order: 3 },
  { name: 'Django', category: 'backend', proficiency: 75, order: 4 },
  { name: 'REST APIs', category: 'backend', proficiency: 90, order: 5 },
  { name: 'GraphQL', category: 'backend', proficiency: 78, order: 6 },
  { name: 'MongoDB', category: 'backend', proficiency: 85, order: 7 },
  { name: 'PostgreSQL', category: 'backend', proficiency: 80, order: 8 },
  { name: 'Redis', category: 'backend', proficiency: 70, order: 9 },
  { name: 'Firebase', category: 'backend', proficiency: 80, order: 10 },
  
  // Tools
  { name: 'Git', category: 'tools', proficiency: 90, order: 1 },
  { name: 'Docker', category: 'tools', proficiency: 75, order: 2 },
  { name: 'AWS', category: 'tools', proficiency: 70, order: 3 },
  { name: 'CI/CD', category: 'tools', proficiency: 78, order: 4 },
  { name: 'Webpack', category: 'tools', proficiency: 80, order: 5 },
  { name: 'Jest', category: 'tools', proficiency: 82, order: 6 },
  { name: 'ESLint', category: 'tools', proficiency: 85, order: 7 },
  { name: 'Postman', category: 'tools', proficiency: 88, order: 8 },
  
  // Other
  { name: 'UI/UX Design', category: 'other', proficiency: 75, order: 1 },
  { name: 'Figma', category: 'other', proficiency: 80, order: 2 },
  { name: 'Agile/Scrum', category: 'other', proficiency: 85, order: 3 },
];

const experiences = [
  {
    company: 'Tech Innovations Inc.',
    role: 'Senior Full Stack Developer',
    startDate: new Date('2023-01-15'),
    endDate: null,
    current: true,
    location: 'San Francisco, CA',
    description: [
      'Led development of a microservices architecture serving 1M+ daily active users',
      'Mentored a team of 5 junior developers and conducted code reviews',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
      'Optimized database queries resulting in 40% improvement in API response times',
      'Collaborated with cross-functional teams to deliver features on time',
    ],
    order: 1,
  },
  {
    company: 'Digital Solutions LLC',
    role: 'Full Stack Developer',
    startDate: new Date('2021-06-01'),
    endDate: new Date('2022-12-31'),
    current: false,
    location: 'Remote',
    description: [
      'Developed and maintained multiple client-facing web applications using React and Node.js',
      'Built RESTful APIs and integrated third-party services',
      'Improved application performance by implementing caching strategies',
      'Participated in agile development processes and sprint planning',
      'Fixed critical bugs and improved code quality through refactoring',
    ],
    order: 2,
  },
  {
    company: 'StartupXYZ',
    role: 'Frontend Developer',
    startDate: new Date('2020-03-01'),
    endDate: new Date('2021-05-31'),
    current: false,
    location: 'New York, NY',
    description: [
      'Built responsive user interfaces using React and modern CSS frameworks',
      'Collaborated with designers to implement pixel-perfect UI components',
      'Optimized web applications for performance and SEO',
      'Implemented state management solutions using Redux',
      'Contributed to open-source projects and company blog',
    ],
    order: 3,
  },
  {
    company: 'WebDev Agency',
    role: 'Junior Developer',
    startDate: new Date('2019-01-15'),
    endDate: new Date('2020-02-28'),
    current: false,
    location: 'Austin, TX',
    description: [
      'Developed client websites using HTML, CSS, and JavaScript',
      'Learned modern frameworks and best practices',
      'Assisted senior developers with debugging and testing',
      'Maintained and updated existing codebases',
      'Participated in team meetings and code reviews',
    ],
    order: 4,
  },
];

const blogPosts = [
  {
    title: 'Getting Started with Next.js 14: A Complete Guide',
    slug: 'getting-started-with-nextjs-14',
    excerpt: 'Learn how to build modern web applications with Next.js 14, including server components, app router, and best practices.',
    content: `# Getting Started with Next.js 14: A Complete Guide

Next.js 14 brings exciting new features and improvements that make building React applications even more powerful. In this comprehensive guide, we'll explore the key features and how to get started.

## What's New in Next.js 14

Next.js 14 introduces several groundbreaking features:

### Server Components
Server Components allow you to build applications that leverage the best of both server and client rendering. They reduce the JavaScript bundle size and improve performance.

### App Router
The new App Router provides a more intuitive file-based routing system with better support for layouts, loading states, and error handling.

### Improved Performance
Next.js 14 includes optimizations that make your applications faster out of the box, including better code splitting and image optimization.

## Getting Started

To create a new Next.js 14 project, run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will set up a new Next.js project with all the latest features configured.

## Best Practices

1. Use Server Components by default
2. Leverage the App Router for better organization
3. Optimize images using the built-in Image component
4. Implement proper error boundaries
5. Use TypeScript for better type safety

## Conclusion

Next.js 14 is a powerful framework that makes building modern web applications easier and more efficient. Start exploring these features today!`,
    published: true,
    publishedAt: new Date('2024-01-15'),
    tags: ['Next.js', 'React', 'Web Development', 'Tutorial'],
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
  },
  {
    title: 'Mastering TypeScript: Advanced Patterns and Techniques',
    slug: 'mastering-typescript-advanced-patterns',
    excerpt: 'Dive deep into advanced TypeScript patterns, generics, utility types, and techniques that will level up your development skills.',
    content: `# Mastering TypeScript: Advanced Patterns and Techniques

TypeScript has become an essential tool for modern web development. In this article, we'll explore advanced patterns and techniques that will help you write more robust and maintainable code.

## Advanced Type Patterns

### Conditional Types
Conditional types allow you to create types that depend on other types:

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
\`\`\`

### Mapped Types
Mapped types enable you to create new types based on existing ones:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`

## Utility Types

TypeScript provides several built-in utility types:

- \`Partial<T>\` - Makes all properties optional
- \`Required<T>\` - Makes all properties required
- \`Pick<T, K>\` - Selects specific properties
- \`Omit<T, K>\` - Excludes specific properties

## Best Practices

1. Use strict mode for better type checking
2. Leverage type inference when possible
3. Create reusable type utilities
4. Document complex types with JSDoc comments
5. Use discriminated unions for better type narrowing

## Conclusion

Mastering these advanced TypeScript patterns will significantly improve your code quality and developer experience.`,
    published: true,
    publishedAt: new Date('2024-02-10'),
    tags: ['TypeScript', 'Programming', 'Best Practices'],
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
  },
  {
    title: 'Building Scalable React Applications: Architecture Patterns',
    slug: 'building-scalable-react-applications',
    excerpt: 'Learn how to structure and organize large-scale React applications using proven architecture patterns and best practices.',
    content: `# Building Scalable React Applications: Architecture Patterns

As React applications grow in complexity, maintaining a clean and scalable architecture becomes crucial. In this article, we'll explore patterns and strategies for building maintainable React applications.

## Folder Structure

A well-organized folder structure is the foundation of a scalable application:

\`\`\`
src/
  components/
    common/
    features/
  pages/
  hooks/
  utils/
  services/
  store/
  types/
\`\`\`

## State Management

Choose the right state management solution based on your needs:

- **Local State**: For component-specific data
- **Context API**: For shared state across components
- **Redux/Zustand**: For complex global state
- **Server State**: Use React Query or SWR

## Component Patterns

### Container/Presentational Pattern
Separate logic from presentation:

\`\`\`typescript
// Container
const UserContainer = () => {
  const { data, loading } = useUser();
  return <UserView data={data} loading={loading} />;
};

// Presentational
const UserView = ({ data, loading }) => {
  // Pure presentation logic
};
\`\`\`

## Performance Optimization

1. Use React.memo for expensive components
2. Implement code splitting with React.lazy
3. Optimize re-renders with useMemo and useCallback
4. Virtualize long lists
5. Use production builds

## Conclusion

Building scalable React applications requires careful planning and adherence to proven patterns. Start with a solid foundation and iterate based on your specific needs.`,
    published: true,
    publishedAt: new Date('2024-03-05'),
    tags: ['React', 'Architecture', 'Best Practices', 'Scalability'],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  },
  {
    title: 'The Future of Web Development: Trends to Watch in 2024',
    slug: 'future-of-web-development-2024',
    excerpt: 'Explore the latest trends and technologies shaping the future of web development, from AI integration to new frameworks.',
    content: `# The Future of Web Development: Trends to Watch in 2024

The web development landscape is constantly evolving. Let's explore the trends that are shaping the future of web development in 2024.

## AI-Powered Development

AI tools like GitHub Copilot and ChatGPT are revolutionizing how developers write code. These tools can:

- Generate boilerplate code
- Suggest optimizations
- Help with debugging
- Write tests

## Serverless Architecture

Serverless computing continues to grow, offering:

- Reduced infrastructure costs
- Automatic scaling
- Simplified deployment
- Pay-per-use pricing

## WebAssembly (WASM)

WebAssembly enables running high-performance code in browsers:

- Near-native performance
- Language diversity
- Better security
- Growing ecosystem

## Progressive Web Apps (PWAs)

PWAs combine the best of web and mobile apps:

- Offline functionality
- Push notifications
- App-like experience
- Easy installation

## Conclusion

Staying current with these trends will help you build better applications and advance your career. Keep learning and experimenting!`,
    published: true,
    publishedAt: new Date('2024-01-20'),
    tags: ['Web Development', 'Trends', 'Technology', 'Future'],
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  },
  {
    title: 'Database Design Best Practices for Modern Applications',
    slug: 'database-design-best-practices',
    excerpt: 'Learn essential database design principles and best practices for building robust and scalable database schemas.',
    content: `# Database Design Best Practices for Modern Applications

Good database design is crucial for application performance and maintainability. In this article, we'll cover essential principles and best practices.

## Normalization

Normalize your database to reduce redundancy:

- **First Normal Form (1NF)**: Eliminate duplicate columns
- **Second Normal Form (2NF)**: Remove partial dependencies
- **Third Normal Form (3NF)**: Remove transitive dependencies

## Indexing Strategy

Proper indexing is key to query performance:

- Index frequently queried columns
- Use composite indexes for multi-column queries
- Avoid over-indexing (slows writes)
- Monitor and optimize indexes regularly

## Data Types

Choose appropriate data types:

- Use smallest data type that fits your needs
- Prefer integers over strings for IDs
- Use timestamps for dates
- Consider storage implications

## Relationships

Design relationships carefully:

- Use foreign keys for referential integrity
- Consider cascade behaviors
- Plan for one-to-many and many-to-many relationships
- Document relationship constraints

## Performance Tips

1. Use connection pooling
2. Implement query caching
3. Optimize slow queries
4. Use read replicas for scaling
5. Monitor database performance

## Conclusion

Following these best practices will help you build databases that are both performant and maintainable.`,
    published: true,
    publishedAt: new Date('2024-02-25'),
    tags: ['Database', 'Backend', 'Best Practices', 'SQL'],
    coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
  },
  {
    title: 'Introduction to Three.js: Creating 3D Web Experiences',
    slug: 'introduction-to-threejs',
    excerpt: 'Get started with Three.js and learn how to create stunning 3D graphics and interactive experiences in the browser.',
    content: `# Introduction to Three.js: Creating 3D Web Experiences

Three.js is a powerful JavaScript library for creating 3D graphics in the browser. In this tutorial, we'll cover the basics and create your first 3D scene.

## What is Three.js?

Three.js is a cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser using WebGL.

## Core Concepts

### Scene
The scene is the container for all 3D objects, lights, and cameras.

### Camera
The camera defines the viewpoint from which the scene is rendered.

### Renderer
The renderer draws the scene from the camera's perspective.

## Basic Example

\`\`\`javascript
import * as THREE from 'three';

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
\`\`\`

## Getting Started

1. Install Three.js: \`npm install three\`
2. Import the library
3. Create a scene, camera, and renderer
4. Add objects to your scene
5. Animate your scene

## Conclusion

Three.js opens up a world of possibilities for creating immersive web experiences. Start experimenting and see what you can create!`,
    published: true,
    publishedAt: new Date('2024-03-15'),
    tags: ['Three.js', '3D Graphics', 'WebGL', 'Tutorial'],
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await BlogPost.deleteMany({});
    console.log('✅ Existing data cleared');

    // Seed Projects
    console.log('📦 Seeding projects...');
    const createdProjects = await Project.insertMany(projects);
    console.log(`✅ Created ${createdProjects.length} projects`);

    // Seed Skills
    console.log('🛠️  Seeding skills...');
    const createdSkills = await Skill.insertMany(skills);
    console.log(`✅ Created ${createdSkills.length} skills`);

    // Seed Experiences
    console.log('💼 Seeding experiences...');
    const createdExperiences = await Experience.insertMany(experiences);
    console.log(`✅ Created ${createdExperiences.length} experiences`);

    // Seed Blog Posts
    console.log('📝 Seeding blog posts...');
    const createdBlogPosts = await BlogPost.insertMany(blogPosts);
    console.log(`✅ Created ${createdBlogPosts.length} blog posts`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\nSummary:');
    console.log(`  - Projects: ${createdProjects.length}`);
    console.log(`  - Skills: ${createdSkills.length}`);
    console.log(`  - Experiences: ${createdExperiences.length}`);
    console.log(`  - Blog Posts: ${createdBlogPosts.length}`);

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();

