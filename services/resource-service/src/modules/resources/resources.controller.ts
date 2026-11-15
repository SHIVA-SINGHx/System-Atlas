import { Controller, Get, Query } from '@nestjs/common';
import { ResourcesRepository } from './resources.repository';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';
import { ResourceCategory } from '@prisma/client';

@Controller('resources')
export class ResourcesController {
  constructor(private resourcesRepo: ResourcesRepository) {}

  @Get()
  async getResources(
    @Query('category') category: ResourceCategory,
    @Query('search') search: string,
    @CorrelationId() correlationId: string,
  ) {
    const items = await this.resourcesRepo.findAll(category, search);
    return { success: true, data: items, correlationId, timestamp: new Date().toISOString() };
  }
}
