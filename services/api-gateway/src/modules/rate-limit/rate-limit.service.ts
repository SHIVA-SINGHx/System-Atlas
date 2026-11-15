import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { createServiceLogger } from '@system-atlas/logger';

const logger = createServiceLogger({ serviceName: 'rate-limit-service' });

@Injectable()
export class RateLimitService implements OnModuleInit, OnModuleDestroy {
  private redisClient!: Redis;

  onModuleInit() {
    this.redisClient = new Redis({
      host: process.env['REDIS_HOST'] || 'localhost',
      port: Number(process.env['REDIS_PORT']) || 6379,
      password: process.env['REDIS_PASSWORD'] || undefined,
      keyPrefix: 'ratelimit:',
    });
    logger.info('Rate limiting Redis client connected');
  }

  onModuleDestroy() {
    this.redisClient.disconnect();
  }

  /**
   * Sliding window log rate limiter using Redis sorted sets
   */
  async checkRateLimit(key: string, limit: number, windowSeconds: number): Promise<{ allowed: boolean; remaining: number; retryAfter: number }> {
    try {
      const now = Date.now();
      const clearBefore = now - windowSeconds * 1000;
      const pipeline = this.redisClient.pipeline();

      pipeline.zremrangebyscore(key, 0, clearBefore);
      pipeline.zcard(key);
      pipeline.zadd(key, now, `${now}-${Math.random()}`);
      pipeline.expire(key, windowSeconds);

      const results = await pipeline.exec();
      const currentCount = (results?.[1]?.[1] as number) || 0;

      if (currentCount >= limit) {
        return {
          allowed: false,
          remaining: 0,
          retryAfter: windowSeconds,
        };
      }

      return {
        allowed: true,
        remaining: limit - currentCount - 1,
        retryAfter: 0,
      };
    } catch (err) {
      logger.error({ err }, 'Redis rate limit check failed, failing open for resilience');
      return { allowed: true, remaining: 1, retryAfter: 0 };
    }
  }
}
