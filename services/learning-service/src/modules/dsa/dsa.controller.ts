import { Controller, Get, Param, Query } from '@nestjs/common';
import { DSAService } from './dsa.service';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('dsa')
export class DSAController {
  constructor(private readonly dsaService: DSAService) {}

  @Get('topics')
  getTopics(@CorrelationId() correlationId: string) {
    const data = this.dsaService.getAllTopics();
    return { success: true, data, correlationId, timestamp: new Date().toISOString() };
  }

  @Get('topics/:slug')
  getTopic(@Param('slug') slug: string, @CorrelationId() correlationId: string) {
    const data = this.dsaService.getTopicBySlug(slug);
    return { success: true, data, correlationId, timestamp: new Date().toISOString() };
  }

  @Get('practice/problems')
  getProblems(
    @Query('topicSlug') topicSlug: string,
    @Query('difficulty') difficulty: string,
    @CorrelationId() correlationId: string,
  ) {
    const data = this.dsaService.getPracticeProblems({ topicSlug, difficulty });
    return { success: true, data, correlationId, timestamp: new Date().toISOString() };
  }

  @Get('practice/problems/:slug')
  getProblem(@Param('slug') slug: string, @CorrelationId() correlationId: string) {
    const data = this.dsaService.getPracticeProblemBySlug(slug);
    return { success: true, data, correlationId, timestamp: new Date().toISOString() };
  }
}
