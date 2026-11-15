import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { InterviewProblem } from '../../database/generated/client';

@Injectable()
export class ProblemsRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: { company?: string; tag?: string; search?: string }): Promise<InterviewProblem[]> {
    const where: any = {};
    if (filters?.company) {
      where.companies = { has: filters.company };
    }
    if (filters?.tag) {
      where.tags = { has: filters.tag };
    }
    if (filters?.search) {
      where.title = { contains: filters.search, mode: 'insensitive' };
    }
    return this.prisma.interviewProblem.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async findBySlug(slug: string): Promise<InterviewProblem | null> {
    return this.prisma.interviewProblem.findUnique({ where: { slug } });
  }
}
