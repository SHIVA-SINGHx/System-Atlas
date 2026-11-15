# ADR-001: Domain-Oriented Microservices Architecture

- **Status**: Accepted
- **Context**: System Atlas requires independent deployment, team autonomy, and decoupled scaling characteristics for curriculum, architecture simulations, and organization management.
- **Decision**: Adopt a pnpm workspace and Turborepo monorepo housing 9 domain-oriented NestJS microservices and a Next.js App Router web application.
- **Consequences**: Enables modular testing, independent database schemas, and clean boundary contracts. Requires robust API gateway routing and distributed tracing.
