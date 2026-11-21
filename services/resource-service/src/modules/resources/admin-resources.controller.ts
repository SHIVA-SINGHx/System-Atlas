import { Controller, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ResourcesRepository } from './resources.repository';
import { Resource, CreateResourceDto } from '@system-atlas/contracts';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';
import { randomUUID } from 'crypto';

@Controller('admin/resources')
export class AdminResourcesController {
  constructor(private readonly resourcesRepo: ResourcesRepository) {}

  @Post()
  async createResource(
    @Body() body: CreateResourceDto,
    @CorrelationId() correlationId: string,
  ) {
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const resource: Resource = {
      ...body,
      id: randomUUID(),
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const saved = await this.resourcesRepo.create(resource);
    return { success: true, data: saved, correlationId, timestamp: new Date().toISOString() };
  }

  @Put(':id')
  async updateResource(
    @Param('id') id: string,
    @Body() body: Partial<Resource>,
    @CorrelationId() correlationId: string,
  ) {
    const updated = await this.resourcesRepo.update(id, body);
    return { success: true, data: updated, correlationId, timestamp: new Date().toISOString() };
  }

  @Delete(':id')
  async deleteResource(
    @Param('id') id: string,
    @CorrelationId() correlationId: string,
  ) {
    const deleted = await this.resourcesRepo.delete(id);
    if (!deleted) throw new NotFoundException('Resource not found');
    return { success: true, data: { deleted: true }, correlationId, timestamp: new Date().toISOString() };
  }
}
