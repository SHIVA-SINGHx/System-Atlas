import { Controller, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { SimulationService, SimulationPayload } from './simulation.service';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('simulation')
export class SimulationController {
  constructor(private simService: SimulationService) {}

  @Post('run')
  async runSimulation(
    @Headers('x-user-id') userId: string,
    @Body() body: SimulationPayload,
    @CorrelationId() correlationId: string,
  ) {
    if (!userId) throw new UnauthorizedException('User ID header required');
    const result = await this.simService.executeSimulation(userId, body);
    return { success: true, data: result, correlationId, timestamp: new Date().toISOString() };
  }
}
