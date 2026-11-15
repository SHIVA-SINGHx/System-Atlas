# ADR-005: Database per Service Pattern

- **Status**: Accepted
- **Decision**: Every microservice owns its data exclusively. No service may query another service's database directly.
- **Consequences**: Independent schema migrations via Prisma, clean transaction boundaries, zero cross-service lock contention.
