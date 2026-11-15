<div align="center">
  <h1>⚡ System Atlas</h1>
  <p><strong>Enterprise System Design Education SaaS</strong></p>
  <p>Modular, Domain-Driven Microservices Architecture</p>
</div>

---

## 🛠️ Monorepo Stack

- **Monorepo Tools**: `pnpm` Workspaces, `Turborepo`
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Motion, React Flow
- **Backend Services**: NestJS, TypeScript, REST APIs, Zod, Prisma ORM
- **Databases & Cache**: PostgreSQL 16 (Dedicated Schemas & Roles), Redis 7
- **Background Jobs**: BullMQ
- **Identity & Auth**: Clerk (Webhook synchronization via Svix)
- **Observability**: OpenTelemetry, Sentry, Pino Structured Logging
- **DevOps**: Docker, Docker Compose, Terraform, GitHub Actions

## 📦 Service Registry

| Service | Port | Description |
| :--- | :--- | :--- |
| `apps/web` | 3000 | Next.js Frontend (Curriculum, Canvas Playground, Interview Library) |
| `api-gateway` | 3001 | Public edge router, Clerk auth verify, Redis rate limiting |
| `auth-service` | 3002 | Clerk identity synchronization, user profiles, security events |
| `learning-service` | 3003 | Curriculum, topics, lessons, Markdown content |
| `progress-service` | 3004 | Lesson progress, bookmarks, learning stats & streaks |
| `playground-service` | 3005 | Architecture diagram persistence, components, simulations |
| `interview-service` | 3006 | System design interview problems, hints, rubrics, company tags |
| `resource-service` | 3007 | Curated white papers, reference books, case studies, search |
| `organization-service` | 3008 | Multi-tenant organizations, memberships, RBAC enforcement |
| `notification-service` | 3009 | In-app notifications, BullMQ background job queues |

## 🚀 Quickstart for Local Development

### Prerequisites
- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)
- Docker Desktop

### 1. Initialize Environment
```powershell
# Windows PowerShell
.\scripts\setup-dev.ps1

# Linux / macOS
chmod +x ./scripts/setup-dev.sh
./scripts/setup-dev.sh
```

### 2. Install Dependencies & Build
```bash
pnpm install
pnpm build
```

### 3. Run Microservices
```bash
# Start all microservices and frontend simultaneously via Turborepo
pnpm dev
```

Visit:
- **Web App**: http://localhost:3000
- **API Gateway**: http://localhost:3001
- **Gateway Swagger**: http://localhost:3001/docs
