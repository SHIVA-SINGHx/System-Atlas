import { Controller, Post, Get, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { CodeExecutionRequest } from '@system-atlas/contracts';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post('run')
  async runCode(
    @Body() body: CodeExecutionRequest,
    @CorrelationId() correlationId: string,
  ) {
    const result = await this.practiceService.runCode(body);
    return { success: true, data: result, correlationId, timestamp: new Date().toISOString() };
  }

  @Post('submit')
  async submitSolution(
    @Headers('x-user-id') userId: string,
    @Body() body: CodeExecutionRequest,
    @CorrelationId() correlationId: string,
  ) {
    const effectiveUserId = userId || '00000000-0000-0000-0000-000000000001';
    const data = await this.practiceService.submitSolution(effectiveUserId, body);
    return { success: true, data, correlationId, timestamp: new Date().toISOString() };
  }

  @Get('submissions/:slug')
  async getSubmissions(
    @Headers('x-user-id') userId: string,
    @Param('slug') slug: string,
    @CorrelationId() correlationId: string,
  ) {
    const effectiveUserId = userId || '00000000-0000-0000-0000-000000000001';
    const data = this.practiceService.getSubmissions(effectiveUserId, slug);
    return { success: true, data, correlationId, timestamp: new Date().toISOString() };
  }

  @Get('stats')
  async getPracticeStats(
    @Headers('x-user-id') userId: string,
    @CorrelationId() correlationId: string,
  ) {
    const effectiveUserId = userId || '00000000-0000-0000-0000-000000000001';
    const data = this.practiceService.getUserStats(effectiveUserId);
    return { success: true, data, correlationId, timestamp: new Date().toISOString() };
  }
}
