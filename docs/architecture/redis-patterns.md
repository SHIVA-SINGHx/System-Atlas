# Redis Architecture & Caching Strategy

## Key Namespacing Standard
Every Redis key must follow the format:
`<service-name>:<tenant-id-or-global>:<domain-entity>:<entity-id>`

Examples:
- `ratelimit:ip:192.168.1.1`
- `learning:global:topic:distributed-caching`
- `org:org_abc123:membership:user_xyz`

## Distributed Rate Limiting
- **Algorithm**: Redis Sorted Set (ZSET) Sliding Window.
- **Fail-Open Strategy**: If Redis experiences network partition, rate limiting fails open gracefully while emitting high-priority alerts.
