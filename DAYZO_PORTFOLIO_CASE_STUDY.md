# DAYZO — Full-Stack Gamified Social Productivity Ecosystem

> **Portfolio Case Study & Technical Documentation**  
> *A high-impact, enterprise-grade gamified habit-building ecosystem combining a React Native/Expo mobile application, a Nest.js/PostgreSQL backend engine, and a Next.js real-time admin analytics dashboard.*

---

## 🚀 Executive Summary

**Dayzo** is a bleeding-edge, full-stack social productivity platform designed to solve the habit-attrition problem through gamification, social accountability, and viral feedback loops. Unlike generic habit trackers, Dayzo treats daily personal discipline as an RPG (Role-Playing Game) and team sport. 

Users form cooperative **Squads**, engage in timed competitive **Squad Wars**, climb live dynamic leaderboards, and capture customizable, glassmorphic **3D Achievement Cards** which can be shared seamlessly to social platforms (Instagram, Snapchat, WhatsApp) in a single tap. 

To support this rich client experience, the platform is backed by a highly secure modular Nest.js microservice architecture, custom PostgreSQL database structures governed by Prisma ORM, and an executive Next.js administrative suite featuring granular Role-Based Access Control (RBAC), JSON-difference auditing, content moderation pipelines, and a remote feature-flag system.

---

## 🛠️ The Tech Stack (Ecosystem Blueprint)

The platform is architected as three specialized, decoupled workspaces optimized for performance, scalability, and cross-platform synchronization:

```
                      ┌──────────────────────────────────────────────┐
                      │              Nest.js Backend                 │
                      │   TypeScript | PostgreSQL | Prisma ORM      │
                      │      Docker | Socket.io WebSockets           │
                      └──────────────┬────────────────┬──────────────┘
                                     │                │
                JSON REST APIs       │                │    Real-time Sync
                Real-time updates     │                │    & Dynamic State
                                     ▼                ▼
          ┌───────────────────────────────┐        ┌───────────────────────────────┐
          │      Next.js Admin Panel      │        │      Expo Mobile Client       │
          │ React | TypeScript | Tailwind │        │ React Native | Zustand | Reanimated│
          │ TanStack Query | Recharts     │        │ NativeWind 4 | View Shot | Sharing│
          └───────────────────────────────┘        └───────────────────────────────┘
```

### 📱 Mobile Client (`dayzo-mobile`)
* **Core Framework:** **Expo SDK 56 & React Native** (React 19 & React Native 0.85)
* **Routing System:** File-system-based navigation via `expo-router`
* **State Management:** Asynchronous remote caching and pre-fetching via `@tanstack/react-query` v5, combined with lightweight client state powered by `zustand` v5.
* **UI & Styling:** Responsive utility-first layouts using **NativeWind v4** (Tailwind CSS engine) with bespoke Glassmorphic ambient shadows via `expo-linear-gradient`.
* **Animations:** Fluid, high-framerate, physics-based micro-interactions driven by `react-native-reanimated` v4.
* **Social Engine:** Dynamic canvas scaling, snapshot generation via `react-native-view-shot`, and native sharing intents triggered by `expo-sharing`.
* **Real-time Engine:** WebSockets integration using `socket.io-client`.

### ⚙️ Backend Core (`dayzo-backend`)
* **Architecture:** Modular **Nest.js** container leveraging TypeScript dependency injection for clean separation of concerns.
* **Database & ORM:** **PostgreSQL** paired with **Prisma ORM** for type-safe queries, migration management, advanced index optimization, and relational cascade deletes.
* **Real-time Gateway:** Socket.io server namespace handling duplex communication for leaderboards, squad chats, and live event syncing.
* **Infrastructure:** Fully containerized setup using **Docker & Docker Compose** for reproducible environments.

### 📊 Admin Console (`dayzo-admin`)
* **Framework:** **Next.js 16** leveraging the App Router and Server Components.
* **Data Layer:** High-caching client state sync using TanStack Query.
* **Visualizations:** Custom analytical charts, growth lines, and grid heatmaps built with **Recharts**.
* **Styling & Transitions:** Framer Motion animations embedded in a clean tailwind-styled administrative UI.

---

## ✨ Core Platform Features & User Experience

### 1. The RPG Gamification Engine
* **XP & Leveling:** Users earn Experience Points (XP) by completing daily challenges. XP curves are calculated dynamically at runtime to scale leveling difficulty.
* **Habit Streaks:** Implements Duolingo-style streak tracking. If a user misses a day, their streak resets unless they consume a "Streak Freeze Shield" (bought with in-app achievement points).
* **28-Day Consistency Heatmap:** A visual contribution grid in the profile screen (similar to GitHub's commit grid) displaying challenge completion densities over the past 28 days using custom memory-efficient mapping algorithms.

### 2. Social Squads & Multiplayer "Squad Wars"
* **Squad Formations:** Users join cooperative groups (Squads) that share a collective chat, squad-specific XP, and shared weekly goals.
* **Squad Wars:** Timed, themed multiplayer events where Squads go head-to-head. Real-time updates are pushed via WebSockets to synchronize live progress boards.
* **Dynamic Regional Leaderboards:** Real-time user and squad rankings updated using high-performance database indexing and Redis-like caching queries.

### 3. Customizable Glassmorphic Achievement Cards
* **Generative Canvas:** Users customize earned milestone cards, modifying card geometries (Portal, Shield, Sharp, Rectangle), adjusting aesthetic rarity borders (Common, Rare, Epic, Legendary, Mythic), and blending ambient neon backdrop glows.
* **Viral Native Share Pipeline:** Built-in rasterization converts React Native element hierarchies into beautiful, standalone sharing graphics mapped to exact 9:16 portrait ratios, allowing instant uploads to Instagram Stories and other social feeds.

### 4. Admin Management, Auditing & Moderation
* **Granular RBAC:** Complete Role-Based Access Control system limiting access to administrative endpoints based on specific resource actions (`CREATE`, `READ`, `UPDATE`, `DELETE`) across modules (`USERS`, `CHALLENGES`, `SQUADS`, etc.).
* **Delta Audit Trails:** Automated system tracking all administrative database modifications, capturing precise "Before vs. After" JSON differences, actor IP addresses, and user-agent metadata.
* **Moderation Pipeline:** Live monitoring dashboard to review, flag, and remove offensive comments, user profiles, and squad channels.
* **Push Campaign Manager:** Targets specific user cohorts (e.g., inactive users, high-streak users) with segmented push notifications to boost daily app re-engagement.

---

## 🛠️ Technical Case Studies (Engineering Deep Dives)

### 📐 Deep Dive A: Responsive Milestone Card Customizer & Sharing Pipeline
* **The Challenge:** Milestone cards customized in the app need to look identical when shared on various external social networks. Exporting React Native views directly via rasterization often results in blurry assets, broken aspect ratios, or distorted layout boundaries due to differing pixel densities across iOS and Android devices.
* **The Solution:** Developed a custom **dynamic scaling engine** within [AchievementCard.tsx](file:///Users/mittr/Documents/Personal-Manish/2026/dayzo/dayzo-mobile/src/components/AchievementCard.tsx). This component calculates a relative dimension multiplier based on the target viewport (1:1 square or 9:16 portrait layout). Elements, absolute gradient vectors, and typography are mathematically scaled rather than absolute-positioned.
* **The Rasterization Pipeline:**
  1. A hidden canvas container (`ShareCanvas`) mounts the calculated target resolution (e.g., 1080x1920 for Stories).
  2. The customized parameters (card shape, rarity gradient, username, XP rewards) are injected into the scale-engine.
  3. `react-native-view-shot` takes an off-screen high-quality snapshot (0.98 PNG) of the rendered hidden view.
  4. The local file URI is passed directly to `expo-sharing`, launching the OS-native share sheet for zero-latency uploads to social networks.

```typescript
// Conceptual rendering matrix inside AchievementCard
const scale = cardWidth / BASE_DESIGN_WIDTH;
const cardStyle = {
  width: cardWidth,
  height: cardHeight,
  borderRadius: getShapeRadius(cardShape) * scale,
  borderWidth: 2 * scale,
};
const titleSize = 24 * scale;
```

---

### 🛡️ Deep Dive B: Modular Nest.js RBAC Architecture with JSON Diff Audit Logging
* **The Challenge:** Managing administrative operations on user data, gamification settings, and squads requires high-level security. Every administrative action must be authorized down to the resource level and recorded in an immutable ledger containing the exact values changed to prevent malicious data edits or accidental losses.
* **The Solution:** Designed a declarative, decorator-driven **Access Control & Auditing Framework** inside the Nest.js backend layer:
  1. **Declarative Guards:** Controllers are decorated with `@RequirePermissions({ resource: 'CHALLENGES', action: 'UPDATE' })`. The guard checks the request's authenticated JWT, queries the admin user's assigned role inside the PostgreSQL schema, and evaluates the permission matrix.
  2. **JSON Record Differencing:** Created a Nest.js interceptor that hooks into admin mutations. Prior to execution, the interceptor fetches the current database record. After the service resolves, it fetches the updated record, computes the JSON difference (old value vs. new value), and logs a comprehensive record in the `AuditLog` table.

```typescript
// Prisma schema models supporting this architecture
model AdminRole {
  id          String       @id @default(uuid())
  name        String       @unique // e.g., "Moderator", "SuperAdmin"
  permissions Permission[]
  users       User[]
}

model AuditLog {
  id          String   @id @default(uuid())
  actorId     String
  action      String   // e.g., "UPDATE_CHALLENGE"
  targetId    String
  beforeState Json     // Before modification snapshot
  afterState  Json     // After modification snapshot
  ipAddress   String
  userAgent   String
  createdAt   DateTime @default(now())
}
```

---

### 🔄 Deep Dive C: Real-time WebSockets Sync & Leaderboard State Reconciliation
* **The Challenge:** During interactive Squad Wars, multiple team members are completing challenges simultaneously. Displaying delayed standings kills the user experience. However, polling PostgreSQL directly on every completed action causes severe database bottlenecking under peak loads.
* **The Solution:** Implemented a event-driven, WebSocket-powered **real-time synchronization layer** using Socket.io:
  1. When a user completes a challenge, the backend Nest.js handler writes the transaction to PostgreSQL via Prisma.
  2. Simultaneously, a background event is dispatched to the `SquadsGateway` and `LeaderboardModule`.
  3. The gateway recalculates the affected squads' XP score and broadcasts a room event to all online squad members.
  4. On the mobile client, the React Native application listens to socket events using `socket.io-client` inside a custom hook, triggering a React Query invalidation query that instantly reconciles client state without full-page reloads.

---

## 📊 Database Architecture (Selected Prisma Models)

The core database is designed with robust referential integrity, compound indexes to accelerate search queries, and modular relationships. Below is an architectural sample of the PostgreSQL database schema:

```prisma
model User {
  id            String    @id @default(uuid())
  email         String    @unique
  username      String    @unique
  passwordHash  String
  xp            Int       @default(0)
  level         Int       @default(1)
  streak        Int       @default(0)
  longestStreak Int       @default(0)
  streakFreezes Int       @default(1)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  isOnboarded   Boolean   @default(false)

  challenges    UserChallenge[]
  badges        UserBadge[]
  squadId       String?
  squad         Squad?      @relation(fields: [squadId], references: [id], onDelete: SetNull)
  comments      Comment[]
  feedPosts     FeedPost[]
}

model Squad {
  id          String    @id @default(uuid())
  name        String    @unique
  description String?
  logo        String?
  totalXp     Int       @default(0)
  createdAt   DateTime  @default(now())
  
  members     User[]
  warId       String?
  squadWar    SquadWar? @relation(fields: [warId], references: [id], onDelete: SetNull)
}

model UserChallenge {
  id          String    @id @default(uuid())
  userId      String
  challengeId String
  status      String    // "IN_PROGRESS", "COMPLETED", "FAILED"
  completedAt DateTime?
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  challenge   Challenge @relation(fields: [challengeId], references: [id], onDelete: Cascade)
  
  @@unique([userId, challengeId])
}
```

---

## 🔑 Key Features and Tech Mapping

The following matrix maps the technical solutions directly to the user-facing business values they create:

| Technical System | Modules & Libraries | UX / Product Value |
| :--- | :--- | :--- |
| **RPG Habit Engine** | Mongoose / Prisma Models, custom XP Curve algorithms | Drives user habit stickiness using proven gaming psychological loops. |
| **Glassmorphic Share Engine** | `react-native-view-shot`, `expo-sharing`, dynamic canvas calculations | Promotes viral organic user growth by sharing gorgeous visual milestones to social feeds. |
| **Multiplayer Squad Mode** | Nest.js Gateways, Socket.io, React Native real-time socket events | Increases app stickiness by adding cooperative accountability structures. |
| **Operational Analytics Desk** | Next.js App Router, Recharts, TanStack Query | Allows site operators to track DAU/MAU, user registrations, and gamification balances. |
| **Granular Security Controls** | Nest.js Custom Guards, JSON delta interceptors, Prisma audit ledgers | Secures admin actions, prevents fraud, and gives complete traceability over database edits. |

---

## 📈 Future Scalability Path

To scale the platform to support millions of concurrent active users, the proposed roadmap includes:
1. **Redis Caching Integration:** Implement Redis to cache leaderboard states and session-token validations, reducing database query overhead.
2. **WebSocket Scaling via Redis Adapter:** Use Redis pub/sub adapters to coordinate Socket.io servers across multiple containerized instances behind a load balancer.
3. **Optimized Image Processing CDN:** Deploy an image processing microservice using AWS S3 and CloudFront/Cloudinary to dynamically size user avatars and shared milestone graphics at the edge.
4. **AI-Powered Challenge Recommender:** Run simple recommendation models on user history to recommend personalized daily habits based on current levels and engagement fields.
