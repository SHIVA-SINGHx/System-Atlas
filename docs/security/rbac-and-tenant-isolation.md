# RBAC & Tenant Isolation

## Roles
- **Platform Roles**: `USER`, `STAFF`, `ADMIN`
- **Tenant Roles**: `OWNER`, `ADMIN`, `MEMBER`

## Tenant Context Enforcement
Every request targeting organization data must include `X-Org-ID`. The `organization-service` validates membership before permitting access, guaranteeing that cross-tenant queries cannot leak data.
