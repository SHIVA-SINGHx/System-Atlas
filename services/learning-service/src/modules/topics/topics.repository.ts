import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Topic } from '../../database/generated/client';

@Injectable()
export class TopicsRepository {
  constructor(private prisma: PrismaService) {}

  async findAllPublished(): Promise<Topic[]> {
    return this.prisma.topic.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
      include: {
        lessons: {
          select: { id: true, slug: true, title: true, difficulty: true, estimatedMinutes: true, order: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<Topic | null> {
    return this.prisma.topic.findUnique({
      where: { slug },
      include: {
        lessons: {
          where: { isPublished: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }
}
