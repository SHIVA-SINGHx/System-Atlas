FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./
COPY packages/ ./packages/
COPY services/organization-service/package.json ./services/organization-service/
RUN pnpm install --filter @system-atlas/organization-service...

FROM deps AS builder
COPY services/organization-service/ ./services/organization-service/
WORKDIR /app/services/organization-service
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/services/organization-service/dist ./services/organization-service/dist
COPY --from=builder /app/services/organization-service/package.json ./services/organization-service/package.json
COPY --from=deps /app/node_modules ./node_modules
WORKDIR /app/services/organization-service
EXPOSE 3008
USER node
CMD ["node", "dist/main"]
