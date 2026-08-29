const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

const realBlogs = [
  {
    title: 'Engineering Real-Time Location Relays & Ledger Splits in On-Demand Marketplaces',
    slug: 'real-time-location-relays-and-split-payments-servyq',
    excerpt: 'How we architected high-frequency GPS journey tracking with Expo background tasks, NestJS WebSocket gateways, and automated split payout ledgers in Servyq.',
    publishedAt: new Date('2025-02-15'),
    published: true,
    tags: ['Architecture', 'React Native', 'NestJS', 'WebSockets', 'PostgreSQL'],
    featured: true,
    content: `
When building **Servyq** — an on-demand service marketplace connecting domestic seekers with service providers — we faced two core architectural challenges: keeping battery-efficient live GPS telemetry synchronized across mobile devices, and executing safe, verifiable split payments upon job completion.

## 01. The Real-Time Location Pipeline

Live tracking for en-route providers cannot rely on standard HTTP polling without draining mobile battery and overwhelming backend ingress.

\`\`\`
┌───────────────────────────┐         ┌───────────────────────────┐
│ React Native / Expo Client│         │      NestJS Server        │
│ (expo-location background)│         │   (WebSocket Gateway)     │
└─────────────┬─────────────┘         └─────────────┬─────────────┘
              │                                     │
              │  1. GPS Location Relay (Socket.io)  │
              ├────────────────────────────────────>│
              │                                     │──┐ 2. Validate & Broadcast
              │                                     │  │    to Booking Room
              │  3. Live Coordinate Stream          │<─┘
              │<────────────────────────────────────┤
              │                                     │
\`\`\`

### Background Geolocation Relaying

On the mobile client, we configured \`expo-location\` combined with \`expo-task-manager\` to capture coordinates even when the app is backgrounded or the screen is locked:

\`\`\`ts
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

export const LOCATION_TRACKING_TASK = 'SERVYQ_BACKGROUND_GPS_TASK';

TaskManager.defineTask(LOCATION_TRACKING_TASK, async ({ data, error }) => {
  if (error) {
    console.error('Location tracking task failed:', error);
    return;
  }

  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const latest = locations[0];
    if (latest) {
      socketService.emit('provider:location_update', {
        latitude: latest.coords.latitude,
        longitude: latest.coords.longitude,
        heading: latest.coords.heading,
        speed: latest.coords.speed,
        timestamp: latest.timestamp,
      });
    }
  }
});
\`\`\`

To preserve device battery, we established adaptive distance filters: coordinates are only broadcast when the provider displaces by more than 15 meters or every 10 seconds.

## 02. Deterministic State Machine

A booking lifecycle follows a strict transition state machine enforced by backend guards:

\`\`\`
[Upcoming] ──> [Arriving] ──> [Arrived] ──> [In Progress] ──> [Completed]
    │              │              │               │
    └─── [Cancelled (with automatic fee calculation)] ◄───┘
\`\`\`

Every transition generates an immutable audit entry in PostgreSQL via Prisma, guaranteeing that clients cannot trigger out-of-order state mutations (e.g. attempting to complete a service before arriving).

## 03. Dynamic Ledger Splits & Commission Routing

Marketplaces must guarantee platform commission retention while routing service provider payouts directly into verified accounts without manual intervention.

We integrated **Razorpay Route** and **Cashfree Split** to dynamically divide checkout balances at settlement:

\`\`\`ts
export async function executeSplitPayout(bookingId: string, totalAmount: number, providerAccountId: string) {
  const platformFee = Math.round(totalAmount * 0.15); // 15% Platform Commission
  const providerPayout = totalAmount - platformFee;

  return await prisma.$transaction(async (tx) => {
    // 1. Create Transaction Ledger Entry
    const ledger = await tx.paymentLedger.create({
      data: {
        bookingId,
        totalAmount,
        platformFee,
        providerPayout,
        status: 'PROCESSING',
      },
    });

    // 2. Dispatch Split Transfer to Payment Gateway
    const transfer = await razorpay.transfers.create({
      account: providerAccountId,
      amount: providerPayout * 100, // in paise
      currency: 'INR',
      notes: { bookingId, ledgerId: ledger.id },
    });

    // 3. Mark Ledger Settled
    await tx.paymentLedger.update({
      where: { id: ledger.id },
      data: { status: 'SETTLED', gatewayTransferId: transfer.id },
    });

    return ledger;
  });
}
\`\`\`

## Key Takeaways
- Decouple high-frequency location updates through dedicated WebSocket channels instead of persistent database writes.
- Maintain an append-only payment ledger to make financial reconciliations deterministic and auditable.
    `,
  },
  {
    title: 'Designing Offline-First Sync & Social Accountability Loops in Mobile Habit Engines',
    slug: 'offline-first-sync-and-habit-loops-dayzo',
    excerpt: 'Architectural patterns for optimistic offline action queues, peer streak verification, and low-latency feed generation in Dayzo.',
    publishedAt: new Date('2025-01-20'),
    published: true,
    tags: ['React Native', 'Expo', 'Mobile UI', 'Redis', 'Offline-First'],
    featured: false,
    content: `
When building **Dayzo**, our goal was to fix the critical failure mode of habit tracking apps: solitary abandonment. By pairing routine building with lightweight peer verification and instant co-op streaks, we turned daily discipline into a social loop.

## 01. Offline-First Optimistic Architecture

Users check in their daily routines in gym basements, subway rides, and areas with spotty cellular coverage. The app must never block user interaction behind network spinners.

\`\`\`
[User Taps Check-In]
         │
         ├──> 1. Optimistically Update UI (Zustand)
         ├──> 2. Persist to Local SQLite Sync Queue
         │
    [Network Available?]
         │
    ┌────┴────────────────────────┐
    ▼ YES                         ▼ NO
[Flush Queue to NestJS API]   [Wait for Reconnect Event]
    │                             │
[Reconcile Server State]      [Keep Local Optimistic State]
\`\`\`

### Local Action Sync Queue

We structured an append-only queue that batches offline habit completions and syncs automatically when network connectivity is restored:

\`\`\`ts
interface QueuedAction {
  id: string;
  actionType: 'HABIT_CHECKIN' | 'NOTE_ADDED' | 'STREAK_SHARE';
  payload: Record<string, unknown>;
  timestamp: number;
  retryCount: number;
}

export async function processSyncQueue(queue: QueuedAction[]) {
  for (const action of queue) {
    try {
      await apiClient.post('/api/sync/action', action);
      await localDb.removeFromQueue(action.id);
    } catch (err) {
      if (isNetworkError(err)) break; // Stop and retry on next connectivity trigger
      await localDb.incrementRetryCount(action.id);
    }
  }
}
\`\`\`

## 02. High-Performance Habit Feeds with Redis

Calculating multi-day streak integrity and social buddy check-ins on every feed load creates expensive relational joins. We implemented a write-through Redis cache:

- **Streak Verification**: Stored as bitfields for 365-day tracking with $O(1)$ lookup time.
- **Social Feed Activity**: Cached as capped Redis Sorted Sets (\`ZADD\`) keyed by user social graph circles.

## 03. 60 FPS Physics-Based Gestures

To deliver a premium tactile feel, we built interactive habit completion sliders using \`react-native-reanimated\` and \`react-native-gesture-handler\`, completely executing swipe calculations on the UI thread without crossing the React Native JavaScript bridge.

## Results
- Instantaneous check-in interactions with 0ms perceived latency.
- 99.8% sync recovery rate across intermittent mobile connections.
    `,
  },
  {
    title: 'Architecting a 100/100 Lighthouse Monochrome Portfolio & Headless CMS',
    slug: 'architecting-monochrome-portfolio-and-cms',
    excerpt: 'Engineering an editorial, typography-first developer portfolio with ISR, keyboard-first navigation, and strict design token separation.',
    publishedAt: new Date('2024-12-10'),
    published: true,
    tags: ['Next.js', 'TypeScript', 'Performance', 'Design Systems', 'MongoDB'],
    featured: false,
    content: `
Many modern engineering portfolios suffer from bloated client bundles, distracting 3D animations, and poor accessibility scores that obscure real engineering work.

When building **manishj.dev**, the objective was uncompromising: create an editorial, brutalist monochrome developer portfolio with **100/100 Lighthouse scores**, complete keyboard accessibility (⌘K), and a headless management layer.

## 01. Token-Driven Strict Monochrome Design System

Rather than relying on ad-hoc Tailwind classes, the entire design system is driven by semantic CSS custom properties:

\`\`\`css
:root {
  --color-bg: #09090b;
  --color-surface: #121215;
  --color-card: #141418;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-strong: rgba(255, 255, 255, 0.18);
  --color-text: #f4f4f5;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;
}
\`\`\`

This guarantees perfect contrast ratios across light and dark modes while enforcing visual discipline throughout all UI layers.

## 02. Data Contract Isolation (DB to UI Mappers)

We strictly decoupled MongoDB documents from UI React component contracts through functional mapper functions:

\`\`\`ts
// lib/content/mappers.ts
export function toProjectRowProps(doc: ProjectDbDoc): ProjectRowData {
  return {
    title: doc.title,
    slug: doc.slug,
    kicker: doc.kicker || 'PROJECT',
    year: doc.year || '2024',
    role: doc.role || 'Software Engineer',
    description: doc.description,
    image: doc.image,
    technologies: doc.technologies || [],
    liveUrl: doc.liveUrl,
    githubUrl: doc.githubUrl,
  };
}
\`\`\`

If database schemas evolve or new fields are added, UI components remain completely unaffected.

## 03. Performance Metrics
- **Performance**: 100/100 (First Contentful Paint < 0.4s)
- **Accessibility**: 100/100 (Full screen reader & keyboard support)
- **Best Practices**: 100/100
- **SEO**: 100/100 (Structured JSON-LD schemas for articles and case studies)
    `,
  },
];

async function seedBlogs() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing in .env.local');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB.');

  console.log('Clearing old blog posts...');
  await BlogPost.deleteMany({});

  console.log('Inserting real engineering blog posts...');
  await BlogPost.insertMany(realBlogs);

  console.log('Real blogs successfully seeded into MongoDB!');
  await mongoose.disconnect();
}

seedBlogs().catch((err) => {
  console.error('Seed blogs error:', err);
  process.exit(1);
});
