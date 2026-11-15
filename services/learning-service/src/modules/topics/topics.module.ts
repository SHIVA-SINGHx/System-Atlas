import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsRepository } from './topics.repository';

@Module({
  controllers: [TopicsController],
  providers: [TopicsRepository],
  exports: [TopicsRepository],
})
export class TopicsModule {}
