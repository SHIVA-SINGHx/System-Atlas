import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { SSRFGuardService } from './ssrf-guard.service';
import { ResourcesModule } from '../resources/resources.module';

@Module({
  imports: [ResourcesModule],
  controllers: [IngestionController],
  providers: [IngestionService, SSRFGuardService],
  exports: [IngestionService, SSRFGuardService],
})
export class IngestionModule {}
