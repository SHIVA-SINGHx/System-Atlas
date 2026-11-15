import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { createServiceLogger } from '@system-atlas/logger';
import { initOpenTelemetry, initSentry } from '@system-atlas/observability';

const logger = createServiceLogger({ serviceName: 'auth-service' });

async function bootstrap() {
  initOpenTelemetry('auth-service');
  initSentry('auth-service');

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.use(helmet());
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env['PORT'] || 3002;
  await app.listen(port, '0.0.0.0');
  logger.info(`Auth Service running on port ${port}`);
}

bootstrap();
