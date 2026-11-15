FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./
COPY packages/ ./packages/
COPY services/resource-service/package.json ./services/resource-service/
RUN pnpm install --filter @system-atlas/resource-service...

FROM deps AS builder
COPY services/resource-service/ ./services/resource-service/
WORKDIR /app/services/resource-service
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/services/resource-service/dist ./services/resource-service/dist
COPY --from=builder /app/services/resource-service/package.json ./services/resource-service/package.json
COPY --from=deps /app/node_modules ./node_modules
WORKDIR /app/services/resource-service
EXPOSE 3007
USER node
CMD ["node", "dist/main"]
