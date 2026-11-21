import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { IngestionModule } from './modules/ingestion/ingestion.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    ResourcesModule,
    IngestionModule,
  ],
})
export class AppModule {}
