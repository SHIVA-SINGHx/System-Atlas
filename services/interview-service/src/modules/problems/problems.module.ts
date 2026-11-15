import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemsRepository } from './problems.repository';

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsRepository],
  exports: [ProblemsRepository],
})
export class ProblemsModule {}
