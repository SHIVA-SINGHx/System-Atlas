import { Injectable, BadRequestException } from '@nestjs/common';
import Redis from 'ioredis';
import { createServiceLogger } from '@system-atlas/logger';

const logger = createServiceLogger({ serviceName: 'playground-simulation' });

export interface SimulationPayload {
  projectId: string;
  trafficRps: number;
  durationSeconds: number;
  failoverScenario: string;
}

@Injectable()
export class SimulationService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env['REDIS_HOST'] || 'localhost',
      port: Number(process.env['REDIS_PORT']) || 6379,
      password: process.env['REDIS_PASSWORD'] || undefined,
      keyPrefix: 'sim:',
    });
  }

  /**
   * Resource Consumption Protection:
   * Throttles intensive simulation runs per user and validates maximum compute constraints.
   */
  async executeSimulation(userId: string, payload: SimulationPayload) {
    // 1. Guard check: Upper bounds on simulated traffic
    if (payload.trafficRps > 1000000) {
      throw new BadRequestException('Simulation exceeds max allowed RPS bound (1,000,000)');
    }
    if (payload.durationSeconds > 300) {
      throw new BadRequestException('Simulation duration exceeds max bound (300 seconds)');
    }

    // 2. Concurrency limit: Maximum 2 concurrent simulations per user
    const userSimKey = `active:${userId}`;
    const activeRuns = await this.redis.incr(userSimKey);
    if (activeRuns === 1) {
      await this.redis.expire(userSimKey, 60);
    }
    if (activeRuns > 2) {
      await this.redis.decr(userSimKey);
      throw new BadRequestException('Concurrency limit reached. Maximum 2 simultaneous simulations per user.');
    }

    logger.info({ userId, projectId: payload.projectId, rps: payload.trafficRps }, 'Executing architecture simulation');

    // Simulate architecture calculation latency & metrics
    const simulatedP99Latency = Math.min(250, Math.max(12, Math.round(payload.trafficRps / 5000) + 10));
    const errorRatePercent = payload.failoverScenario === 'DATABASE_PRIMARY_DOWN' ? 14.5 : 0.02;

    await this.redis.decr(userSimKey);

    return {
      simulationId: 'sim_' + Math.random().toString(36).substring(2, 10),
      projectId: payload.projectId,
      computedMetrics: {
        totalRequestsSimulated: payload.trafficRps * payload.durationSeconds,
        p99LatencyMs: simulatedP99Latency,
        p50LatencyMs: Math.round(simulatedP99Latency * 0.4),
        errorRatePercent,
        capacityStatus: errorRatePercent > 5 ? 'CAPACITY_EXCEEDED' : 'STABLE',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
