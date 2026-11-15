import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { createServiceLogger } from '@system-atlas/logger';

const logger = createServiceLogger({ serviceName: 'exception-filter' });

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const correlationId = (request.headers['x-correlation-id'] as string) || 'unknown';

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    let message = 'Internal server error';
    let details: Record<string, unknown> | undefined = undefined;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resObj = exceptionResponse as Record<string, unknown>;
      message = (resObj['message'] as string) || message;
      details = resObj;
    }

    if (status >= 500) {
      logger.error({
        err: exception instanceof Error ? exception.message : 'Unknown exception',
        stack: exception instanceof Error ? exception.stack : undefined,
        path: request.url,
        method: request.method,
        correlationId,
      }, 'Unhandled Service Exception');
    }

    response.status(status).json({
      success: false,
      error: {
        code: status === 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
        message,
        details,
      },
      correlationId,
      timestamp: new Date().toISOString(),
    });
  }
}
