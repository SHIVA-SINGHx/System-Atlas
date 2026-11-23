import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, MemoryHealthIndicator } from '@nestjs/terminus';
import axios from 'axios';

const SERVICE_URLS: Record<string, string> = {
  auth: process.env['AUTH_SERVICE_URL'] || 'http://localhost:3002',
  learning: process.env['LEARNING_SERVICE_URL'] || 'http://localhost:3003',
  progress: process.env['PROGRESS_SERVICE_URL'] || 'http://localhost:3004',
  playground: process.env['PLAYGROUND_SERVICE_URL'] || 'http://localhost:3005',
  interview: process.env['INTERVIEW_SERVICE_URL'] || 'http://localhost:3006',
  resource: process.env['RESOURCE_SERVICE_URL'] || 'http://localhost:3007',
  organization: process.env['ORGANIZATION_SERVICE_URL'] || 'http://localhost:3008',
  notification: process.env['NOTIFICATION_SERVICE_URL'] || 'http://localhost:3009',
};

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 250 * 1024 * 1024),
    ]);
  }

  @Get('ready')
  ready() {
    return { status: 'ready', service: 'api-gateway', timestamp: new Date().toISOString() };
  }

  @Get('live')
  live() {
    return { status: 'live', service: 'api-gateway', timestamp: new Date().toISOString() };
  }

  @Get('services')
  async aggregateServicesHealth() {
    const services = ['auth', 'learning', 'progress', 'playground', 'interview', 'resource', 'organization', 'notification'];
    const results: Record<string, any> = {};

    await Promise.all(
      services.map(async (svc) => {
        const url = SERVICE_URLS[svc];
        if (!url) {
          results[svc] = { status: 'unconfigured' };
          return;
        }
        try {
          const resp = await axios.get(`${url}/health/ready`, { timeout: 2000 });
          results[svc] = { status: resp.data.status || 'up', url };
        } catch (err: any) {
          results[svc] = { status: 'down', error: err.message };
        }
      })
    );

    const isAllHealthy = Object.values(results).every((r) => r.status === 'ready' || r.status === 'up');
    return {
      success: true,
      meshStatus: isAllHealthy ? 'HEALTHY' : 'DEGRADED',
      services: results,
      timestamp: new Date().toISOString(),
    };
  }
}
