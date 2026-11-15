# System Atlas — Security Baseline (OWASP API Top 10)

1. **Broken Object Level Authorization (BOLA)**: Services verify that the `userId` in the request context owns the targeted resource or holds active organization permissions.
2. **Broken Authentication**: API Gateway inspects Bearer tokens; internal services enforce `X-Service-Secret`.
3. **Unrestricted Resource Consumption**: Redis-backed sliding window rate limiters enforce IP and user-based request thresholds.
4. **Injection**: All database interactions use Prisma parameterized queries; inputs are validated with Zod.
5. **Sensitive Data Exposure**: Pino logger redacts passwords, tokens, API keys, and session secrets.
