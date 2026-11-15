# Database Ownership & Data Isolation

## Principle of Exclusive Schema Ownership

1. **Independent Schemas**: In local Docker Compose, PostgreSQL runs with multiple schemas (`auth_service`, `learning_service`, etc.) and dedicated users (`auth_user`, `learning_user`).
2. **Dedicated Credentials**: A service is given credentials that only have permissions for its assigned schema. Queries referencing other schemas fail at the database level.
3. **No Cross-Service Joins**: A service must never execute joins across database boundaries.
4. **Foreign Key Strategy**: Only relationships within the same service use database foreign keys. Cross-service references use UUIDs without physical FK constraints (e.g. `userId` in `playground_service`).
