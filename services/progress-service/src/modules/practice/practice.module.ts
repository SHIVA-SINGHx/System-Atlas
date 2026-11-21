import { Module } from '@nestjs/common';
import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';
import { PracticeRepository } from './practice.repository';
import { CodeSandboxService } from './code-sandbox.service';

@Module({
  controllers: [PracticeController],
  providers: [PracticeService, PracticeRepository, CodeSandboxService],
  exports: [PracticeService, CodeSandboxService],
})
export class PracticeModule {}
