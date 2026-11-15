# System Atlas

> **Enterprise System Design Education Platform** — Learn, Practice, and Master Distributed Systems Architecture.

[![CI](https://github.com/your-org/system-atlas/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/system-atlas/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node: >=20](https://img.shields.io/badge/Node-%3E%3D20-brightgreen)](https://nodejs.org)
[![pnpm: >=9](https://img.shields.io/badge/pnpm-%3E%3D9-orange)](https://pnpm.io)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.x-blueviolet)](https://turborepo.dev)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red)](https://nestjs.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.x-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://typescriptlang.org)

---

## Table of Contents

1. [What is System Atlas?](#1-what-is-system-atlas)
2. [Architecture Overview](#2-architecture-overview)
3. [Tech Stack](#3-tech-stack)
4. [Monorepo Structure](#4-monorepo-structure)
5. [Service Registry](#5-service-registry)
6. [Shared Packages](#6-shared-packages)
7. [Prerequisites](#7-prerequisites)
8. [Quick Start](#8-quick-start)
9. [Environment Variables](#9-environment-variables)
10. [Clerk Auth Setup](#10-clerk-auth-setup)
11. [Database Architecture](#11-database-architecture)
12. [Redis Architecture](#12-redis-architecture)
13. [API Gateway & Routing](#13-api-gateway--routing)
14. [Development Workflow](#14-development-workflow)
15. [Docker & Infrastructure](#15-docker--infrastructure)
16. [CI/CD Pipeline](#16-cicd-pipeline)
17. [Security Baseline](#17-security-baseline)
18. [Development Phases](#18-development-phases)
19. [Architectural Decision Records](#19-architectural-decision-records)
20. [Contributing](#20-contributing)

---

## 1. What is System Atlas?

**System Atlas** is a full-stack SaaS platform that teaches engineers how to design and build distributed systems at scale. It is structured as a university-grade curriculum covering:

- **Structured Learning** — Topic-by-topic curriculum covering load balancing, caching, databases, messaging queues, microservices patterns, and more.
- **Interactive Playground** — A visual canvas (powered by React Flow) where users can draw architecture diagrams, place components, connect services, and simulate traffic flows.
- **Interview Prep** — A curated library of system design interview problems (like those asked at FAANG/MAANG companies) with hints, rubrics, and worked solutions.
- **Resource Library** — Handpicked external references: papers, blog posts, videos, and documentation grouped by topic.
- **Progress Tracking** — Persistent tracking of lesson completions, bookmarks, quiz attempts, and overall learning statistics.
- **Organizations** — Multi-tenant workspace support so teams and study groups can learn together with RBAC.
- **Notifications** — Email reminders and account notifications delivered via background job queues.

### Who is it for?

| Audience | Use Case |
|---|---|
| Software Engineers | Preparing for system design interviews at top tech companies |
| Engineering Students | Learning distributed systems through structured curriculum |
| Team Leads | Running study cohorts within their organization |
| Engineering Managers | Understanding system design trade-offs and decision frameworks |

---

## 2. Architecture Overview

System Atlas is built as a **domain-oriented microservices monorepo**. All services are independently deployable, own their own database schema, and communicate exclusively through the API Gateway.

```
                        ┌──────────────────────────────────────┐
                        │         System Atlas Frontend         │
                        │        Next.js 15 (Port 3000)        │
                        └──────────────┬───────────────────────┘
                                       │ HTTPS
                        ┌──────────────▼───────────────────────┐
                        │           API Gateway                 │
                        │        NestJS (Port 3001)            │
                        │  Rate Limiting · Auth · Correlation  │
                        └──┬────┬────┬────┬────┬────┬────┬────┘
                           │    │    │    │    │    │    │
            ┌──────────────┘    │    │    │    │    │    └────────────────┐
            │              ┌────┘    │    │    │    └──────────┐          │
            ▼              ▼         ▼    ▼    ▼              ▼          ▼
       ┌─────────┐  ┌──────────┐  ┌───┐ ┌───┐ ┌────────────┐ ┌────────┐ ┌────────────┐
       │  Auth   │  │ Learning │  │...│ │...│ │Organization│ │Resource│ │Notification│
       │  :3002  │  │  :3003   │  │   │ │   │ │   :3008    │ │ :3007  │ │   :3009    │
       └────┬────┘  └────┬─────┘  └─┬─┘ └─┬─┘ └─────┬──────┘ └───┬────┘ └─────┬──────┘
            │            │          │     │          │            │            │
            └────────────┴──────────┴─────┴──────────┴────────────┴────────────┘
                                           │
                         ┌─────────────────┴────────────────────┐
                         │          Shared Infrastructure         │
                         │   PostgreSQL :5432  │  Redis :6379    │
                         └────────────────────────────────────────┘
```

**Key Architectural Principles:**

- **Database per Service** — Each service has its own PostgreSQL schema and dedicated DB user. No cross-schema queries.
- **API Gateway as single entry point** — The frontend never calls internal services directly.
- **No shared ORM models** — Each service generates its own isolated Prisma client.
- **Clerk for Identity** — No custom password auth. Clerk handles login, MFA, and tokens; services verify the JWT.
- **BullMQ over Kafka** — Background jobs via Redis-backed BullMQ for simplicity in this phase.
- **OpenTelemetry** — Distributed tracing across all services with OTEL collector.

---

## 3. Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend** | Next.js (App Router) | 15.x | Full-stack React framework |
| **Frontend** | React | 19.x | UI library |
| **Frontend** | TypeScript | 5.7 | Type safety |
| **Frontend** | Tailwind CSS | 4.x | Utility-first styling |
| **Frontend** | Motion | 11.x | Animations |
| **Frontend** | React Flow | 11.x | Architecture diagram canvas |
| **Frontend** | Clerk (React) | 6.x | Auth UI components |
| **Backend** | NestJS | 10.x | Structured Node.js framework |
| **Backend** | Node.js | 20 LTS | Runtime |
| **Backend** | TypeScript | 5.7 | Type safety |
| **Backend** | Prisma | 6.x | ORM for PostgreSQL |
| **Backend** | Zod | 3.x | Runtime schema validation |
| **Backend** | BullMQ | 5.x | Background job queues |
| **Backend** | Pino | 9.x | Structured logging |
| **Auth** | Clerk | — | Hosted identity provider |
| **Auth** | Svix | — | Clerk webhook delivery & verification |
| **Database** | PostgreSQL | 16 | Primary data store (per-service schema) |
| **Cache / Queue** | Redis | 7 | Rate limiting, BullMQ, caching |
| **Monorepo** | Turborepo | 2.3 | Build orchestration & caching |
| **Package Manager** | pnpm | 9.15 | Workspace management |
| **Observability** | OpenTelemetry | — | Distributed tracing |
| **Observability** | Sentry | — | Error monitoring |
| **Infra** | Docker + Compose | — | Local containerization |
| **Infra** | Terraform | — | AWS infrastructure as code |
| **CI/CD** | GitHub Actions | — | Automated pipelines |

---

## 4. Monorepo Structure

```
System-Design-SaaS/                     ← Monorepo root
│
├── apps/                                ← User-facing applications
│   └── web/                             ← Next.js 15 frontend (Port 3000)
│       ├── src/
│       │   ├── app/                     ← Next.js App Router pages
│       │   │   ├── layout.tsx           ← Root layout (ClerkProvider)
│       │   │   ├── page.tsx             ← Landing page "/"
│       │   │   ├── dashboard/           ← User dashboard "/dashboard"
│       │   │   ├── learn/               ← Curriculum pages
│       │   │   │   ├── page.tsx         ← Topic list "/learn"
│       │   │   │   └── [topicSlug]/     ← Topic detail + lesson pages
│       │   │   ├── playground/          ← Architecture canvas "/playground"
│       │   │   ├── interviews/          ← Problem library "/interviews"
│       │   │   ├── resources/           ← Resource browser "/resources"
│       │   │   ├── (auth)/              ← Route group for auth pages
│       │   │   │   ├── sign-in/         ← Clerk sign-in
│       │   │   │   └── sign-up/         ← Clerk sign-up
│       │   │   └── api/health/          ← Edge runtime health check
│       │   ├── lib/
│       │   │   └── api-client.ts        ← Typed fetch client for the API Gateway
│       │   └── middleware.ts            ← Clerk middleware (conditional)
│       ├── Dockerfile
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       ├── postcss.config.js
│       ├── tsconfig.json
│       └── .env.example
│
├── services/                            ← All backend microservices (NestJS)
│   │
│   ├── api-gateway/                     ← Port 3001 — Single public entry point
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── gateway-proxy/       ← Dynamic reverse proxy to internal services
│   │   │   │   │   ├── gateway-proxy.controller.ts
│   │   │   │   │   ├── gateway-proxy.service.ts
│   │   │   │   │   └── gateway-proxy.module.ts
│   │   │   │   └── rate-limit/          ← Redis-backed rate limiting
│   │   │   │       ├── rate-limit.service.ts
│   │   │   │       └── rate-limit.module.ts
│   │   │   ├── common/
│   │   │   │   ├── guards/              ← Service auth guard (INTERNAL_SERVICE_SECRET)
│   │   │   │   ├── decorators/          ← Correlation ID header decorator
│   │   │   │   └── filters/             ← Global exception filter
│   │   │   ├── health/                  ← Health aggregation across all services
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env.example
│   │
│   ├── auth-service/                    ← Port 3002 — Identity & user profiles
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   └── users/               ← User profile CRUD + Clerk webhook handler
│   │   │   ├── common/                  ← Guards, decorators, filters
│   │   │   ├── health/
│   │   │   └── database/                ← Prisma service (auth_service schema)
│   │   ├── prisma/schema.prisma         ← User model (auth_service schema)
│   │   └── ...
│   │
│   ├── learning-service/                ← Port 3003 — Curriculum & lessons
│   │   ├── src/modules/
│   │   │   ├── topics/                  ← Topics: list, get by slug
│   │   │   └── lessons/                 ← Lessons: list by topic, get by slug
│   │   ├── prisma/schema.prisma         ← Topic, Lesson models (learning_service schema)
│   │   └── ...
│   │
│   ├── progress-service/                ← Port 3004 — User learning progress
│   │   ├── src/modules/
│   │   │   ├── lesson-progress/         ← Mark complete, get completion status
│   │   │   ├── bookmarks/               ← Bookmark / unbookmark lessons
│   │   │   └── learning-stats/          ← Aggregated learning statistics
│   │   ├── prisma/schema.prisma         ← LessonProgress, Bookmark, LearningStats
│   │   └── ...
│   │
│   ├── playground-service/              ← Port 3005 — Architecture diagram canvas
│   │   ├── src/modules/
│   │   │   ├── projects/                ← Create, read, update, delete projects
│   │   │   └── simulation/              ← Trigger & track simulation runs
│   │   ├── prisma/schema.prisma         ← ArchitectureProject, Simulation models
│   │   └── ...
│   │
│   ├── interview-service/               ← Port 3006 — System design interview problems
│   │   ├── src/modules/
│   │   │   └── problems/                ← CRUD with company/tag/difficulty filters
│   │   ├── prisma/schema.prisma         ← InterviewProblem, Hint, EvaluationRubric
│   │   └── ...
│   │
│   ├── resource-service/                ← Port 3007 — Curated external resources
│   │   ├── src/modules/
│   │   │   └── resources/               ← Browse, search, filter by category
│   │   ├── prisma/schema.prisma         ← Resource model (resource_service schema)
│   │   └── ...
│   │
│   ├── organization-service/            ← Port 3008 — Multi-tenant orgs & RBAC
│   │   ├── src/modules/
│   │   │   ├── organizations/           ← Org CRUD
│   │   │   └── memberships/             ← Add/remove members, assign roles
│   │   ├── prisma/schema.prisma         ← Organization, OrgMembership models
│   │   └── ...
│   │
│   └── notification-service/            ← Port 3009 — Email & background jobs
│       ├── src/modules/
│       │   └── notifications/           ← Queue email jobs via BullMQ
│       ├── prisma/schema.prisma         ← NotificationLog model
│       └── ...
│
├── packages/                            ← Shared internal packages (compiled TypeScript)
│   ├── types/                           ← Shared TypeScript type definitions
│   ├── contracts/                       ← Zod schemas for all inter-service API contracts
│   ├── config/                          ← Shared configuration helpers (env parsing)
│   ├── logger/                          ← Pino logger with request context & redaction
│   ├── observability/                   ← OpenTelemetry + Sentry SDK setup
│   └── validation/                      ← NestJS ZodValidationPipe
│
├── infrastructure/
│   ├── docker/
│   │   └── postgres/
│   │       └── init.sql                 ← Creates 8 schemas + dedicated DB users
│   ├── terraform/
│   │   ├── main.tf                      ← AWS provider, VPC, security groups
│   │   ├── variables.tf                 ← All Terraform input variables
│   │   ├── outputs.tf                   ← Exported values (ALB URL, RDS endpoint, etc.)
│   │   ├── ecs.tf                       ← ECS Fargate task definitions for all services
│   │   ├── rds.tf                       ← RDS PostgreSQL 16 instance
│   │   └── elasticache.tf               ← ElastiCache Redis cluster
│   ├── aws/
│   │   └── README.md                    ← AWS deployment guide
│   └── monitoring/
│       ├── otel-collector-config.yaml   ← OpenTelemetry collector pipeline config
│       └── prometheus.yml               ← Prometheus scrape config
│
├── docs/
│   ├── architecture/
│   │   ├── overview.md                  ← High-level system overview
│   │   ├── microservices-topology.md    ← Detailed service mesh diagram
│   │   ├── data-isolation.md            ← Database per service explained
│   │   └── redis-patterns.md            ← Redis key namespacing & patterns
│   ├── adr/                             ← Architectural Decision Records
│   │   ├── ADR-001-microservices-architecture.md
│   │   ├── ADR-002-development-order.md
│   │   ├── ADR-003-clerk-auth.md
│   │   ├── ADR-004-no-billing-mvp.md
│   │   ├── ADR-005-database-per-service.md
│   │   └── ADR-006-redis-caching-and-rate-limiting.md
│   ├── api/
│   │   ├── api-gateway-spec.md          ← All public API routes
│   │   └── contracts-guide.md           ← How to use the contracts package
│   └── security/
│       ├── security-baseline.md         ← OWASP controls, headers, secrets
│       └── rbac-and-tenant-isolation.md ← RBAC model, tenant boundaries
│
├── scripts/
│   ├── setup-dev.sh                     ← Linux/macOS dev environment bootstrap
│   ├── setup-dev.ps1                    ← Windows PowerShell dev bootstrap
│   └── seed-databases.ts               ← Seed all service databases with demo data
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                       ← PR CI: lint, typecheck, test, build
│   │   └── docker-build.yml             ← Docker image build & push on merge to main
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docker-compose.yml                   ← Local full-stack compose (all services)
├── pnpm-workspace.yaml                  ← pnpm workspace definition
├── turbo.json                           ← Turborepo task pipeline config
├── tsconfig.base.json                   ← Base TypeScript config inherited by all packages
├── package.json                         ← Root scripts (dev, build, lint, etc.)
├── .env.example                         ← Root infrastructure env template
├── .prettierrc                          ← Prettier config
├── .gitattributes                       ← Enforces LF line endings for .sh/.sql files
└── .gitignore
```

---

## 5. Service Registry

| Service | Port | DB Schema | Responsibility |
|---|---|---|---|
| `api-gateway` | **3001** | _(none — no DB)_ | Public entry point, reverse proxy, rate limiting, auth verification, correlation IDs, health aggregation |
| `auth-service` | **3002** | `auth_service` | User profile management, Clerk webhook ingestion (user.created / user.updated / user.deleted), session validation |
| `learning-service` | **3003** | `learning_service` | Topics, lessons, curriculum structure, lesson metadata, content APIs |
| `progress-service` | **3004** | `progress_service` | Lesson completions, bookmarks, quiz attempts, per-user learning statistics |
| `playground-service` | **3005** | `playground_service` | Architecture projects, React Flow diagram persistence, simulation triggers, sharing |
| `interview-service` | **3006** | `interview_service` | Interview problems, company/tag/difficulty filters, hints, evaluation rubrics |
| `resource-service` | **3007** | `resource_service` | Curated resources, categories, external links, full-text search metadata |
| `organization-service` | **3008** | `organization_service` | Multi-tenant orgs, memberships, RBAC roles, tenant isolation |
| `notification-service` | **3009** | `notification_service` | Email notifications, BullMQ background jobs, notification logs, learning reminders |

**Every service internally follows this structure:**

```
src/
├── modules/
│   └── <domain>/
│       ├── <domain>.controller.ts   ← HTTP handlers + route definitions
│       ├── <domain>.service.ts      ← Business logic
│       ├── <domain>.repository.ts   ← Database access via Prisma
│       ├── <domain>.module.ts       ← NestJS module declaration
│       ├── dto/                     ← Request/Response DTOs (Zod-validated)
│       └── schemas/                 ← Zod schemas for this domain
├── common/
│   ├── guards/
│   │   └── service-auth.guard.ts   ← Validates INTERNAL_SERVICE_SECRET header
│   ├── decorators/
│   │   └── correlation-id.decorator.ts
│   └── filters/
│       └── global-exception.filter.ts
├── health/
│   ├── health.controller.ts         ← GET /health endpoint
│   └── health.module.ts
├── database/
│   ├── prisma.service.ts            ← PrismaClient wrapper (singleton)
│   ├── database.module.ts           ← NestJS module for Prisma
│   └── generated/client/            ← Service-isolated Prisma client (auto-generated)
├── app.module.ts
└── main.ts
```

---

## 6. Shared Packages

| Package | Import Name | Description |
|---|---|---|
| `packages/types` | `@system-atlas/types` | Shared TypeScript interfaces and enums (UserRole, NotificationType, etc.) used across services |
| `packages/contracts` | `@system-atlas/contracts` | Zod schemas defining the shape of every API request/response. Used for validation at service boundaries |
| `packages/config` | `@system-atlas/config` | Environment variable parsers with defaults and validation. Prevents misconfigured services from starting |
| `packages/logger` | `@system-atlas/logger` | Pino-based structured logger with request correlation ID propagation and sensitive field redaction |
| `packages/observability` | `@system-atlas/observability` | OpenTelemetry SDK initialization + Sentry integration. Import in every service's `main.ts` |
| `packages/validation` | `@system-atlas/validation` | `ZodValidationPipe` for NestJS — validates incoming DTOs against Zod schemas and returns structured 400 errors |

---

## 7. Prerequisites

Ensure the following are installed before starting:

| Tool | Minimum Version | Download |
|---|---|---|
| **Node.js** | 20.x LTS | https://nodejs.org |
| **pnpm** | 9.x | `npm install -g pnpm` |
| **Docker Desktop** | Latest | https://www.docker.com/products/docker-desktop |
| **Git** | 2.x | https://git-scm.com |

> **Windows users**: WSL2 is recommended for running shell scripts. All PowerShell alternatives are also provided.

---

## 8. Quick Start

### Step 1 — Clone the repository

```bash
git clone https://github.com/your-org/system-atlas.git
cd system-atlas
```

### Step 2 — Set up environment files

Copy the root environment template:

```bash
# Linux / macOS / WSL2
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Then copy environment files for each service you plan to run:

```bash
# Linux / macOS / WSL2
for dir in services/*/; do cp "$dir.env.example" "$dir.env" 2>/dev/null || true; done
cp apps/web/.env.example apps/web/.env

# Windows PowerShell
Get-ChildItem -Path services -Directory | ForEach-Object { Copy-Item "$($_.FullName)\.env.example" "$($_.FullName)\.env" -ErrorAction SilentlyContinue }
Copy-Item apps\web\.env.example apps\web\.env
```

### Step 3 — Start infrastructure (PostgreSQL + Redis)

```bash
docker compose up -d postgres redis
```

Wait for health checks to pass (about 15 seconds):

```bash
docker compose ps
```

Both `postgres` and `redis` should show `healthy`.

### Step 4 — Install all dependencies

```bash
pnpm install
```

This installs dependencies for the root, all services, all packages, and the frontend in one command via pnpm workspaces.

### Step 5 — Generate Prisma clients

Each service has its own isolated Prisma client. Generate all of them:

```bash
pnpm db:generate
```

This runs `prisma generate` for all 8 services that have a database (api-gateway has no DB).

### Step 6 — Run database migrations

```bash
pnpm db:migrate
```

This runs `prisma migrate dev` for each service, creating all tables inside their respective PostgreSQL schemas.

> **Note**: PostgreSQL must be running (Step 3) before this step.

### Step 7 — (Optional) Seed demo data

```bash
pnpm tsx scripts/seed-databases.ts
```

### Step 8 — Start development servers

**Option A — Start all services + frontend:**

```bash
pnpm dev
```

**Option B — Start core services only (faster for frontend dev):**

```bash
pnpm dev:core
```

This starts: `web` (3000), `api-gateway` (3001), `auth-service` (3002), `learning-service` (3003).

### Step 9 — Open in browser

| URL | Service |
|---|---|
| http://localhost:3000 | Frontend (Next.js) |
| http://localhost:3001/health | API Gateway health |
| http://localhost:3001/api/v1/learning/topics | Learning Service via Gateway |

---

### Alternative: Automated Setup Scripts

**Linux / macOS / WSL2:**

```bash
chmod +x scripts/setup-dev.sh
./scripts/setup-dev.sh
```

**Windows PowerShell (run as Administrator):**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\scripts\setup-dev.ps1
```

These scripts automate Steps 1–7 above.

---

## 9. Environment Variables

### Root `.env` (Infrastructure)

```env
# PostgreSQL (used by docker-compose)
POSTGRES_USER=atlas
POSTGRES_PASSWORD=atlas_dev_password
POSTGRES_DB=atlas

# Redis
REDIS_PASSWORD=atlas_dev_redis
REDIS_PORT=6379

# Shared secret for internal service-to-service calls
INTERNAL_SERVICE_SECRET=atlas_internal_super_secret_key_32chars!

# Observability
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
SENTRY_DSN=
```

### `apps/web/.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### `services/api-gateway/.env`

```env
PORT=3001
NODE_ENV=development
INTERNAL_SERVICE_SECRET=atlas_internal_super_secret_key_32chars!
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=atlas_dev_redis
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
AUTH_SERVICE_URL=http://localhost:3002
LEARNING_SERVICE_URL=http://localhost:3003
PROGRESS_SERVICE_URL=http://localhost:3004
PLAYGROUND_SERVICE_URL=http://localhost:3005
INTERVIEW_SERVICE_URL=http://localhost:3006
RESOURCE_SERVICE_URL=http://localhost:3007
ORGANIZATION_SERVICE_URL=http://localhost:3008
NOTIFICATION_SERVICE_URL=http://localhost:3009
```

### `services/auth-service/.env`

```env
PORT=3002
NODE_ENV=development
DATABASE_URL=postgresql://auth_user:auth_dev_pwd@localhost:5432/atlas?schema=auth_service
INTERNAL_SERVICE_SECRET=atlas_internal_super_secret_key_32chars!
CLERK_SECRET_KEY=sk_test_your_key_here
CLERK_WEBHOOK_SECRET=whsec_your_svix_webhook_secret_here
```

### Domain Services (learning, progress, playground, interview, resource, organization, notification)

Each follows the same pattern — replace `<service>` with the service name:

```env
PORT=<port>
NODE_ENV=development
DATABASE_URL=postgresql://<service>_user:<service>_dev_pwd@localhost:5432/atlas?schema=<service>_service
INTERNAL_SERVICE_SECRET=atlas_internal_super_secret_key_32chars!
# Redis (for services that use BullMQ or caching):
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=atlas_dev_redis
```

---

## 10. Clerk Auth Setup

System Atlas uses [Clerk](https://clerk.com) for identity. The app runs without Clerk configured (pages show a setup notice), but full auth requires these steps:

### Step 1 — Create a Clerk Application

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Click **"Add application"**
3. Name it `System Atlas`
4. Enable **Email** and **Google OAuth**
5. Click **Create Application**

### Step 2 — Copy API Keys

From your Clerk dashboard → **API Keys**:

- Copy **Publishable Key** → paste as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in `apps/web/.env`
- Copy **Secret Key** → paste as `CLERK_SECRET_KEY` in both `apps/web/.env` and `services/auth-service/.env`

### Step 3 — Configure Webhook (for auth-service)

1. In Clerk dashboard → **Webhooks** → **Add Endpoint**
2. Set URL to: `https://your-domain.com/api/v1/auth/webhooks/clerk`
   - For local dev: use [ngrok](https://ngrok.com) or [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) to expose `http://localhost:3001`
3. Subscribe to events: `user.created`, `user.updated`, `user.deleted`
4. Copy the **Signing Secret** → paste as `CLERK_WEBHOOK_SECRET` in `services/auth-service/.env`

### Step 4 — Restart services

```bash
pnpm dev:core
```

---

## 11. Database Architecture

System Atlas enforces **database-per-service isolation** at the PostgreSQL schema level.

### Schema Layout

All services share one PostgreSQL instance but are **completely isolated** via schemas and dedicated DB users:

```
PostgreSQL Instance (atlas)
│
├── Schema: auth_service         → User: auth_user
├── Schema: learning_service     → User: learning_user
├── Schema: progress_service     → User: progress_user
├── Schema: playground_service   → User: playground_user
├── Schema: interview_service    → User: interview_user
├── Schema: resource_service     → User: resource_user
├── Schema: organization_service → User: organization_user
└── Schema: notification_service → User: notification_user
```

### Why Schema Isolation?

| Property | Benefit |
|---|---|
| **No cross-service joins** | Services cannot query each other's data at the DB layer |
| **Independent migrations** | Each service runs `prisma migrate dev` independently |
| **Isolated Prisma clients** | Each service generates its own client with only its models |
| **Blast radius containment** | A broken migration in one service does not affect others |
| **Future extraction path** | Each schema can be moved to its own PostgreSQL instance as load grows |

### Prisma Client Isolation

Each service's `schema.prisma` specifies a local output directory:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/database/generated/client"
}
```

This means services **never import from `@prisma/client`** — they import from their own generated client:

```typescript
// ✅ Correct — isolated client
import { PrismaClient } from '../../database/generated/client';

// ❌ Wrong — shared global client
import { PrismaClient } from '@prisma/client';
```

### init.sql Bootstrap

When Docker starts PostgreSQL for the first time, `infrastructure/docker/postgres/init.sql` runs and:

1. Creates all 8 schemas
2. Creates dedicated database users with unique passwords
3. Grants each user `USAGE` and `CREATE` on its own schema only
4. Revokes all cross-schema access

---

## 12. Redis Architecture

Redis serves multiple roles in System Atlas, with key namespacing to prevent collisions:

### Key Namespaces

| Namespace | Used By | Purpose |
|---|---|---|
| `atlas:rate:<ip>` | api-gateway | Sliding window rate limit counter per IP |
| `atlas:rate:<userId>` | api-gateway | Authenticated user rate limit counter |
| `atlas:cache:learning:*` | learning-service | Cached topic/lesson lists (TTL 5 min) |
| `atlas:cache:resource:*` | resource-service | Cached resource search results |
| `atlas:bull:notification` | notification-service | BullMQ job queue for email delivery |
| `atlas:bull:reminder` | notification-service | BullMQ delayed job queue for reminders |
| `atlas:session:*` | auth-service | Session metadata cache |

### Rate Limiting (API Gateway)

- **Unauthenticated**: 100 requests per 60 seconds per IP
- **Authenticated**: 300 requests per 60 seconds per user ID
- Returns `429 Too Many Requests` with `Retry-After` header

### BullMQ Queues (Notification Service)

```
Queue: atlas:bull:notification
  └── Job: send-email
      ├── to: string
      ├── subject: string
      ├── template: 'welcome' | 'lesson-reminder' | 'account'
      └── data: Record<string, unknown>

Queue: atlas:bull:reminder
  └── Job: lesson-reminder (delayed)
      ├── userId: string
      └── lessonId: string
```

---

## 13. API Gateway & Routing

The API Gateway (`localhost:3001`) is the **only** publicly exposed backend endpoint. The frontend always communicates through it.

### Route Structure

```
/health                        → Gateway health + all downstream service health checks
/api/v1/:service/*             → Dynamic proxy to the corresponding internal service

Examples:
GET  /api/v1/learning/topics          → learning-service:3003/topics
POST /api/v1/progress/lesson-progress → progress-service:3004/lesson-progress
GET  /api/v1/interviews/problems      → interview-service:3006/problems
GET  /api/v1/auth/users/me            → auth-service:3002/users/me
```

### Service Name Mapping

| Path Segment | Routes To |
|---|---|
| `auth` | `AUTH_SERVICE_URL` (3002) |
| `learning` | `LEARNING_SERVICE_URL` (3003) |
| `progress` | `PROGRESS_SERVICE_URL` (3004) |
| `playground` | `PLAYGROUND_SERVICE_URL` (3005) |
| `interviews` | `INTERVIEW_SERVICE_URL` (3006) |
| `resources` | `RESOURCE_SERVICE_URL` (3007) |
| `organizations` | `ORGANIZATION_SERVICE_URL` (3008) |
| `notifications` | `NOTIFICATION_SERVICE_URL` (3009) |

### Request Flow

```
1. Request arrives at Gateway
2. Correlation ID generated/propagated (X-Correlation-ID header)
3. Rate limit checked against Redis
4. JWT from Clerk verified (for protected routes)
5. Request forwarded to target service with:
   - X-User-ID header
   - X-Correlation-ID header
   - X-Internal-Secret header
6. Service response forwarded back to client
```

---

## 14. Development Workflow

### Running Individual Services

```bash
# Run only the learning service
pnpm --filter @system-atlas/learning-service dev

# Run only the frontend
pnpm --filter @system-atlas/web dev

# Build a specific service
pnpm --filter @system-atlas/auth-service build
```

### Building All Packages

```bash
pnpm build
```

Turborepo runs builds in dependency order: packages first, then services, then apps.

### Type Checking

```bash
# Check all packages and services
pnpm typecheck

# Check a specific service
pnpm --filter @system-atlas/playground-service typecheck
```

### Linting

```bash
# Lint everything
pnpm lint

# Format all files with Prettier
pnpm format

# Check formatting without writing
pnpm format:check
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for a specific service
pnpm --filter @system-atlas/api-gateway test
```

Test files are located at `services/<name>/test/*.spec.ts`.

### Database Commands (per-service)

```bash
# Generate Prisma client for all services
pnpm db:generate

# Run migrations for all services
pnpm db:migrate

# Open Prisma Studio for the learning service
cd services/learning-service
npx prisma studio
```

### Cleaning Build Artifacts

```bash
pnpm clean
```

---

## 15. Docker & Infrastructure

### Local Docker Compose

The `docker-compose.yml` defines the full local stack:

| Container | Image | Port | Purpose |
|---|---|---|---|
| `atlas-postgres` | postgres:16-alpine | 5432 | Primary database |
| `atlas-redis` | redis:7-alpine | 6379 | Cache & queue broker |
| `atlas-api-gateway` | Built from source | 3001 | API Gateway |
| `atlas-auth-service` | Built from source | 3002 | Auth Service |
| `atlas-learning-service` | Built from source | 3003 | Learning Service |
| `atlas-progress-service` | Built from source | 3004 | Progress Service |
| `atlas-playground-service` | Built from source | 3005 | Playground Service |
| `atlas-interview-service` | Built from source | 3006 | Interview Service |
| `atlas-resource-service` | Built from source | 3007 | Resource Service |
| `atlas-organization-service` | Built from source | 3008 | Organization Service |
| `atlas-notification-service` | Built from source | 3009 | Notification Service |
| `atlas-web` | Built from source | 3000 | Next.js Frontend |

**Start infrastructure only (recommended for dev):**

```bash
docker compose up -d postgres redis
```

**Start the full stack with Docker:**

```bash
docker compose up --build
```

**Stop everything:**

```bash
docker compose down
```

**Destroy volumes (WARNING: deletes all data):**

```bash
docker compose down -v
```

### AWS Infrastructure (Terraform)

The `infrastructure/terraform/` directory contains IaC for deploying to AWS:

| File | Resources Defined |
|---|---|
| `main.tf` | AWS provider, VPC, subnets, security groups, IAM roles |
| `ecs.tf` | ECS Fargate cluster, task definitions for all 9 services + frontend |
| `rds.tf` | RDS PostgreSQL 16 instance (Multi-AZ in production) |
| `elasticache.tf` | ElastiCache Redis 7 cluster |
| `variables.tf` | All configurable inputs (region, instance sizes, etc.) |
| `outputs.tf` | ALB DNS, RDS endpoint, Redis endpoint, ECR URLs |

**Initialize Terraform:**

```bash
cd infrastructure/terraform
terraform init
terraform plan -var-file=production.tfvars
terraform apply -var-file=production.tfvars
```

See `infrastructure/aws/README.md` for the full AWS deployment guide.

---

## 16. CI/CD Pipeline

### `ci.yml` — Pull Request Checks

Triggered on every PR to `main` or `develop`:

```
1. Install dependencies (pnpm install)
2. Build all packages
3. Lint (ESLint across all workspaces)
4. Type check (tsc --noEmit across all workspaces)
5. Run all tests (Jest)
6. Build all services (verify no compile errors)
```

### `docker-build.yml` — Docker Image Build & Push

Triggered on merge to `main`:

```
1. Log in to Amazon ECR
2. Build Docker image for each service
3. Tag with git SHA and 'latest'
4. Push to ECR
```

### Branch Strategy

| Branch | Purpose | CI Triggered |
|---|---|---|
| `main` | Production-ready code | CI + Docker build + push |
| `develop` | Integration branch | CI only |
| `feature/*` | Feature branches | CI only |
| `fix/*` | Bug fix branches | CI only |

---

## 17. Security Baseline

### Authentication & Authorization

- **Identity**: All identity is managed by Clerk. No passwords stored in System Atlas databases.
- **JWT Verification**: API Gateway validates Clerk JWTs on every protected request.
- **Service-to-Service**: Internal calls use `X-Internal-Secret` header with `INTERNAL_SERVICE_SECRET`.
- **RBAC**: Organization members have roles: `OWNER`, `ADMIN`, `MEMBER`. Enforced in organization-service.

### HTTP Security Headers

All services apply via NestJS Helmet:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

### OWASP Controls

| Control | Implementation |
|---|---|
| Input Validation | Zod schemas at all API boundaries (ZodValidationPipe) |
| Rate Limiting | Redis sliding window, 100 req/min unauthenticated |
| Injection Prevention | Prisma parameterized queries only |
| Sensitive Data | Pino logger redacts `authorization`, `password`, `token` fields |
| Error Handling | GlobalExceptionFilter — no stack traces in production responses |
| Request Size | NestJS body size limit (10mb default) |
| CORS | Configured per-service with allowed origin whitelist |

### Tenant Isolation

- PostgreSQL schema-level isolation (users cannot query across service schemas)
- Organization data is scoped by `organizationId` in every query
- No shared Prisma client instances between services

See [`docs/security/security-baseline.md`](docs/security/security-baseline.md) and [`docs/security/rbac-and-tenant-isolation.md`](docs/security/rbac-and-tenant-isolation.md) for details.

---

## 18. Development Phases

System Atlas is built in 7 ordered phases, each delivering a vertical slice of working functionality:

| Phase | Deliverable | Services Involved |
|---|---|---|
| **Phase 1** | Core infrastructure up: PostgreSQL, Redis, Docker Compose, Turborepo pipeline | All (infra) |
| **Phase 2** | Auth working end-to-end: Clerk login, webhook sync, user profile stored | `auth-service`, `api-gateway`, `web` |
| **Phase 3** | Learning curriculum live: Topics and lessons browsable, progress tracked | `learning-service`, `progress-service`, `web` |
| **Phase 4** | Interview problem library: Browse, filter, view problems with hints | `interview-service`, `web` |
| **Phase 5** | Playground canvas: Create projects, draw diagrams, persist to DB | `playground-service`, `web` |
| **Phase 6** | Resource library + Organizations: Resource browser, org creation, member RBAC | `resource-service`, `organization-service`, `web` |
| **Phase 7** | Notifications + Observability: Email reminders, OpenTelemetry tracing, Sentry errors | `notification-service`, observability infra |

---

## 19. Architectural Decision Records

All major architectural decisions are documented as ADRs in [`docs/adr/`](docs/adr/):

| ADR | Decision |
|---|---|
| [ADR-001](docs/adr/ADR-001-microservices-architecture.md) | Domain-oriented microservices over modular monolith |
| [ADR-002](docs/adr/ADR-002-development-order.md) | 7-phase development order |
| [ADR-003](docs/adr/ADR-003-clerk-auth.md) | Clerk for hosted auth (no custom password protocol) |
| [ADR-004](docs/adr/ADR-004-no-billing-mvp.md) | Billing explicitly excluded from MVP scope |
| [ADR-005](docs/adr/ADR-005-database-per-service.md) | Database per service with schema isolation |
| [ADR-006](docs/adr/ADR-006-redis-caching-and-rate-limiting.md) | Redis for rate limiting and BullMQ background jobs |

---

## 20. Contributing

### Setup

Follow the [Quick Start](#8-quick-start) guide above. All development happens in feature branches.

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(learning): add lesson slug search endpoint
fix(api-gateway): handle empty service key in proxy route
chore(deps): upgrade prisma to 6.2.0
docs(adr): add ADR-007 for event-driven notifications
```

### Pull Request Checklist

Before opening a PR, verify:

- [ ] `pnpm lint` passes with no errors
- [ ] `pnpm typecheck` passes with no errors
- [ ] `pnpm test` passes (or new tests added for changed behavior)
- [ ] `pnpm build` succeeds
- [ ] No secrets or `.env` files committed
- [ ] New environment variables added to relevant `.env.example` files
- [ ] No cross-service database imports (each service uses only its own Prisma client)
- [ ] No billing-related code introduced

See [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md) for the full checklist.

### Adding a New Service

1. Create `services/<new-service>/` following the standard service structure above
2. Add it to `pnpm-workspace.yaml`
3. Add it to `turbo.json` pipeline if it has build/dev/test tasks
4. Add a Docker service block to `docker-compose.yml`
5. Add a schema + user to `infrastructure/docker/postgres/init.sql`
6. Add the service URL to `api-gateway` environment config
7. Add the route mapping in `gateway-proxy.service.ts`
8. Write an ADR if the new service introduces architectural changes

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with ❤️ as a learning platform for engineers who want to master distributed systems.
</p>
