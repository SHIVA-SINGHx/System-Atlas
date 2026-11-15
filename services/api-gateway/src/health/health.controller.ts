import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, MemoryHealthIndicator } from '@nestjs/terminus';
import axios from 'axios';
import { GatewayProxyService } from '../modules/gateway/gateway-proxy.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private proxyService: GatewayProxyService,
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
        const url = this.proxyService.getTargetUrl(svc);
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
