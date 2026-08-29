import 'server-only';
import connectDB from '@/lib/db';
import BlogPost, { IBlogPost } from '@/lib/models/BlogPost';

export interface PublicBlogPostItem {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
}

export interface PublicBlogPostDetail extends PublicBlogPostItem {
  content: string;
  prevPost?: { title: string; slug: string };
  nextPost?: { title: string; slug: string };
}

function calculateReadTime(content: string): string {
  const words = (content || '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

const FALLBACK_BLOG_POSTS: PublicBlogPostDetail[] = [
  {
    title: 'Architecting Event-Driven Mobile Backends with NestJS and Redis',
    slug: 'architecting-event-driven-mobile-backends',
    excerpt: 'How to structure WebSocket channels, pub/sub queues, and database locking for low-latency live tracking and order state machines.',
    publishedAt: '2025-02-15',
    tags: ['Architecture', 'NestJS', 'Redis', 'WebSockets'],
    readTime: '6 min read',
    featured: true,
    content: `
# Architecting Event-Driven Mobile Backends

When building real-time mobile applications — such as on-demand service dispatchers, live transit monitors, or multi-role commerce apps — request/response HTTP cycles are insufficient for maintaining consistent UI state across active clients.

## The Dual-Layer Architecture

A resilient architecture decouples state mutation from broadcast fan-out:

\`\`\`
Client Action -> API Gateway (NestJS) -> Database Transaction (PostgreSQL)
                                      \\-> Event Publish (Redis Pub/Sub)
                                            \\-> WebSocket Cluster -> Active Clients
\`\`\`

### 1. Transactional Integrity First

Never broadcast an event before the underlying database transaction commits. If the client receives a \`DISPATCH_ASSIGNED\` socket message before the database writes the assignment record, any subsequent API query from the client will race against the uncommitted state.

### 2. Idempotent Redis Event Channels

Structure Redis channel naming by domain boundary:
\`service:order:<order_id>:events\`
\`service:geo:<technician_id>:telemetry\`

Each message payload should contain a monotonic version counter to let mobile clients discard out-of-order packets during spotty mobile connectivity.

## Resilient Mobile Socket Reconnection

On the React Native / Expo client side, maintain an offline optimistic state queue. When reconnecting after cellular dropouts:
- Send the last acknowledged event timestamp
- Server replays missed delta events
- Client applies reconciliation before unfreezing UI interactions
    `,
  },
  {
    title: 'Zero-Runtime Design Systems in React Native: Patterns & Pitfalls',
    slug: 'zero-runtime-design-systems-react-native',
    excerpt: 'Best practices for implementing strict design token systems with high frame rate performance across Android and iOS.',
    publishedAt: '2025-01-20',
    tags: ['React Native', 'Mobile UI', 'Performance', 'TypeScript'],
    readTime: '5 min read',
    featured: false,
    content: `
# Zero-Runtime Design Systems in React Native

Maintaining a unified typography, color token, and spacing rhythm across hundreds of mobile screens requires strict architectural guardrails.

## Why Runtime Theme Calculation Hurts Frame Rates

Recalculating responsive dimensions and heavy style objects inside render loops degrades 60fps gesture handling during complex scroll interactions.

### The Token-First Component Contract

Define primitive design tokens at compile-time using TypeScript \`as const\` structures:

\`\`\`ts
export const TOKENS = {
  spacing: { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32 },
  typography: {
    display: { fontSize: 32, lineHeight: 40, fontFamily: 'Mono-Bold' },
    body: { fontSize: 14, lineHeight: 22, fontFamily: 'Sans-Regular' },
  },
} as const;
\`\`\`

## Key Takeaways
1. Avoid unnecessary nesting of layout wrappers.
2. Hoist static styles outside React component bodies.
3. Leverage hardware-accelerated transforms for animations.
    `,
  },
  {
    title: 'Pragmatic Database Migrations and Index Optimization in PostgreSQL',
    slug: 'pragmatic-database-migrations-postgresql',
    excerpt: 'Index strategies, query plan analysis, and zero-downtime schema evolution for growing production workloads.',
    publishedAt: '2024-12-10',
    tags: ['PostgreSQL', 'Databases', 'Performance', 'Prisma'],
    readTime: '4 min read',
    featured: false,
    content: `
# Pragmatic Database Migrations in PostgreSQL

As data volume grows, unindexed foreign keys and table-locking migrations become major availability bottlenecks.

## Composite Indexing for Temporal Queries

When filtering by tenant or user ID and ordering by creation timestamp, composite indexes are essential:

\`\`\`sql
CREATE INDEX CONCURRENTLY idx_orders_user_created 
ON orders (user_id, created_at DESC);
\`\`\`

## Safe Column Additions
- Always use \`ADD COLUMN ... DEFAULT NULL\` when adding nullable fields to large tables.
- Populate default values in batched background workers to avoid long-running exclusive locks.
    `,
  },
];

export async function getPublicBlogList(): Promise<PublicBlogPostItem[]> {
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: { $ne: false } })
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();

    if (posts && posts.length > 0) {
      return posts.map((p) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || '',
        coverImage: p.coverImage || '',
        publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : new Date(p.createdAt).toISOString(),
        tags: p.tags || [],
        readTime: calculateReadTime(p.content || ''),
        featured: p.featured || false,
      }));
    }
  } catch (error) {
    console.error('getPublicBlogList database error:', error);
  }

  return FALLBACK_BLOG_POSTS.map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    publishedAt: p.publishedAt,
    tags: p.tags,
    readTime: p.readTime,
    featured: p.featured,
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<PublicBlogPostDetail | null> {
  const cleanSlug = slug.toLowerCase().trim();

  try {
    await connectDB();
    const postDoc = await BlogPost.findOne({
      slug: cleanSlug,
      published: { $ne: false },
    }).lean();

    if (postDoc) {
      const allPosts = (await BlogPost.find({ published: { $ne: false } })
        .sort({ publishedAt: -1, createdAt: -1 })
        .select('title slug')
        .lean()) as Array<{ title: string; slug: string }>;

      const currentIndex = allPosts.findIndex((p) => p.slug === cleanSlug);
      const prevPost =
        currentIndex > 0
          ? { title: allPosts[currentIndex - 1].title, slug: allPosts[currentIndex - 1].slug }
          : undefined;
      const nextPost =
        currentIndex >= 0 && currentIndex < allPosts.length - 1
          ? { title: allPosts[currentIndex + 1].title, slug: allPosts[currentIndex + 1].slug }
          : undefined;

      return {
        title: postDoc.title,
        slug: postDoc.slug,
        excerpt: postDoc.excerpt || '',
        content: postDoc.content || '',
        coverImage: postDoc.coverImage || '',
        publishedAt: postDoc.publishedAt
          ? new Date(postDoc.publishedAt).toISOString()
          : new Date(postDoc.createdAt).toISOString(),
        tags: postDoc.tags || [],
        readTime: calculateReadTime(postDoc.content || ''),
        featured: postDoc.featured || false,
        prevPost,
        nextPost,
      };
    }
  } catch (error) {
    console.error(`getBlogPostBySlug error for slug "${slug}":`, error);
  }

  const fallback = FALLBACK_BLOG_POSTS.find((p) => p.slug === cleanSlug);
  if (fallback) {
    return fallback;
  }

  return null;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    await connectDB();
    const posts = (await BlogPost.find({ published: { $ne: false } })
      .select('slug')
      .lean()) as Array<{ slug: string }>;

    if (posts && posts.length > 0) {
      return posts.map((p) => p.slug).filter(Boolean);
    }
  } catch (error) {
    console.error('getAllBlogSlugs error:', error);
  }

  return FALLBACK_BLOG_POSTS.map((p) => p.slug);
}
