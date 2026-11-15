## Architectural Alignment Checklist

- [ ] **No Billing Code**: Confirmed zero Stripe, payment, checkout, or billing table dependencies.
- [ ] **Database Isolation**: No cross-schema or direct queries to another service's database.
- [ ] **Data Access**: Cross-service data is fetched via public internal APIs or shared contracts.
- [ ] **Boundary Validation**: Zod schema validation applied at API boundary.
- [ ] **Security**: Server-side RBAC and tenant check implemented for organization data.
- [ ] **Correlation ID**: Log entries and outgoing requests propagate `X-Correlation-ID`.
- [ ] **Rate Limiting**: Protected endpoints have configured Redis rate limits.
