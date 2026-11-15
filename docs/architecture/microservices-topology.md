# Microservices Topology & Port Assignments

| Service | Port | Protocol | Primary Database | Redis Role |
| :--- | :--- | :--- | :--- | :--- |
| **apps/web** | 3000 | HTTP | None | Client State / React Query |
| **api-gateway** | 3001 | HTTP | None | Distributed Rate Limiting |
| **auth-service** | 3002 | HTTP | `auth_service` schema | None |
| **learning-service** | 3003 | HTTP | `learning_service` schema | Content Cache |
| **progress-service** | 3004 | HTTP | `progress_service` schema | Streak & Cache Aggregations |
| **playground-service** | 3005 | HTTP | `playground_service` schema | Simulation Rate Limiting |
| **interview-service** | 3006 | HTTP | `interview_service` schema | Problem Cache |
| **resource-service** | 3007 | HTTP | `resource_service` schema | Search Metadata Cache |
| **organization-service** | 3008 | HTTP | `organization_service` schema | Tenant Membership Cache |
| **notification-service** | 3009 | HTTP | `notification_service` schema | BullMQ Job Queue |
