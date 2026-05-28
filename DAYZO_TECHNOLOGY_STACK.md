# Dayzo Project — Technologies Used & Tag Reference

This document compiles a comprehensive, categorized list of technologies, frameworks, libraries, and developer tools used across the **Dayzo Ecosystem**. You can use these names as tag badges or pills in your portfolio UI.

---

## 📱 Mobile Client (`dayzo-mobile`)
* **Core Framework:** React Native, Expo SDK 56 (React 19, React Native 0.85)
* **Routing & Navigation:** Expo Router (`expo-router`)
* **State Management:** TanStack Query v5 (`@tanstack/react-query`), Zustand v5
* **Styling & Layout:** NativeWind v4 (Tailwind CSS v4 for native), CSS Flexbox
* **Core APIs:** Expo Linear Gradient (`expo-linear-gradient`), Expo Image (`expo-image`), Expo Symbols
* **Animations:** React Native Reanimated v4 (`react-native-reanimated`)
* **Real-time Gateway:** Socket.io Client (`socket.io-client`)
* **Rendering & Social Sharing:** React Native View Shot (`react-native-view-shot`), Expo Sharing (`expo-sharing`)
* **Forms & Validation:** React Hook Form (`react-hook-form`), Zod (`zod`)
* **Secure Storage:** Expo Secure Store (`expo-secure-store`)

---

## ⚙️ Backend Core (`dayzo-backend`)
* **Programming Language:** TypeScript
* **Runtime & Framework:** Nest.js (Modular microservices framework)
* **Database Driver & ORM:** Prisma ORM (`@prisma/client`)
* **Real-time Gateway:** Socket.io Server (`@nestjs/websockets`, `@nestjs/platform-socket.io`)
* **Configurations & Secrets:** Nest.js Config (`@nestjs/config`)
* **Code Standard & Linter:** ESLint, Prettier

---

## 📊 Admin Console (`dayzo-admin`)
* **Core Framework:** Next.js 16 (React 19, App Router architecture)
* **Data Layer & Async Queries:** TanStack Query v5 (`@tanstack/react-query`)
* **Data Visualizations:** Recharts (Interactive Area, Bar, Pie, Heatmap charts)
* **Animations:** Framer Motion (`framer-motion`)
* **Styling & Icons:** Tailwind CSS, Lucide Icons (`lucide-react`)
* **Data Fetching:** Axios

---

## 💾 Database, DevOps & Systems
* **Primary Database:** PostgreSQL (Relation-focused, compound-indexed)
* **Environment Virtualization:** Docker, Docker Compose
* **Package Management:** NPM (with legacy-peer-deps validation)
