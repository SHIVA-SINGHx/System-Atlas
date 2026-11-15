FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./
COPY packages/ ./packages/
COPY services/auth-service/package.json ./services/auth-service/
RUN pnpm install --filter @system-atlas/auth-service...

FROM deps AS builder
COPY services/auth-service/ ./services/auth-service/
WORKDIR /app/services/auth-service
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/services/auth-service/dist ./services/auth-service/dist
COPY --from=builder /app/services/auth-service/package.json ./services/auth-service/package.json
COPY --from=deps /app/node_modules ./node_modules
WORKDIR /app/services/auth-service
EXPOSE 3002
USER node
CMD ["node", "dist/main"]
