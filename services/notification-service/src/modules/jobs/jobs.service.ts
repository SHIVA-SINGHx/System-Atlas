import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import { NotificationsRepository } from '../notifications/notifications.repository';
import { createServiceLogger } from '@system-atlas/logger';

const logger = createServiceLogger({ serviceName: 'notification-worker' });

@Injectable()
export class JobsService implements OnModuleInit, OnModuleDestroy {
  private queue!: Queue;
  private worker!: Worker;

  constructor(private notifRepo: NotificationsRepository) {}

  onModuleInit() {
    const redisConn = {
      host: process.env['REDIS_HOST'] || 'localhost',
      port: Number(process.env['REDIS_PORT']) || 6379,
      password: process.env['REDIS_PASSWORD'] || undefined,
    };

    this.queue = new Queue('notification-dispatch', { connection: redisConn });

    this.worker = new Worker(
      'notification-dispatch',
      async (job) => {
        logger.info({ jobId: job.id, name: job.name }, 'Processing background notification job');
        const { userId, type, title, body, metadata } = job.data;
        await this.notifRepo.create({ userId, type, title, body, metadata });
      },
      { connection: redisConn },
    );
  }

  async onModuleDestroy() {
    await this.worker?.close();
    await this.queue?.close();
  }

  async dispatchNotification(payload: any) {
    return this.queue.add('send-notification', payload);
  }
}
