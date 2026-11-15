import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsRepository } from './lessons.repository';

@Module({
  controllers: [LessonsController],
  providers: [LessonsRepository],
  exports: [LessonsRepository],
})
export class LessonsModule {}
