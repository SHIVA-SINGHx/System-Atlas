import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Notification, NotificationType } from '@prisma/client';

@Injectable()
export class NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async create(data: { userId: string; type: NotificationType; title: string; body: string; metadata?: any }): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        body: data.body,
        metadata: data.metadata,
      },
    });
  }
}
