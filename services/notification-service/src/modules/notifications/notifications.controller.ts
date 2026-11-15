import { Controller, Get, Patch, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private notifRepo: NotificationsRepository) {}

  @Get()
  async getNotifications(@Headers('x-user-id') userId: string, @CorrelationId() correlationId: string) {
    if (!userId) throw new UnauthorizedException('User ID header required');
    const list = await this.notifRepo.findByUserId(userId);
    return { success: true, data: list, correlationId, timestamp: new Date().toISOString() };
  }

  @Patch(':id/read')
  async markRead(
    @Param('id') id: string,
    @Headers('x-user-id') userId: string,
    @CorrelationId() correlationId: string,
  ) {
    if (!userId) throw new UnauthorizedException('User ID header required');
    const updated = await this.notifRepo.markAsRead(id, userId);
    return { success: true, data: updated, correlationId, timestamp: new Date().toISOString() };
  }
}
