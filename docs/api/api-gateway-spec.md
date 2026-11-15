# System Atlas — API Gateway Specification

The API Gateway is the single public entry point to the System Atlas microservices mesh.

## Port & Protocol
- **Port**: `3001` (Dev/Docker)
- **Protocol**: HTTP/HTTPS
- **Base Route**: `/api/v1/:service/*`

## Security Enforcement
- **Public Endpoints**: `/health`, `/docs`, `/api/v1/auth/clerk-webhook`, `/api/v1/learning/topics`
- **Protected Endpoints**: Require valid `Authorization: Bearer <clerk_token>`
- **Internal Secret Injection**: Gateway attaches `X-Service-Secret` before proxying requests to downstream private microservices.

## Correlation & Tracing
- Injects or propagates `X-Correlation-ID` on all incoming requests.
- Returns `X-Correlation-ID` in every response header for end-to-end tracing.

## Rate Limiting Headers
- `Retry-After`: Returned on HTTP 429 status code.
