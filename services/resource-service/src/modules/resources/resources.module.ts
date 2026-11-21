import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { AdminResourcesController } from './admin-resources.controller';
import { ResourcesRepository } from './resources.repository';

@Module({
  controllers: [ResourcesController, AdminResourcesController],
  providers: [ResourcesRepository],
  exports: [ResourcesRepository],
})
export class ResourcesModule {}
