import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsRepo: LessonsRepository) {}

  @Get(':slug')
  async getLesson(@Param('slug') slug: string, @CorrelationId() correlationId: string) {
    const lesson = await this.lessonsRepo.findBySlug(slug);
    if (!lesson) throw new NotFoundException('Lesson not found');
    return { success: true, data: lesson, correlationId, timestamp: new Date().toISOString() };
  }
}
