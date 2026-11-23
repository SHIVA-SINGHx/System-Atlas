<div align="center">

# 🗺️ System Atlas

### A Production-Grade Engineering Education Platform

**Full-Stack · Microservices · DSA + System Design · Interactive Visualizer · Code Practice**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-7-red?logo=redis)](https://redis.io)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://docker.com)
[![pnpm](https://img.shields.io/badge/pnpm-Monorepo-orange?logo=pnpm)](https://pnpm.io)

</div>

---

## 📖 Overview

**System Atlas** is a comprehensive, production-architected engineering education platform that teaches both **Data Structures & Algorithms (DSA)** and **System Design** through interactive content, algorithm visualizations, a live code practice environment, and a curated external resource library.

The project is intentionally built as a **real-world microservices system** — not a tutorial toy app — demonstrating how large-scale engineering teams structure backend services, shared contracts, auth, rate limiting, RBAC, caching, audit logs, and secure code execution.

---

## ✨ What's Implemented

### 🧠 DSA Learning Module
- **13 complete DSA topics** with full structured curriculum:
  - Arrays & Strings, Hashing, Two Pointers & Sliding Window
  - Linked Lists, Stacks & Queues, Binary Search
  - Recursion & Backtracking, Trees & BST, Heaps & Priority Queues
  - Graphs, Greedy Algorithms, Dynamic Programming, Tries & Union-Find
- Each topic includes:
  - Beginner-friendly explanation + real-world analogy
  - Step-by-step dry run with markdown diagrams
  - Code examples in **C++, Java, Python, JavaScript**
  - Time & space complexity analysis
  - Common mistakes and pitfalls
  - Interview questions with answers
  - Practice exercises with solutions
  - Revision notes and quizzes
- **DSA Roadmap** — staged learning path with beginner → advanced progression
- **7 curated practice problems**: Two Sum, Valid Parentheses, Binary Search, Longest Substring, Coin Change, Course Schedule, Trapping Rain Water

### 🎞️ Interactive Algorithm Visualizer
- **10 algorithm categories** with step-by-step animations:
  - Sorting (Bubble, Selection, Insertion, Merge, Quick)
  - Binary Search visualization
  - Linked List pointer movements
  - Stack & Queue operations
  - Tree traversals (In/Pre/Post-order, Level-order)
  - BFS & DFS on graphs
  - Dijkstra's shortest path
  - Recursion tree visualization
  - Dynamic Programming table fills
  - Hash table operations
- Play / Pause / Next Step / Previous Step / Reset controls
- Adjustable animation speed
- Current operation explanation panel
- Highlighted elements and pointer indicators
- Input customization (custom arrays, graphs)
- Respects `prefers-reduced-motion`

### 💻 DSA Practice Environment
- Topic-wise problem filtering (Easy / Medium / Hard)
- Full problem statements with constraints and examples
- Progressive hints system
- **Monaco-style code editor** with syntax highlighting
- Language selector (JavaScript, Python, C++, Java)
- Run code with test-case results
- Submit with verdict (Accepted / Wrong Answer / TLE)
- Submission history per problem
- Solved problem tracking
- User progress dashboard
- **Sandboxed code execution** — JavaScript evaluated via isolated Node.js `vm` module; pattern-based verification for other languages; never executes in the main process

### 🏗️ System Design Module (pre-existing)
- Full System Design curriculum with original lessons
- Architecture diagrams and workflow explanations
- Engineering case studies
- Interview preparation resources

### 📚 External Resource Library
- **8+ curated engineering resources** including:
  - Google Spanner paper, Designing Data-Intensive Applications (DDIA)
  - MIT 6.824 Distributed Systems, Netflix Tech Blog
  - Redis documentation, CP-Algorithms, VisuAlgo, DynamoDB paper
- Search & filter by category, difficulty, content type
- Full attribution: source URL, author, publisher, license info
- Admin interface to add/remove/update resources

### 🔄 Content Ingestion Pipeline (Admin)
- URL submission with domain validation
- `robots.txt` and terms-of-service awareness
- **Full SSRF protection**: blocks loopback, RFC 1918 private ranges, link-local, and cloud metadata IPs
- HTML/Markdown metadata extraction
- Editorial review workflow (approve / reject)
- Ingestion job status tracking and audit logs
- Background job processing

### 🔐 Security & Infrastructure
- **API Gateway** with centralized rate limiting, CORS, and request routing
- **RBAC** — USER, INSTRUCTOR, ADMIN roles enforced across endpoints
- **Redis** caching for hot data and rate-limit counters
- **Correlation ID** middleware for distributed tracing
- Per-service Prisma ORM with isolated PostgreSQL schemas
- Clerk authentication (optional, middleware falls back gracefully without keys)
- Input validation via Zod schemas in shared `contracts` package

### 🎨 Frontend & UX
- **Next.js 15** App Router with full TypeScript
- Dark/Light theme support
- Fully responsive layout (mobile, tablet, desktop)
- Minimal, premium design system — dark slate / sky-blue color palette
- No glassmorphism, no neon, no decorative animations
- Educational animations tied to actual algorithm execution steps

---

## 🏛️ Architecture

```
system-atlas/
├── apps/
│   └── web/                    # Next.js 15 frontend (port 3000)
├── services/
│   ├── api-gateway/            # Reverse proxy + rate limiting (port 3001)
│   ├── auth-service/           # Authentication & session (port 3002)
│   ├── learning-service/       # DSA curriculum + System Design (port 3003)
│   ├── progress-service/       # Code execution + submissions (port 3004)
│   ├── playground-service/     # Code playground (port 3005)
│   ├── interview-service/      # Interview prep (port 3006)
│   ├── resource-service/       # Resources + content ingestion (port 3007)
│   ├── organization-service/   # Teams & orgs (port 3008)
│   └── notification-service/   # Notifications (port 3009)
└── packages/
    ├── contracts/              # Shared Zod schemas + DSA curriculum data
    └── logger/                 # Shared structured logger (Pino)
```

### Service Responsibilities

| Service | Responsibility |
|---------|---------------|
| `api-gateway` | Single entry point — rate limiting, CORS, auth-verify guard, proxy to services |
| `auth-service` | User sessions, Clerk JWT verification, token management |
| `learning-service` | DSA topics, lessons, curriculum data (in-memory + DB) |
| `progress-service` | Code run/submit, sandboxed JS execution, submission history |
| `resource-service` | Curated resources, content ingestion, SSRF-safe URL fetcher |
| `playground-service` | Interactive multi-language code playground |
| `interview-service` | Interview question bank, mock interviews |
| `organization-service` | Teams, cohorts, instructor management |
| `notification-service` | Email/in-app notifications |

---

## 🛣️ Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/dashboard` | Unified dashboard — System Design + DSA metrics |
| `/dsa` | DSA Hub — 13-topic grid overview |
| `/dsa/roadmap` | Staged learning roadmap |
| `/dsa/topics/[slug]` | Topic detail — 6 tabs: Guide, Dry Run, Code, Pitfalls, Interview, Quiz |
| `/dsa/visualizer` | Interactive algorithm visualizer |
| `/dsa/practice` | Problem directory with filters |
| `/dsa/problems/[slug]` | Split-pane code workbench |
| `/resources` | External resource library |
| `/resources/[slug]` | Resource detail with attribution |
| `/admin/content` | Content ingestion admin UI |
| `/admin/resources` | Resource management admin UI |

---

## 🚀 Running Locally

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | ≥ 20 | Runtime |
| **pnpm** | ≥ 9 | Package manager & monorepo |
| **Docker Desktop** | Latest | PostgreSQL + Redis |
| **Git** | Any | Clone repo |

> Install pnpm: `npm install -g pnpm`

---

### Step 1 — Clone & Install

```bash
git clone https://github.com/your-username/system-atlas.git
cd system-atlas
pnpm install
```

---

### Step 2 — Environment Files

Each service has a pre-configured `.env` file. The defaults work out of the box for local development.

**Web app** (`apps/web/.env`):
```env
# Clerk keys (optional — app works without auth in dev)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_sample
CLERK_SECRET_KEY=sk_test_sample

# API Gateway
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> **To enable real auth:** Get free Clerk keys at [clerk.com](https://clerk.com) and replace the sample values.

---

### Step 3 — Start Docker Infrastructure

```bash
# Start PostgreSQL (port 5433) + Redis (port 6379)
docker compose up -d postgres redis
```

Verify containers are running:
```bash
docker compose ps
```

You should see `atlas-postgres` and `atlas-redis` both **healthy**.

---

### Step 4 — Build Shared Packages

```bash
pnpm --filter @system-atlas/logger build
pnpm --filter @system-atlas/contracts build
```

---

### Step 5 — Generate Prisma Clients & Run Migrations

Run this once (or after any schema change):

**PowerShell (Windows):**
```powershell
.\run-migrations.ps1
```

**Manual (any OS):**
```bash
# Run for each service:
cd services/learning-service    && npx prisma generate && npx prisma migrate deploy
cd services/progress-service    && npx prisma generate && npx prisma migrate deploy
cd services/resource-service    && npx prisma generate && npx prisma migrate deploy
cd services/auth-service        && npx prisma generate && npx prisma migrate deploy
cd services/interview-service   && npx prisma generate && npx prisma migrate deploy
cd services/playground-service  && npx prisma generate && npx prisma migrate deploy
cd services/organization-service && npx prisma generate && npx prisma migrate deploy
cd services/notification-service && npx prisma generate && npx prisma migrate deploy
```

---

### Step 6 — Start All Services

**Option A — PowerShell one-click script (Windows):**
```powershell
.\start-all.ps1
```
Opens each service in a minimized terminal window.

**Option B — Separate terminals:**

```bash
# Terminal 1
pnpm --filter @system-atlas/api-gateway dev

# Terminal 2
pnpm --filter @system-atlas/learning-service dev

# Terminal 3
pnpm --filter @system-atlas/progress-service dev

# Terminal 4
pnpm --filter @system-atlas/resource-service dev

# Terminal 5
pnpm --filter @system-atlas/auth-service dev

# Terminal 6 (optional extras)
pnpm --filter @system-atlas/interview-service dev
pnpm --filter @system-atlas/playground-service dev
pnpm --filter @system-atlas/organization-service dev
pnpm --filter @system-atlas/notification-service dev

# Terminal 10 — Frontend
pnpm --filter @system-atlas/web dev
```

**Option C — Turbo (all at once):**
```bash
pnpm dev
```

---

### Step 7 — Open the App

| URL | What you'll see |
|-----|-----------------|
| **http://localhost:3000** | Main app — landing page |
| http://localhost:3000/dashboard | Unified learning dashboard |
| http://localhost:3000/dsa | DSA Hub |
| http://localhost:3000/dsa/roadmap | DSA Roadmap |
| http://localhost:3000/dsa/topics/arrays-and-strings | Topic detail page |
| http://localhost:3000/dsa/visualizer | Algorithm visualizer |
| http://localhost:3000/dsa/practice | Practice arena |
| http://localhost:3000/resources | Resource library |
| http://localhost:3000/admin/content | Content ingestion (admin) |
| http://localhost:3001/health | API Gateway health check |
| http://localhost:3003/dsa/topics | DSA topics JSON API |
| http://localhost:3007/resources | Resources JSON API |

---

## 🛠️ Development Commands

```bash
# Install dependencies
pnpm install

# Start everything (Turbo)
pnpm dev

# Build all packages and services
pnpm build

# Type-check everything
pnpm typecheck

# Run all tests
pnpm test

# Format code
pnpm format

# Clean all build artifacts
pnpm clean

# Generate Prisma clients (after schema changes)
pnpm db:generate

# Run DB migrations
pnpm db:migrate
```

---

## 🧪 Running Tests

```bash
# Run the DSA system test suite
npx ts-node scripts/test-dsa-system.ts

# Expected output:
# ✅ DSA Curriculum — 13 topics with full content
# ✅ Practice Problems — multi-difficulty + test cases
# ✅ SSRF Guard — blocks internal IPs and metadata endpoints
# ✅ Code Sandbox — blocks unsafe ops, evaluates JS
# ✅ Ingestion Pipeline — editorial approval workflow
```

---

## 📦 Tech Stack

### Frontend
| Technology | Use |
|-----------|-----|
| Next.js 15 | React framework with App Router |
| TypeScript 5 | Type safety throughout |
| Tailwind CSS | Utility-first styling |
| React Flow | Interactive graph visualizations |
| Lucide Icons | Icon library |

### Backend (each service)
| Technology | Use |
|-----------|-----|
| NestJS 10 | Modular Node.js framework |
| Prisma ORM | Type-safe database access |
| Zod | Runtime schema validation |
| Pino | Structured JSON logging |
| Redis (ioredis) | Caching + rate limiting |

### Infrastructure
| Technology | Use |
|-----------|-----|
| PostgreSQL 16 | Primary database (port 5433, per-service schemas) |
| Redis 7 | Cache + rate limit store |
| Docker Compose | Local infrastructure orchestration |
| pnpm Workspaces | Monorepo management |
| Turbo | Build pipeline caching |

### Shared Packages
| Package | Purpose |
|---------|---------|
| `@system-atlas/contracts` | Zod schemas + DSA curriculum data |
| `@system-atlas/logger` | Shared Pino logger factory |

---

## 🔒 Security Features

| Feature | Implementation |
|---------|---------------|
| **SSRF Protection** | Blocks RFC 1918, loopback, link-local, AWS/GCP/Azure metadata IPs |
| **Code Sandbox** | Node.js `vm` module isolation; dangerous patterns blocked; timeouts enforced |
| **Rate Limiting** | Redis-backed sliding-window rate limiter in API Gateway |
| **RBAC** | USER / INSTRUCTOR / ADMIN roles on all sensitive endpoints |
| **Input Validation** | Zod schemas on every request body via shared contracts |
| **CORS** | Restricted origin list per service |
| **Correlation IDs** | Every request tagged for distributed tracing |
| **Editorial Gate** | No AI-generated or ingested content published without human approval |

---

## 📁 Project Structure

```
system-atlas/
│
├── apps/
│   └── web/
│       ├── src/app/               # Next.js App Router pages
│       │   ├── dashboard/         # Unified dashboard
│       │   ├── dsa/               # DSA Hub + sub-routes
│       │   │   ├── roadmap/
│       │   │   ├── topics/[slug]/
│       │   │   ├── visualizer/
│       │   │   ├── practice/
│       │   │   └── problems/[slug]/
│       │   ├── resources/         # Resource library
│       │   └── admin/             # Admin content tools
│       └── src/components/        # Shared UI components
│
├── services/
│   ├── api-gateway/src/
│   │   ├── health/                # Health check
│   │   ├── middleware/            # Correlation ID
│   │   └── modules/
│   │       ├── gateway/           # Proxy controller + auth guard
│   │       └── rate-limit/        # Redis rate limiter
│   │
│   ├── learning-service/src/
│   │   └── modules/dsa/           # DSA topics, curriculum, problems
│   │
│   ├── progress-service/src/
│   │   └── modules/practice/      # Code execution, submissions, stats
│   │
│   └── resource-service/src/
│       └── modules/
│           ├── resources/         # Resource CRUD + admin
│           └── ingestion/         # Ingestion pipeline + SSRF guard
│
└── packages/
    ├── contracts/src/
    │   ├── common/                # Shared enums (DifficultyLevel)
    │   ├── learning/              # DSA schemas + full curriculum data
    │   ├── progress/              # Submission + code execution schemas
    │   ├── resource/              # Resource + ingestion schemas
    │   └── interview/             # Interview question schemas
    └── logger/                    # Pino logger factory
```

---

## 🌐 API Reference

### Learning Service (port 3003)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/dsa/topics` | All 13 DSA topics |
| GET | `/dsa/topics/:slug` | Single topic with full content |
| GET | `/dsa/practice/problems` | All practice problems |
| GET | `/dsa/practice/problems/:slug` | Single problem |

### Progress Service (port 3004)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/practice/run` | Run code against test cases |
| POST | `/practice/submit` | Submit solution |
| GET | `/practice/submissions/:slug` | Submission history |
| GET | `/practice/stats` | User progress stats |

### Resource Service (port 3007)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/resources` | All resources (search + filter) |
| GET | `/resources/:slug` | Single resource |
| POST | `/admin/resources` | Add resource (ADMIN) |
| PUT | `/admin/resources/:id` | Update resource (ADMIN) |
| DELETE | `/admin/resources/:id` | Remove resource (ADMIN) |
| POST | `/ingestion/jobs` | Start ingestion job (ADMIN) |
| GET | `/ingestion/jobs` | List ingestion jobs (ADMIN) |
| GET | `/ingestion/jobs/:id` | Ingestion job status (ADMIN) |
| POST | `/ingestion/jobs/:id/review` | Approve/reject content (ADMIN) |

---

## 🔮 Roadmap

- [ ] Real-time collaboration in code editor (WebSockets)
- [ ] AI-powered hint generation (Gemini API)
- [ ] User authentication with Clerk (real keys)
- [ ] Persistent submission storage in PostgreSQL
- [ ] Email notifications for submission results
- [ ] Organization/cohort management UI
- [ ] Instructor dashboard with student analytics
- [ ] Mobile app (React Native)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Kubernetes deployment manifests

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit with conventional commits: `git commit -m "feat: add X"`
4. Push and open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ as a full-stack engineering showcase**

*System Atlas demonstrates production-grade microservices architecture, security-first design, and comprehensive educational tooling in a single monorepo.*

</div>
