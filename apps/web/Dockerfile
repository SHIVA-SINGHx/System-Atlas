FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./
COPY packages/ ./packages/
COPY apps/web/package.json ./apps/web/
RUN pnpm install --filter @system-atlas/web...

FROM deps AS builder
COPY apps/web/ ./apps/web/
WORKDIR /app/apps/web
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3000
USER node
CMD ["pnpm", "start"]
