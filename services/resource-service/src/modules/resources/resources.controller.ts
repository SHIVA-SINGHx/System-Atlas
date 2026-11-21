import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResourcesRepository } from './resources.repository';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('resources')
export class ResourcesController {
  constructor(private resourcesRepo: ResourcesRepository) {}

  @Get()
  async getResources(
    @Query('category') category: string,
    @Query('search') search: string,
    @Query('topic') topic: string,
    @CorrelationId() correlationId: string,
  ) {
    const items = await this.resourcesRepo.findAll(category, search, topic);
    return { success: true, data: items, correlationId, timestamp: new Date().toISOString() };
  }

  @Get(':slug')
  async getResourceBySlug(
    @Param('slug') slug: string,
    @CorrelationId() correlationId: string,
  ) {
    const item = await this.resourcesRepo.findBySlug(slug);
    return { success: true, data: item, correlationId, timestamp: new Date().toISOString() };
  }
}
