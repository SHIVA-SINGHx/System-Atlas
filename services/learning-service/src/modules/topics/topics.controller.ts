import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { TopicsRepository } from './topics.repository';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('topics')
export class TopicsController {
  constructor(private topicsRepo: TopicsRepository) {}

  @Get()
  async getTopics(@CorrelationId() correlationId: string) {
    const topics = await this.topicsRepo.findAllPublished();
    return { success: true, data: topics, correlationId, timestamp: new Date().toISOString() };
  }

  @Get(':slug')
  async getTopic(@Param('slug') slug: string, @CorrelationId() correlationId: string) {
    const topic = await this.topicsRepo.findBySlug(slug);
    if (!topic) throw new NotFoundException('Topic not found');
    return { success: true, data: topic, correlationId, timestamp: new Date().toISOString() };
  }
}
