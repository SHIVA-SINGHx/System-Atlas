import { Controller, Post, Get, Body, Param, Headers } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { ResourcesRepository } from '../resources/resources.repository';
import { CreateIngestionJobDto, ReviewIngestionJobDto, Resource } from '@system-atlas/contracts';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('ingestion')
export class IngestionController {
  constructor(
    private readonly ingestionService: IngestionService,
    private readonly resourcesRepo: ResourcesRepository,
  ) {}

  @Post('jobs')
  async createJob(
    @Body() body: CreateIngestionJobDto,
    @Headers('x-user-email') userEmail: string,
    @CorrelationId() correlationId: string,
  ) {
    const submitter = userEmail || 'admin@system-atlas.io';
    const job = await this.ingestionService.createJob(body, submitter);
    return { success: true, data: job, correlationId, timestamp: new Date().toISOString() };
  }

  @Get('jobs')
  listJobs(@CorrelationId() correlationId: string) {
    const jobs = this.ingestionService.listJobs();
    return { success: true, data: jobs, correlationId, timestamp: new Date().toISOString() };
  }

  @Get('jobs/:id')
  getJob(@Param('id') id: string, @CorrelationId() correlationId: string) {
    const job = this.ingestionService.getJob(id);
    return { success: true, data: job, correlationId, timestamp: new Date().toISOString() };
  }

  @Post('jobs/:id/review')
  async reviewJob(
    @Param('id') id: string,
    @Body() body: ReviewIngestionJobDto,
    @Headers('x-user-email') reviewerEmail: string,
    @CorrelationId() correlationId: string,
  ) {
    const reviewer = reviewerEmail || 'editor@system-atlas.io';
    const { job, publishedResource } = this.ingestionService.reviewJob(id, body, reviewer);

    if (publishedResource && body.action === 'APPROVE') {
      await this.resourcesRepo.create(publishedResource as Resource);
    }

    return {
      success: true,
      data: { job, publishedResource },
      correlationId,
      timestamp: new Date().toISOString(),
    };
  }
}
