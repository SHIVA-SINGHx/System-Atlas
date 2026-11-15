# ADR-004: Complete Exclusion of Billing from Current Scope

- **Status**: Accepted
- **Decision**: Completely exclude all billing, Stripe, subscription checkouts, payment webhooks, and billing tables from the application.
- **Rationale**: Keeps the domain model focused on educational value and prevents premature complexity. When billing is needed, it will be added as a separate bounded context (`billing-service`).
