import { Controller, Get, Post, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { ProgressRepository } from './progress.repository';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';
import { ProgressStatus } from '@prisma/client';

@Controller('progress')
export class ProgressController {
  constructor(private progressRepo: ProgressRepository) {}

  @Get('my-summary')
  async getMySummary(@Headers('x-user-id') userId: string, @CorrelationId() correlationId: string) {
    if (!userId) throw new UnauthorizedException('User ID header missing');
    const items = await this.progressRepo.getUserProgress(userId);
    const stats = await this.progressRepo.getUserStats(userId);
    return { success: true, data: { items, stats }, correlationId, timestamp: new Date().toISOString() };
  }

  @Post('update')
  async updateProgress(
    @Headers('x-user-id') userId: string,
    @Body() body: { lessonId: string; status: ProgressStatus; timeSpentSeconds?: number },
    @CorrelationId() correlationId: string,
  ) {
    if (!userId) throw new UnauthorizedException('User ID header missing');
    const updated = await this.progressRepo.upsertProgress(
      userId,
      body.lessonId,
      body.status,
      body.timeSpentSeconds || 0,
    );
    return { success: true, data: updated, correlationId, timestamp: new Date().toISOString() };
  }

  @Post('bookmark')
  async toggleBookmark(
    @Headers('x-user-id') userId: string,
    @Body() body: { lessonId: string },
    @CorrelationId() correlationId: string,
  ) {
    if (!userId) throw new UnauthorizedException('User ID header missing');
    const result = await this.progressRepo.toggleBookmark(userId, body.lessonId);
    return { success: true, data: result, correlationId, timestamp: new Date().toISOString() };
  }
}
