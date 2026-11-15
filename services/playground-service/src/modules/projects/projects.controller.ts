import { Controller, Get, Post, Put, Param, Body, Headers, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsRepo: ProjectsRepository) {}

  @Get()
  async getMyProjects(@Headers('x-user-id') userId: string, @CorrelationId() correlationId: string) {
    if (!userId) throw new UnauthorizedException('User ID header required');
    const projects = await this.projectsRepo.findByUserId(userId);
    return { success: true, data: projects, correlationId, timestamp: new Date().toISOString() };
  }

  @Get(':id')
  async getProject(@Param('id') id: string, @CorrelationId() correlationId: string) {
    const project = await this.projectsRepo.findById(id);
    if (!project) throw new NotFoundException('Project not found');
    return { success: true, data: project, correlationId, timestamp: new Date().toISOString() };
  }

  @Post()
  async createProject(
    @Headers('x-user-id') userId: string,
    @Headers('x-org-id') orgId: string,
    @Body() body: any,
    @CorrelationId() correlationId: string,
  ) {
    if (!userId) throw new UnauthorizedException('User ID header required');
    const created = await this.projectsRepo.create({
      userId,
      organizationId: orgId || null,
      title: body.title,
      description: body.description,
      nodes: body.nodes || [],
      edges: body.edges || [],
      viewport: body.viewport || {},
    });
    return { success: true, data: created, correlationId, timestamp: new Date().toISOString() };
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() body: any,
    @CorrelationId() correlationId: string,
  ) {
    const updated = await this.projectsRepo.update(id, body);
    return { success: true, data: updated, correlationId, timestamp: new Date().toISOString() };
  }
}
