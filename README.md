# Portfolio Website with 3D Design & CRM

A modern, responsive portfolio website with 3D animations, dynamic content management, and a full-featured CRM admin panel.

## Features

- **3D Animations**: Interactive 3D components using Three.js and React Three Fiber
- **Modern Design**: Beautiful, responsive UI with glassmorphism and gradient effects
- **Dynamic Content**: All content managed through MongoDB
- **CRM Admin Panel**: Full-featured admin interface for managing projects, skills, experience, blog posts, and settings
- **Authentication**: Secure admin authentication with NextAuth.js
- **Blog System**: Complete blog with markdown support
- **Contact Form**: Functional contact form with message management
- **SEO Optimized**: Sitemap, robots.txt, and proper metadata 

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **3D Libraries**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion, Lottie React
- **Backend**: Next.js API Routes, MongoDB (Mongoose)
- **Authentication**: NextAuth.js (email/password)
- **UI Components**: Radix UI, shadcn/ui patterns

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or cloud like MongoDB Atlas)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
```

4. Create an admin user:
Run the create-admin script:

```bash
npm run create-admin [email] [password]
```

Example:
```bash
npm run create-admin admin@example.com mypassword123
```

If no arguments are provided, it will use default credentials:
- Email: admin@example.com
- Password: admin123

**Important**: Change the default password after first login!

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Panel

Access the admin panel at `/admin/dashboard` after logging in at `/login`.

### Admin Features

- **Dashboard**: Overview of all content statistics
- **Projects**: Create, edit, delete, and reorder projects
- **Skills**: Manage skills with categories and proficiency levels
- **Experience**: Add and manage work experience entries
- **Blog**: Create and manage blog posts with markdown support
- **Messages**: View and manage contact form submissions
- **Settings**: Configure site metadata, hero text, about text, and social links

## Project Structure

```
app/
├── (auth)/          # Authentication pages
├── (crm)/           # Admin panel
├── (portfolio)/     # Public portfolio pages
├── api/             # API routes
├── blog/            # Blog post pages
└── components/      # React components
    ├── 3d/          # 3D components
    ├── sections/    # Portfolio sections
    └── ui/          # UI components
lib/
├── db.ts            # MongoDB connection
├── models/          # Mongoose models
└── utils.ts         # Utility functions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set:
- `MONGODB_URI`: Your production MongoDB connection string
- `NEXTAUTH_URL`: Your production URL (e.g., https://yourdomain.com)
- `NEXTAUTH_SECRET`: A strong random secret

## Customization

### Colors and Styling

The design uses Tailwind CSS. Main colors are defined in the components:
- Primary: Purple/Pink gradients
- Background: Slate 900/800
- Accents: Purple 600, Pink 600

### 3D Components

3D components are in `components/3d/`:
- `Hero3D.tsx`: Animated particle background
- `SkillSphere.tsx`: Interactive 3D skill sphere
- `ProjectCard3D.tsx`: 3D project cards

### Content Management

All content is managed through the admin panel. No code changes needed to update:
- Projects
- Skills
- Experience
- Blog posts
- Site settings

## Performance

- Images are optimized with Next.js Image component
- 3D rendering is optimized for performance
- Code splitting and lazy loading implemented
- SEO optimized with proper metadata

## License

MIT License - feel free to use this for your own portfolio!

## Support

For issues or questions, please open an issue on GitHub.
