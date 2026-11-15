import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CorrelationId = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest<Request>();
  return (req.headers['x-correlation-id'] as string) || 'generated-' + Math.random().toString(36).substring(2, 9);
});
