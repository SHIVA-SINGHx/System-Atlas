import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { createServiceLogger } from '@system-atlas/logger';
import { initOpenTelemetry, initSentry } from '@system-atlas/observability';

const logger = createServiceLogger({ serviceName: 'api-gateway' });

async function bootstrap() {
  initOpenTelemetry('api-gateway');
  initSentry('api-gateway');

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.use(helmet());
  app.enableCors({
    origin: (process.env['CORS_ORIGIN'] || 'http://localhost:3000').split(','),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Correlation-ID', 'X-Org-ID'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());

  if (process.env['NODE_ENV'] !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('System Atlas Gateway API')
      .setDescription('Public edge routing, auth enforcement and rate limiting')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  const port = process.env['PORT'] || 3001;
  await app.listen(port, '0.0.0.0');
  logger.info(`System Atlas API Gateway running on port ${port}`);
}

bootstrap();
