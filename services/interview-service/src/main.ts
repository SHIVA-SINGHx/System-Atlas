import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { createServiceLogger } from '@system-atlas/logger';

const logger = createServiceLogger({ serviceName: 'interview-service' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.use(helmet());
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env['PORT'] || 3006;
  await app.listen(port, '0.0.0.0');
  logger.info(`Interview Service running on port ${port}`);
}

bootstrap();
