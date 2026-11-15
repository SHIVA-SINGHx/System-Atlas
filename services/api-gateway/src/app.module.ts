import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';
import { RateLimitModule } from './modules/rate-limit/rate-limit.module';
import { GatewayProxyController } from './modules/gateway/gateway-proxy.controller';
import { GatewayProxyService } from './modules/gateway/gateway-proxy.service';
import { AuthVerifyGuard } from './modules/gateway/auth-verify.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    RateLimitModule,
  ],
  controllers: [GatewayProxyController],
  providers: [GatewayProxyService, AuthVerifyGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
