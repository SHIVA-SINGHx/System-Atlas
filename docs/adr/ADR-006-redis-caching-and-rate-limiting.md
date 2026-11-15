# ADR-006: Redis for Distributed Rate Limiting and Caching

- **Status**: Accepted
- **Decision**: Use Redis exclusively for ephemeral data: distributed sliding window rate limiting, cache-aside entity caching, and BullMQ queue orchestration. Critical business state is always persisted in PostgreSQL.
