import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ArchitectureProject } from '@prisma/client';

@Injectable()
export class ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<ArchitectureProject[]> {
    return this.prisma.architectureProject.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findById(id: string): Promise<ArchitectureProject | null> {
    return this.prisma.architectureProject.findUnique({ where: { id } });
  }

  async create(data: {
    userId: string;
    organizationId?: string | null;
    title: string;
    description?: string;
    nodes: any;
    edges: any;
    viewport: any;
  }): Promise<ArchitectureProject> {
    return this.prisma.architectureProject.create({
      data: {
        userId: data.userId,
        organizationId: data.organizationId,
        title: data.title,
        description: data.description,
        nodes: data.nodes,
        edges: data.edges,
        viewport: data.viewport,
      },
    });
  }

  async update(id: string, data: Partial<{ title: string; description?: string; nodes: any; edges: any; viewport: any; isPublic: boolean }>): Promise<ArchitectureProject> {
    return this.prisma.architectureProject.update({
      where: { id },
      data,
    });
  }
}
