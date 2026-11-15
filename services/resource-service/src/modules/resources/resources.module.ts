import { Module } from '@nestjs/common';
import { ResourcesController } from './resources.controller';
import { ResourcesRepository } from './resources.repository';

@Module({
  controllers: [ResourcesController],
  providers: [ResourcesRepository],
  exports: [ResourcesRepository],
})
export class ResourcesModule {}
