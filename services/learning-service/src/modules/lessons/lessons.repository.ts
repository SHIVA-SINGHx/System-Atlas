import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Lesson } from '@prisma/client';

@Injectable()
export class LessonsRepository {
  constructor(private prisma: PrismaService) {}

  async findBySlug(slug: string): Promise<Lesson | null> {
    return this.prisma.lesson.findUnique({
      where: { slug },
      include: { topic: { select: { slug: true, title: true } } },
    });
  }

  async findById(id: string): Promise<Lesson | null> {
    return this.prisma.lesson.findUnique({ where: { id } });
  }
}
