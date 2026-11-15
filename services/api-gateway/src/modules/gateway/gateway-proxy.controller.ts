import { Controller, All, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';
import { GatewayProxyService } from './gateway-proxy.service';
import { RateLimitService } from '../rate-limit/rate-limit.service';

@Controller('api/v1')
export class GatewayProxyController {
  constructor(
    private proxyService: GatewayProxyService,
    private rateLimit: RateLimitService,
  ) {}

  @All(':service/*')
  async handleProxy(@Req() req: Request, @Res() res: Response) {
    const param = req.params['service'];
    const serviceKey = (Array.isArray(param) ? param[0] : param) ?? '';
    const targetBase = this.proxyService.getTargetUrl(serviceKey);

    if (!targetBase) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: { code: 'SERVICE_NOT_FOUND', message: `Unknown service: ${serviceKey}` },
      });
    }

    // Rate Limiting Check
    const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const rateLimitResult = await this.rateLimit.checkRateLimit(`ip:${clientIp}`, 120, 60);

    if (!rateLimitResult.allowed) {
      res.setHeader('Retry-After', rateLimitResult.retryAfter);
      return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please retry after ' + rateLimitResult.retryAfter + 's',
        },
      });
    }

    // Forward path
    const targetPath = req.url.replace(`/api/v1/${serviceKey}`, '');
    const forwardUrl = `${targetBase}${targetPath}`;

    try {
      const response = await axios({
        method: req.method,
        url: forwardUrl,
        data: req.body,
        headers: {
          ...req.headers,
          host: undefined,
          'x-service-secret': process.env['INTERNAL_SERVICE_SECRET'],
        },
        validateStatus: () => true,
      });

      return res.status(response.status).json(response.data);
    } catch (error: any) {
      return res.status(HttpStatus.BAD_GATEWAY).json({
        success: false,
        error: {
          code: 'UPSTREAM_ERROR',
          message: `Failed to reach upstream service: ${serviceKey}`,
          details: error.message,
        },
      });
    }
  }
}
