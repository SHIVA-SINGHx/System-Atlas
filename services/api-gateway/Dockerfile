FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./
COPY packages/ ./packages/
COPY services/api-gateway/package.json ./services/api-gateway/
RUN pnpm install --filter @system-atlas/api-gateway...

FROM deps AS builder
COPY services/api-gateway/ ./services/api-gateway/
WORKDIR /app/services/api-gateway
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/services/api-gateway/dist ./services/api-gateway/dist
COPY --from=builder /app/services/api-gateway/package.json ./services/api-gateway/package.json
COPY --from=deps /app/node_modules ./node_modules
WORKDIR /app/services/api-gateway
EXPOSE 3001
USER node
CMD ["node", "dist/main"]
