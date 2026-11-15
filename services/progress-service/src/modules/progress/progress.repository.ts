import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { LessonProgress, Bookmark, LearningStats, ProgressStatus } from '../../database/generated/client';

@Injectable()
export class ProgressRepository {
  constructor(private prisma: PrismaService) {}

  async getUserProgress(userId: string): Promise<LessonProgress[]> {
    return this.prisma.lessonProgress.findMany({ where: { userId } });
  }

  async upsertProgress(userId: string, lessonId: string, status: ProgressStatus, timeSpentSeconds: number): Promise<LessonProgress> {
    const isCompleted = status === ProgressStatus.COMPLETED;
    return this.prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {
        status,
        completedAt: isCompleted ? new Date() : undefined,
        timeSpentSeconds: { increment: timeSpentSeconds },
        lastAccessedAt: new Date(),
      },
      create: {
        userId,
        lessonId,
        status,
        completedAt: isCompleted ? new Date() : null,
        timeSpentSeconds,
        lastAccessedAt: new Date(),
      },
    });
  }

  async toggleBookmark(userId: string, lessonId: string): Promise<{ bookmarked: boolean }> {
    const existing = await this.prisma.bookmark.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });
    if (existing) {
      await this.prisma.bookmark.delete({ where: { id: existing.id } });
      return { bookmarked: false };
    }
    await this.prisma.bookmark.create({ data: { userId, lessonId } });
    return { bookmarked: true };
  }

  async getUserStats(userId: string): Promise<LearningStats | null> {
    return this.prisma.learningStats.findUnique({ where: { userId } });
  }
}
