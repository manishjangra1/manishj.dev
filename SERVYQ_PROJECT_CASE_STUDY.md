# Servyq (On-Demand Services Ecosystem) — Master Case Study & System Architecture

> **Premium Real-Time On-Demand Home Services Platform (Expo iOS/Android, NestJS, WebSockets, PostgreSQL, & Commission Split Gateway Routing)**  
> *A state-of-the-art service marketplace connecting Customers seeking domestic help (Cleaners, Cooks, Babysitters, Drivers) with verified Service Providers. Powered by dual-role React Native client architectures, high-frequency geofencing location relays, in-app WebSocket messaging rooms, and dynamic transactional ledger splits via Razorpay Route & Cashfree.*

---

## 🌟 Executive Summary

**Servyq** is a premium, real-time, on-demand local services platform architected to close the gap between domestic service seekers (**Customers**) and independent service practitioners (**Service Providers**). The ecosystem is divided into a high-performance cross-platform mobile client (`servyq`) built on React Native & Expo, and an enterprise-grade backend server (`servyq-server`) engineered using NestJS.

The system addresses the critical operational, financial, and safety issues of on-demand marketplaces:
1. **Dynamic Discoverability & Radius Matching:** Tailored search and filtering by Category (e.g., Cleaning, Cooking, Babysitting, Eldercare, Driving) with geographic proximity scoring.
2. **Deterministic Lifecycle State Machine:** Standardized booking stages (`Upcoming` $\rightarrow$ `Arriving` $\rightarrow$ `Arrived` $\rightarrow$ `In Progress` $\rightarrow$ `Completed` / `Cancelled`) protecting the transaction at each step.
3. **High-Frequency GPS Journey Tracking:** Live coordinate stream using standard socket coordination and low-power background background location tasks for en-route providers.
4. **Instant In-App Chat Rooms:** Event-driven real-time chat with message receipt confirmation.
5. **Split Payment Gateways & Ledger Auditing:** Automated checkout splitting via **Razorpay Route** and **Cashfree Split** to dynamically direct platform commissions and route provider payouts into a transaction-safe virtual wallet ledger.

---

## 🛠️ Global Technology Stack

| Layer | Technology | Primary Libraries / Frameworks |
| :--- | :--- | :--- |
| **Frontend Mobile Client** | **React Native (Expo SDK 54)** | TypeScript, Expo Router v6 (Link-based nested route styling), Zustand v5, React Hook Form, Zod validation |
| **Native Device Hardware** | **Expo APIs** | `expo-location` (High-accuracy GPS), `expo-task-manager` (Background services), `expo-notifications`, `expo-secure-store`, `@react-native-google-signin/google-signin` |
| **Frontend UI/UX** | **Premium Interface** | Custom HSL-based Semantic Design System (Light/Dark themes), `react-native-maps`, `lottie-react-native` vector micro-animations, `react-native-reanimated`, `expo-blur` glassmorphism |
| **Backend API Gateway** | **NestJS v11 (NodeJS 22.12+)** | REST API, TypeScript, BullMQ Queueing, Redis Pub/Sub, Passport JWT security, EventEmitter2 |
| **Database & Persistence** | **PostgreSQL + Prisma ORM** | Prisma Client (v7.6.0) with relational pooling, `@prisma/adapter-pg` |
| **Real-time Comms** | **WebSockets (Socket.IO)** | `socket.io-client` (Frontend) + `@nestjs/websockets` (Backend Socket Gateways) |
| **Cloud Integrations** | **Third-party Services** | Cloudinary (Media Streaming & Upload), Nodemailer (Transactional Mailers), Razorpay & Cashfree SDKs, Expo Server SDK (Push Notifications) |

---

## 📐 Unified System Architecture & Data Flow

The Servyq ecosystem leverages a decoupled API and real-time socket layer. Data flows dynamically between the mobile apps, the NestJS controllers, the Redis queue managers, and the PostgreSQL database:

```
                            ┌────────────────────────────────────────┐
                            │         PostgreSQL Database            │
                            │           (Prisma ORM)                 │
                            └───────────────────▲────────────────────┘
                                                │
                                                ▼ (Transactional Data)
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   NestJS Backend API                                   │
 ├────────────────────────────────────────┬───────────────────────────────────────────────┤
 │       REST Controllers (HTTP)          │             SocketGateways (WS)               │
 │  Auth, Bookings, Payments, Users       │  RequestsGateway, ChatGateway, Presence       │
 │  BullMQ Task Queue & Redis Broker      │  GPS Live Location Broadcaster                │
 └──────────────────▲─────────────────────┴──────────────────────▲────────────────────────┘
                    │                                            │
                    ▼ (JSON REST Payloads)                       ▼ (Socket Events / GPS)
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │                              React Native / Expo Client                                │
 ├────────────────────────────────────────┬───────────────────────────────────────────────┤
 │         Customer Tab Group             │             Provider Tab Group                │
 │  Categories & Radius Search            │  Availability Toggle & Live Requests          │
 │  Checkout & Razorpay Native SDK        │  Background Location Service (expo-task)      │
 │  Zustand Session & Map Stores          │  Wallet Ledger & Bank Account Setup           │
 └────────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 💾 Relational Database Schema Blueprint (`schema.prisma`)

The database layer utilizes PostgreSQL, structured and queried via Prisma. The schema centers on a core `User` model, branching into dedicated client profiles, connected via bookings, dynamic pricing lists, real-time message tables, and financial audit logs.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  CUSTOMER
  PROVIDER
}

enum UserStatus {
  ACTIVE
  DEACTIVATED
  PENDING_DELETION
}

enum PaymentGateway {
  RAZORPAY
  CASHFREE
}

enum BookingStatus {
  UPCOMING
  ARRIVING
  ARRIVED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum TransactionType {
  CREDIT
  DEBIT
}

enum TransactionStatus {
  PENDING
  COMPLETED
  FAILED
}

model User {
  id                 String              @id @default(uuid())
  email              String              @unique
  fullName           String
  phoneNumber        String?
  passwordHash       String
  role               UserRole?
  avatarUrl          String?
  refreshTokenHash   String?
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt
  razorpayCustomerId String?             @unique
  cashfreeCustomerId String?             @unique
  avatarPublicId     String?
  addresses          Address[]
  customerProfile    CustomerProfile?
  notificationTokens NotificationToken[]
  notifications      Notification[]
  ordersAsCustomer   Order[]             @relation("CustomerOrders")
  ordersAsProvider   Order[]             @relation("ProviderOrders")
  paymentMethods     PaymentMethod[]
  providerAccount    ProviderAccount?
  providerProfile    ProviderProfile?
  status             UserStatus          @default(ACTIVE)
  deletionRequestedAt DateTime?

  @@map("users")
}

model CustomerProfile {
  id                String             @id @default(uuid())
  userId            String             @unique
  notificationPrefs String?
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
  bookings          Booking[]          @relation("CustomerBookings")
  chatRooms         ChatRoom[]
  user              User               @relation(fields: [userId], references: [id])
  providerFavorites ProviderFavorite[]

  @@map("customer_profiles")
}

model ProviderProfile {
  id                 String              @id @default(uuid())
  userId             String              @unique
  bio                String?
  experience         Int?
  isActive           Boolean             @default(false)
  documents          String?
  rating             Float               @default(0)
  totalReviews       Int                 @default(0)
  isVerified         Boolean             @default(false)
  panNumber          String?
  panCardUrl         String?
  businessType       String?
  aadhaarCardUrl     String?
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt
  acceptingPayments  Boolean             @default(true)
  languages          String[]            @default([])
  bankDetails        BankDetail[]
  bookings           Booking[]           @relation("ProviderBookings")
  chatRooms          ChatRoom[]
  favoritedBy        ProviderFavorite[]
  user               User                @relation(fields: [userId], references: [id])
  serviceAreas       ServiceArea[]
  services           Service[]
  walletTransactions WalletTransaction[]
  wallet             Wallet?
  workingHour        WorkingHour?
  currentLatitude   Float?
  currentLongitude  Float?

  @@map("provider_profiles")
}

model Service {
  id                String          @id @default(uuid())
  providerProfileId String
  title             String
  description       String?
  price             Float
  durationMinutes   Int
  category          String
  enabled           Boolean         @default(true)
  icon              String?
  providerId        String?
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
  providerProfile   ProviderProfile @relation(fields: [providerProfileId], references: [id])

  @@map("services")
}

model Booking {
  id                 String             @id @default(uuid())
  customerId         String
  providerId         String
  serviceId          String?
  serviceName        String
  providerName       String
  providerImage      String?
  date               DateTime
  time               String
  durationHours      Int
  serviceCharge      Float
  platformFee        Float              @default(49)
  totalAmount        Float
  status             BookingStatus      @default(UPCOMING)
  address            String
  latitude           Float?
  longitude          Float?
  cancellationReason String?
  cancelledAt        DateTime?
  startedAt          DateTime?
  completedAt        DateTime?
  rating             Int?
  review             String?
  reviewedAt         DateTime?
  createdAt          DateTime           @default(now())
  updatedAt          DateTime           @updatedAt
  isPaid             Boolean            @default(false)
  paidAt             DateTime?
  razorpayOrderId    String?            @unique
  razorpayPaymentId  String?            @unique
  gateway            PaymentGateway     @default(RAZORPAY)
  gatewayOrderId     String?            @unique
  gatewayPaymentId   String?            @unique
  customer           CustomerProfile    @relation("CustomerBookings", fields: [customerId], references: [id])
  provider           ProviderProfile    @relation("ProviderBookings", fields: [providerId], references: [id])
  chatRoom           ChatRoom?
  walletTransaction  WalletTransaction?

  @@map("bookings")
}

model Wallet {
  id                String          @id @default(uuid())
  providerProfileId String          @unique
  balance           Float           @default(0)
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
  providerProfile   ProviderProfile @relation(fields: [providerProfileId], references: [id])

  @@map("wallets")
}

model WalletTransaction {
  id                String            @id @default(uuid())
  providerProfileId String
  amount            Float
  type              TransactionType
  status            TransactionStatus @default(PENDING)
  referenceId       String?
  gateway           PaymentGateway
  description       String?
  bookingId         String?           @unique
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt
  booking           Booking?          @relation(fields: [bookingId], references: [id])
  providerProfile   ProviderProfile   @relation(fields: [providerProfileId], references: [id])

  @@map("wallet_transactions")
}

model ChatRoom {
  id         String          @id @default(uuid())
  bookingId  String?         @unique
  customerId String
  providerId String
  createdAt  DateTime        @default(now())
  updatedAt  DateTime        @updatedAt
  booking    Booking?        @relation(fields: [bookingId], references: [id])
  customer   CustomerProfile @relation(fields: [customerId], references: [id])
  provider   ProviderProfile @relation(fields: [providerId], references: [id])
  messages   Message[]

  @@map("chat_rooms")
}

model Message {
  id         String   @id @default(uuid())
  chatRoomId String
  senderId   String
  content    String
  isRead     Boolean  @default(false)
  createdAt  DateTime @default(now())
  chatRoom   ChatRoom @relation(fields: [chatRoomId], references: [id])

  @@map("messages")
}

model Address {
  id          String   @id @default(uuid())
  userId      String
  title       String // Home, Work, etc.
  addressLine String
  landmark    String?
  city        String
  state       String
  postalCode  String
  latitude    Float
  longitude   Float
  isDefault   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id])

  @@map("addresses")
}

model BankDetail {
  id                String          @id @default(uuid())
  providerProfileId String
  accountNumber     String
  ifscCode          String
  accountHolderName String
  bankName          String
  razorpayAccountId String?         @unique // Linked account identifier
  cashfreeVendorId  String?         @unique // Vendor split payout identifier
  isVerified        Boolean         @default(false)
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
  providerProfile   ProviderProfile @relation(fields: [providerProfileId], references: [id])

  @@map("bank_details")
}

model WorkingHour {
  id                String          @id @default(uuid())
  providerProfileId String          @unique
  monday            String? // e.g. "09:00-18:00"
  tuesday           String?
  wednesday         String?
  thursday          String?
  friday            String?
  saturday          String?
  sunday            String?
  providerProfile   ProviderProfile @relation(fields: [providerProfileId], references: [id])

  @@map("working_hours")
}

model ServiceArea {
  id                String          @id @default(uuid())
  providerProfileId String
  latitude          Float
  longitude         Float
  radius            Float           @default(5) // Radius in KM
  createdAt         DateTime        @default(now())
  providerProfile   ProviderProfile @relation(fields: [providerProfileId], references: [id])

  @@map("service_areas")
}

model NotificationToken {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  platform  String // ios, android, web
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])

  @@map("notification_tokens")
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  title     String
  body      String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])

  @@map("notifications")
}

model Order {
  id         String   @id @default(uuid())
  customerId String
  providerId String
  amount     Float
  status     String
  createdAt  DateTime @default(now())
  customer   User     @relation("CustomerOrders", fields: [customerId], references: [id])
  provider   User     @relation("ProviderOrders", fields: [providerId], references: [id])

  @@map("orders")
}

model ProviderFavorite {
  id                String          @id @default(uuid())
  customerProfileId String
  providerProfileId String
  createdAt         DateTime        @default(now())
  customer          CustomerProfile @relation(fields: [customerProfileId], references: [id])
  provider          ProviderProfile @relation(fields: [providerProfileId], references: [id])

  @@unique([customerProfileId, providerProfileId])
  @@map("provider_favorites")
}

model ProviderAccount {
  id        String   @id @default(uuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("provider_accounts")
}
```

---

## 📱 Frontend Mobile Architecture (`servyq`)

The client is a hybrid React Native code system running on Expo SDK 54, heavily leveraging Expo Router's folder-based file system routing to structure separate Customer and Provider navigation portals.

### 📁 Directory & Screen Route Mapping

```
servyq/
├── app/                              # Expo Router Routes Directory
│   ├── _layout.tsx                   # System Layout Guard, Session Hydrator
│   ├── index.tsx                     # Landing Redirection & Splash Hub
│   ├── (auth)/                       # Secure Authentication Screens
│   │   ├── login.tsx                 # Form login + Native Google SSO
│   │   ├── signup.tsx                # Email & Basic Details registration
│   │   ├── signup-verify.tsx         # OTP verify code verification
│   │   ├── role-select.tsx           # Multi-profile select (Customer vs Provider)
│   │   └── forgot-password.tsx       # Password recovery triggers
│   ├── (tabs)/                       # CUSTOMER DASHBOARD VIEWS
│   │   ├── _layout.tsx               # Bottom Tab Bar Controller
│   │   ├── index.tsx                 # Service categories, Geo-Radius filter
│   │   ├── bookings.tsx              # Job management lists (Upcoming vs History)
│   │   └── profile.tsx               # Settings, addresses, payment setup
│   ├── (provider-tabs)/              # PROVIDER DASHBOARD VIEWS
│   │   ├── _layout.tsx               # Custom Status-aware Tab Bar
│   │   ├── index.tsx                 # Online Switch, GPS maps overlay
│   │   ├── requests.tsx              # Dynamic Incoming Bids & Job Requests
│   │   ├── earnings.tsx              # Transaction logs & Payout buttons
│   │   └── profile.tsx               # Rate settings, Availability, KYC Uploads
│   ├── booking/                      # Detailed Booking Screens
│   │   ├── [id].tsx                  # Interactive GPS Map, Status check-ins
│   │   ├── payment-collection.tsx    # Native Razorpay Checkout SDK portal
│   │   ├── payment-success.tsx       # Confirmed transaction splash
│   │   └── payment-failure.tsx       # Error fallbacks and retry buttons
│   ├── chat/
│   │   └── [id].tsx                  # In-app chat interface, message pooling
│   └── profile/                      # Sub-Profile Configurations
│       ├── kyc-documents.tsx         # Aadhaar Card, PAN upload verification
│       ├── services-rates.tsx        # Provider rate card builder
│       ├── service-areas.tsx         # Custom coverage maps picker
│       ├── bank-details.tsx          # Payment routing configurations
│       └── working-hours.tsx         # Calendar availability blocks
```

### 🎨 Semantic Custom Theme & HSL Design Tokens

The styling system completely avoids standard default OS grids by mapping HSL values into active light and dark tokens. HSL enables on-the-fly component opacity overlays and smooth dark mode switching without re-calculating theme variables.

* **Palette Tokens (`theme/colors.ts`):**
  * **Brand Primary:** `#0F9D8A` (Jade Green HSL: `hsl(172, 83%, 34%)`) — represents sanitation, domestic help, and premium safety.
  * **Brand Secondary:** `#0D7A6C` (Forest Green HSL: `hsl(172, 81%, 26%)`).
  * **Category Custom Palettes:** Dynamic tags mapped based on service class (e.g., Cleaning is soft indigo `#818CF8`, Cooking is golden-amber `#F59E0B`, Babysitting is rose-pink `#FDA4AF`).
* **Dynamic Hook (`theme/useTheme.ts`):** A custom React Hook accessing system-wide Zustand preferences, returning standard `colors`, `typography` presets, unified button `radius`, and glassmorphic micro-shadows.

### 🧠 Core Client-Side State Stores (Zustand v5)

1. **`useAuthStore.ts`**: Holds session state (`user`, `accessToken`).
   * *Strict Role Enforcer:* Injected with a guard: if a user logs in but doesn't have an active role configured, they are immediately routed to `(auth)/role-select` to protect tabs from undefined state crashes.
2. **`useBookingStore.ts`**: Manages global arrays of bookings. Handles local actions like scheduling a service, modifying a date, and launching ratings/reviews.
3. **`useJourneyStore.ts`**: Manages real-time geo-coordinates. Holds the en-route provider's coordinate stream, customer target coordinates, real-time ETA numbers, and determines map visibility configurations.
4. **`useChatStore.ts`**: Maintains in-app chat rooms. Locally matches new WebSocket incoming events to feed the chat list instantly.

### 🔒 Secure Storage & Axios Interceptors (`features/api/apiClient.ts`)

To defend tokens against memory sniffing:
* **The Token Separation Strategy:** The short-lived `accessToken` is stored **strictly in device memory**. The long-lived `refreshToken` is saved in hardware encrypted storage using `expo-secure-store`.
* **The Smart Interceptor Lifecycle:**
  1. Requests automatically check memory for the `accessToken` and inject it in the `Authorization: Bearer <JWT>` header.
  2. If an API returns `401 Unauthorized` (indicating the token expired), a global interceptor queue freezes outgoing requests.
  3. The interceptor fetches the `refreshToken` from the hardware `SecureStore` and issues a `/auth/refresh` HTTP call.
  4. If the call succeeds, the new `accessToken` is cached, standard authorization headers are re-injected, and the frozen queue is processed seamlessly.
  5. Network errors (timeouts, offline state) are gracefully ignored to prevent the user from being abruptly logged out during brief connectivity losses.

---

## ⚡ Backend Server Architecture (`servyq-server`)

The backend is built with NestJS, utilizing a fully modular approach. It separates operations into 20 cohesive domain-specific modules, shielding business components and managing dependencies cleanly.

### 🧩 Core Backend Modules

```
src/modules/
├── auth/                 # Google SSO validation, JWT issuing, Refresh token hashing
├── users/                # Global User model, Profile updates, Avatar stream pipeline
├── customers/            # Customer preferences, address registry
├── providers/            # Bio updates, Verification/KYC processing, GPS location cache
├── services/             # Dynamic catalog items, customizable pricing, details
├── bookings/             # Booking engines, status workflows, PDF receipt compiler
├── service-requests/     # Active dispatching triggers, customer bids matching
├── requests/             # WebSocket orchestration for initial customer requests
├── realtime-presence/    # Live online/offline websocket state tracker
├── chat/                 # Room creation, message saving, socket events dispatching
├── payments/             # Razorpay & Cashfree SDK split routing
├── wallet/               # Provider accounting ledger (Credits, debits, manual transfers)
├── webhooks/             # Asynchronous webhooks dispatcher (Razorpay & Cashfree)
├── notifications/        # Expo Push Notifications service & token registry
├── dispatch-engine/      # Match logic to map incoming bids to radius-checked providers
├── provider-matching/    # Geofenced radius calculation (Haversine scoring)
├── favorites/            # Favorites list management
├── addresses/            # User physical address validation
├── mail/                 # Transactional emails (Nodemailer integrations)
└── health/               # Database and Redis server health monitors
```

### 🔒 Common Utilities & API Security Layers

* **Security Decorator Pattern:** The server employs a global `AtGuard` (Access Token Guard) that restricts all routes by default. Endpoints that are accessible by anonymous users are explicitly exempted using a custom `@Public()` decorator.
* **Role-Based Access Control (RBAC):** Restricts endpoints using custom decorators like `@Roles(UserRole.PROVIDER)` or `@Roles(UserRole.CUSTOMER)`. It extracts JWT payloads at the passport handler level, blocking API attacks before executing database operations.
* **Global Filters & Pipeline Interceptors:**
  * `PrismaExceptionFilter`: Intercepts database errors (e.g., unique constraints) and maps them cleanly to REST exceptions (like `409 Conflict`).
  * `ResponseFormattingInterceptor`: Serializes response objects, stripping sensitive fields like `passwordHash` and outputting standard `{ status: 'success', data }` structures.

### 📬 Background Job Processing (BullMQ & Redis)

High-latency tasks are offloaded to **BullMQ** running with a **Redis** instance to keep API controllers fast and highly responsive:
1. **Webhook Processing Queue:** Razorpay payment webhook notifications are instantly written to the queue with a `200 OK` return code, ensuring the transaction is parsed reliably in the background even during massive spikes.
2. **Push Notifications Engine:** Triggers notification dispatches using the Expo Push Notifications SDK, executing retry loops on network failures without slowing down backend responses.

---

## 🔬 Critical Systems & Advanced Lifecycles

### 🔑 A. Seamless Native Google Sign-In & Onboarding Flow

To bypass web-based popups, Servyq couples native device libraries with backend encryption validation.

```mermaid
sequenceDiagram
  autonumber
  actor User as Mobile Client
  participant Google as Google Play / iOS SDK
  participant Server as NestJS Backend
  participant DB as PostgreSQL Database

  User->>Google: Trigger Native Google Sign-In
  Google-->>User: Resolve ID Token (idToken)
  User->>Server: HTTP POST /auth/google-login { idToken }
  Server->>Server: Verify ID Token signature via Google Auth Library
  Server->>DB: Query User by Email
  alt Existing User
    DB-->>Server: Return User Profile & Role
    Server-->>User: HTTP 200 { status: 'SUCCESS', user, accessToken, refreshToken }
  else New User (No Role Set)
    DB-->>Server: User doesn't exist
    Server-->>User: HTTP 200 { status: 'NEED_ROLE', email, fullName }
    User->>User: Stage signup info locally & route to Role Selection Screen
    User->>Server: HTTP POST /auth/signup (complete registration with selected role)
  end
```

> [!IMPORTANT]
> **Android Client Fingerprint Requirement**  
> Google Cloud Console demands that your production Android package name (`com.sahaayikaa`) maps exactly to your production keystore's **SHA-1 fingerprint**. When publishing via Google Play Console, Google swaps your EAS upload certificate with their own **App Signing Key**. You **must** extract this new SHA-1 fingerprint from the Play Console (`App Integrity` -> `App signing key certificate`) and link it inside Google Cloud Console; otherwise, Google Sign-in will work in development but crash silently with **Developer Error (12500)** in the Play Store release!

---

### 📋 B. End-to-End Booking Lifecycle

A strict state-machine controls the booking lifecycle. The database records structural timestamps and runs wallet ledger calculations at each step:

```mermaid
stateDiagram-v2
  [*] --> UPCOMING: Customer Schedules Service
  UPCOMING --> ARRIVING: Provider starts driving (Starts live location sharing)
  ARRIVING --> ARRIVED: Provider checks in at location (ETA capsule disappears)
  ARRIVED --> IN_PROGRESS: Provider starts task (startedAt recorded)
  IN_PROGRESS --> COMPLETED: Provider completes service (completedAt recorded)
  COMPLETED --> [*]: Customer submits review & aggregates rating/reviews stats
  UPCOMING --> CANCELLED: Customer cancels booking (reason saved)
```

1. **`UPCOMING`**: Initial scheduling state. Customer payment must be secured.
2. **`ARRIVING`**: The provider triggers transit. The background location task initiates on their device.
3. **`ARRIVED`**: Provider checks in within 200 meters of the target coordinate. The ETA panel shifts to a greeting component.
4. **`IN_PROGRESS`**: Provider triggers the task, updating the database `startedAt` timestamp to prevent cancellation.
5. **`COMPLETED`**: Work is declared finished, saving the `completedAt` timestamp. The booking balance is safely deposited into the provider's wallet balance.

---

### 📍 C. Real-Time High-Frequency GPS Journey Tracking

Coordinate streams must remain uninterrupted even if the provider locks their phone or moves the application to the background.

```mermaid
sequenceDiagram
  autonumber
  participant ProviderApp as Helper's Device
  participant BGTask as expo-task-manager (Background Task)
  participant Socket as NestJS RequestsGateway
  participant CustomerApp as Customer's Device

  ProviderApp->>Socket: Socket Join Room 'job:jobId'
  CustomerApp->>Socket: Socket Join Room 'job:jobId'
  
  Note over ProviderApp, BGTask: Helper moves en-route (ARRIVING)
  BGTask->>BGTask: Poll GPS Coordinates via expo-location
  BGTask->>Socket: Socket emit 'update_location' { jobId, lat, lng }
  Socket->>CustomerApp: Socket broadcast 'location_updated' { jobId, lat, lng }
  
  Note over CustomerApp: Computes ETA using Haversine Formula
  CustomerApp->>CustomerApp: Refresh Map Marker & Update Floating ETA Capsule
```

#### Foreground Polling vs Background Tasks
* **Foreground Polling:** When active, the provider's device checks GPS coordinates every 15 seconds, writing records via `POST /providers/location` to ensure historical route auditing in the database.
* **Background Tracking (`expo-task-manager`):** As the provider shifts to the `ARRIVING` state, the client launches a native background location service (`JOURNEY_TRACKER_TASK`) utilizing `expo-location`. By wrapping it in a persistent foreground notification, the OS is prevented from terminating the GPS thread.
* **High-Performance ETA Calculation:** To avoid costly Google Distance Matrix API calls on every GPS update, the Customer's client calculates the geodesic distance in real-time using the **Haversine Formula**:

$$d = 2R \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)$$

Assuming average city traffic velocity ($25\text{ km/h}$), the interface displays a floating glassmorphic ETA card that updates dynamically as coordinates change.

---

### 💳 D. Dynamic Payment Split Routing & Wallet Ledger

Servyq features an automated, platform-controlled fee division utilizing a custom gateway factory.

```mermaid
sequenceDiagram
  autonumber
  actor Customer as Customer App
  participant Server as PaymentsService
  participant Gateway as Razorpay / Cashfree API
  participant DB as PostgreSQL Database
  participant Wallet as Ledger / Wallet Transaction

  Customer->>Server: POST /payments/bookings/:id/checkout
  Server->>DB: Fetch Booking Details & Verify Provider Payout Account
  Note over Server: Commission Split Calculated (e.g. 1.7% commission)<br/>providerPaise = serviceCharge * (1 - 0.017)
  Server->>Gateway: Create order with transfer split (Razorpay Route / Cashfree Split)
  Gateway-->>Server: Return Order ID & Session ID
  Server-->>Customer: Return Payment payload
  
  Customer->>Customer: Trigger Native PG SDK (Razorpay open() / Cashfree doPayment())
  Customer-->>Server: POST /payments/bookings/verify { gateway_order_id, gateway_payment_id, gateway_signature }
  Server->>Gateway: Verify payment signature
  
  rect rgba(15, 157, 138, 0.1)
    Note over Server, DB: Safe Idempotent Finalization ($transaction)
    Server->>DB: Update Booking (isPaid = true, paidAt = now())
    Server->>DB: Credit Provider Wallet (balance += providerShare)
    Server->>Wallet: Create WalletTransaction (type CREDIT, status COMPLETED)
  end
  Server-->>Customer: Return payment confirmation
```

#### Split Payment & Commission Split Formulas
When a checkout is initiated, the platform calculates a dynamic breakdown:

$$\text{Provider Share} = \text{Service Charge} \times \left(1 - \frac{\text{Commission Percentage}}{100}\right)$$

$$\text{Platform Share} = \text{Total Booking Amount} - \text{Provider Share}$$

To process these splits directly at the card processing level, the NestJS `PaymentsService` configures a **Transfers Array** inside the Razorpay Order:

```json
{
  "amount": 54900,
  "currency": "INR",
  "transfers": [
    {
      "account": "acc_linked_provider_id",
      "amount": 49150,
      "currency": "INR",
      "on_hold": false
    }
  ]
}
```

This guarantees that once the customer pays $549.00$ INR, $491.50$ INR is routed directly into the provider's linked bank account, leaving the remaining amount as platform profit.

#### Prisma Transaction-Level Safety (`$transaction`)
To prevent duplicate credits due to concurrent API retries or conflicting webhook messages, payment processing is wrapped in a strict database transaction:

```typescript
async finalizeBookingPayment(bookingId: string, paymentDetails: any) {
  return await this.prisma.$transaction(async (tx) => {
    // 1. Lock the booking row to prevent race conditions
    const booking = await tx.booking.findUnique({
      where: { id: bookingId },
    });

    if (booking.isPaid) {
      return booking; // Avoid double-crediting
    }

    // 2. Perform updates
    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        gatewayPaymentId: paymentDetails.gatewayPaymentId,
      },
    });

    const providerShare = booking.serviceCharge * (1 - this.commissionRate);

    // 3. Update Wallet ledger
    const wallet = await tx.wallet.update({
      where: { providerProfileId: booking.providerId },
      data: { balance: { increment: providerShare } },
    });

    // 4. Write audit log
    await tx.walletTransaction.create({
      data: {
        providerProfileId: booking.providerId,
        amount: providerShare,
        type: TransactionType.CREDIT,
        status: TransactionStatus.COMPLETED,
        bookingId: booking.id,
        gateway: booking.gateway,
        description: `Earning for service: ${booking.serviceName}`,
      },
    });

    return updatedBooking;
  });
}
```

---

## ⚙️ Environment Configurations

### 📱 Frontend Config (`.env.local`)

| Environment Variable | Purpose / Description | Value Format |
| :--- | :--- | :--- |
| `EXPO_PUBLIC_API_URL` | Primary backend REST gateway address | `http://<your-server-ip>:3000/api/v1` |
| `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` | OAuth 2.0 Web Client ID for Google Auth | `xxxx.apps.googleusercontent.com` |
| `EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME` | Reversed Client ID for iOS bundle redirect | `com.googleusercontent.apps.xxxx` |
| `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key for address geofencing | `AIzaSy...` |
| `EXPO_PUBLIC_ENABLE_TASK_MANAGER` | Toggle switch for background location services | `true` \| `false` |

### ⚡ Backend Config (`.env`)

| Environment Variable | Purpose / Description | Value Format |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `REDIS_URL` | BullMQ queue controller connection | `redis://localhost:6379` |
| `JWT_ACCESS_SECRET` | Secret key for access token encryption | `At-Secret-Key-String` |
| `JWT_REFRESH_SECRET` | Secret key for refresh token encryption | `Rt-Secret-Key-String` |
| `ACTIVE_PAYMENT_GATEWAY` | Selects which gateway logic to load | `RAZORPAY` \| `CASHFREE` |
| `COMMISSION_PERCENTAGE` | Platform commission cut from service charge | `1.7` (e.g. 1.7%) |
| `RAZORPAY_KEY_ID` | Merchant Key ID for Razorpay | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Secret Key for Razorpay checkout verification | `sec_...` |
| `EXPO_ACCESS_TOKEN` | Direct token to push notifications via Expo | `Exo_...` |

---

## 📈 Outstanding Resume Case Studies & Engineering Achievements

* **Cross-Platform Dual-Role Architecture:** Designed and built a modular Expo SDK 54 mobile application utilizing Expo Router v6 folder structures, facilitating seamless switching between Customer and Provider accounts while maintaining distinct layout states in a single codebase.
* **Low-Power Background Location Engine:** Created a background location service using `expo-task-manager` and `expo-location` that stream provider GPS coordinates en-route over Socket.io. Configured foreground notification handles to prevent OS-level service terminations, keeping battery consumption minimal.
* **Transactional Split Payment Routing:** Implemented automated payout splitting using Razorpay Route and Cashfree Split. Programmed dynamic calculations dividing payments into platform fees and direct provider payouts, ensuring instant fund distribution at the point of sale.
* **Highly Available Webhook Processing Queue:** Engineered a NestJS webhook reconciliation processor using BullMQ and Redis, offloading heavy verification processing from the main HTTP thread and ensuring payment confirmations are recorded reliably even during unexpected network disruptions or app crashes.
* **Idempotent Wallet Ledger System:** Built a transaction-safe provider wallet and ledger framework using PostgreSQL and Prisma's `$transaction` queries. This guarantees system consistency and prevents double-crediting or race conditions during rapid retries.
