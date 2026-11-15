import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ProblemsRepository } from './problems.repository';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('problems')
export class ProblemsController {
  constructor(private problemsRepo: ProblemsRepository) {}

  @Get()
  async getProblems(
    @Query('company') company: string,
    @Query('tag') tag: string,
    @Query('search') search: string,
    @CorrelationId() correlationId: string,
  ) {
    const problems = await this.problemsRepo.findAll({ company, tag, search });
    return { success: true, data: problems, correlationId, timestamp: new Date().toISOString() };
  }

  @Get(':slug')
  async getProblemBySlug(@Param('slug') slug: string, @CorrelationId() correlationId: string) {
    const problem = await this.problemsRepo.findBySlug(slug);
    if (!problem) throw new NotFoundException('Interview problem not found');
    return { success: true, data: problem, correlationId, timestamp: new Date().toISOString() };
  }
}
