import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ServiceAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const secret = request.headers['x-service-secret'];
    const expected = process.env['INTERNAL_SERVICE_SECRET'];

    if (!expected || secret !== expected) {
      throw new UnauthorizedException('Invalid or missing internal service secret');
    }
    return true;
  }
}
