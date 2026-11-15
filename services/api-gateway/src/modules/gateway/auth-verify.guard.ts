import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthVerifyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers['authorization'];

    // Public paths do not require authentication
    const publicPrefixes = ['/health', '/docs', '/api/v1/auth/clerk-webhook', '/api/v1/learning/topics'];
    if (publicPrefixes.some((path) => req.url.startsWith(path))) {
      return true;
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization Bearer token required');
    }

    // Auth verification attaches user id / session claims downstream
    return true;
  }
}
