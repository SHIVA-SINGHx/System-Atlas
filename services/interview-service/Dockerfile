FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

FROM base AS deps
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./
COPY packages/ ./packages/
COPY services/interview-service/package.json ./services/interview-service/
RUN pnpm install --filter @system-atlas/interview-service...

FROM deps AS builder
COPY services/interview-service/ ./services/interview-service/
WORKDIR /app/services/interview-service
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/services/interview-service/dist ./services/interview-service/dist
COPY --from=builder /app/services/interview-service/package.json ./services/interview-service/package.json
COPY --from=deps /app/node_modules ./node_modules
WORKDIR /app/services/interview-service
EXPOSE 3006
USER node
CMD ["node", "dist/main"]
