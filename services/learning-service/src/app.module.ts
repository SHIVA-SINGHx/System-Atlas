import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { TopicsModule } from './modules/topics/topics.module';
import { LessonsModule } from './modules/lessons/lessons.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HealthModule,
    TopicsModule,
    LessonsModule,
  ],
})
export class AppModule {}
