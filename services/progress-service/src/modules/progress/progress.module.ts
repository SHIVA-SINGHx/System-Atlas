import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressRepository } from './progress.repository';

@Module({
  controllers: [ProgressController],
  providers: [ProgressRepository],
  exports: [ProgressRepository],
})
export class ProgressModule {}
