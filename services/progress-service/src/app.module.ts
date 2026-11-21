import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { ProgressModule } from './modules/progress/progress.module';
import { PracticeModule } from './modules/practice/practice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    ProgressModule,
    PracticeModule,
  ],
})
export class AppModule {}
