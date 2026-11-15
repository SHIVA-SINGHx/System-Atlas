# System Atlas — Architecture Overview

System Atlas is an enterprise-grade System Design education SaaS engineered with a **clean, domain-oriented microservices architecture**.

## Architectural Principles

1. **Explicit Domain Boundaries**: Every service is a self-contained bounded context (DDD) handling a distinct business responsibility.
2. **Strict Database Ownership**: Each service owns its dedicated PostgreSQL schema and connection credentials. Direct cross-database access is strictly prohibited.
3. **Synchronous REST & Asynchronous Queues**: Internal communication utilizes REST with standard response contracts and timeouts. Asynchronous tasks (notifications, reminders) use BullMQ over Redis.
4. **Complete Separation of Billing**: Billing is intentionally out of scope for the current version, keeping core learning models unpolluted while maintaining clean integration seams for future bounded contexts.
5. **Defense in Depth**: Every service validates its own identity and authorization; the API Gateway acts as the public edge protector but not the sole barrier.

## Monorepo Topography

```
system-atlas/
├── apps/
│   └── web/                     # Next.js App Router (React Flow, Tailwind, Motion)
├── services/
│   ├── api-gateway/             # Public entry point, Clerk auth, rate limiting
│   ├── auth-service/            # Clerk sync, user profiles, security events
│   ├── learning-service/        # Topics, lessons, curriculum metadata
│   ├── progress-service/        # Completion, bookmarks, streaks & statistics
│   ├── playground-service/      # Architecture projects, diagrams, simulations
│   ├── interview-service/       # Problems, company tags, rubrics, hints
│   ├── resource-service/        # Curated papers, books, articles
│   ├── organization-service/    # Tenants, memberships, RBAC
│   └── notification-service/    # In-app notifications, BullMQ background jobs
├── packages/
│   ├── contracts/               # Shared Zod schemas, API DTOs, response contracts
│   ├── config/                  # Validated environment schemas & loaders
│   ├── logger/                  # Pino structured JSON logging with redaction
│   ├── observability/           # OpenTelemetry tracing & Sentry error reporting
│   ├── validation/              # NestJS Zod validation pipes & sanitizers
│   └── types/                   # Ambient TypeScript types & utility types
├── infrastructure/
│   ├── docker/                  # Database init scripts with role isolation
│   ├── terraform/               # AWS IaC (VPC, ECS Fargate, RDS, ElastiCache)
│   └── monitoring/              # OpenTelemetry Collector & Prometheus configs
├── docs/                        # ADRs, API specs, security baseline
└── scripts/                     # Developer setup and onboarding automation
```
