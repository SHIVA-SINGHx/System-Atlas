import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Resource, ResourceCategory } from '../../database/generated/client';

@Injectable()
export class ResourcesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: ResourceCategory, search?: string): Promise<Resource[]> {
    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    return this.prisma.resource.findMany({ where, orderBy: { createdAt: 'desc' } });
  }
}
