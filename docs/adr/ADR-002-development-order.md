# ADR-002: Staged Development Order

- **Status**: Accepted
- **Decision**: Build the platform in 7 distinct phases:
  - Phase 1: Monorepo, Web, API Gateway, Auth, Postgres, Redis, Docker Compose
  - Phase 2: Learning Service, Progress Service, Lesson Experience, User Dashboard
  - Phase 3: Organization Service, RBAC, Tenant Isolation
  - Phase 4: Playground Service, Diagram Persistence, Simulation Protection
  - Phase 5: Interview Service, Resource Service, Search
  - Phase 6: Notification Service, Background Jobs, Observability
  - Phase 7: Independent Builds, CI/CD, Terraform, AWS Deployment
