FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./
COPY packages/ ./packages/
COPY services/notification-service/package.json ./services/notification-service/
RUN pnpm install --filter @system-atlas/notification-service...

FROM deps AS builder
COPY services/notification-service/ ./services/notification-service/
WORKDIR /app/services/notification-service
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/services/notification-service/dist ./services/notification-service/dist
COPY --from=builder /app/services/notification-service/package.json ./services/notification-service/package.json
COPY --from=deps /app/node_modules ./node_modules
WORKDIR /app/services/notification-service
EXPOSE 3009
USER node
CMD ["node", "dist/main"]
