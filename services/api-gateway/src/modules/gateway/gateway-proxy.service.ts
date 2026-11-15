import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayProxyService {
  private serviceMap: Record<string, string> = {
    auth: process.env['AUTH_SERVICE_URL'] || 'http://localhost:3002',
    learning: process.env['LEARNING_SERVICE_URL'] || 'http://localhost:3003',
    progress: process.env['PROGRESS_SERVICE_URL'] || 'http://localhost:3004',
    playground: process.env['PLAYGROUND_SERVICE_URL'] || 'http://localhost:3005',
    interview: process.env['INTERVIEW_SERVICE_URL'] || 'http://localhost:3006',
    resource: process.env['RESOURCE_SERVICE_URL'] || 'http://localhost:3007',
    organization: process.env['ORGANIZATION_SERVICE_URL'] || 'http://localhost:3008',
    notification: process.env['NOTIFICATION_SERVICE_URL'] || 'http://localhost:3009',
  };

  getTargetUrl(serviceKey: string): string | null {
    return this.serviceMap[serviceKey] || null;
  }
}
