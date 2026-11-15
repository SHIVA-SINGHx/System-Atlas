import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck, MemoryHealthIndicator } from '@nestjs/terminus';

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
    return { status: 'ready', service: 'learning-service', timestamp: new Date().toISOString() };
  }

  @Get('live')
  live() {
    return { status: 'live', service: 'learning-service', timestamp: new Date().toISOString() };
  }
}
