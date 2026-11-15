# ADR-003: Clerk Identity & Verified Auth Integration

- **Status**: Accepted
- **Decision**: Use Clerk for user identity and multi-tenant organization management rather than rolling a custom password auth stack.
- **Consequences**: Webhooks (Svix verified) keep local `auth_service` user profiles synchronized. Gateway and downstream services verify JWT signatures and extract user context safely.
