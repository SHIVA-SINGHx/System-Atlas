import { Controller, Post, Headers, Body, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { Webhook } from 'svix';
import { UsersService } from '../users/users.service';
import { createServiceLogger } from '@system-atlas/logger';

const logger = createServiceLogger({ serviceName: 'clerk-webhooks' });

@Controller('clerk-webhook')
export class WebhooksController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleClerkWebhook(
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
    @Body() payload: any,
  ) {
    const secret = process.env['CLERK_WEBHOOK_SECRET'];
    if (secret) {
      const wh = new Webhook(secret);
      try {
        wh.verify(JSON.stringify(payload), {
          'svix-id': svixId,
          'svix-timestamp': svixTimestamp,
          'svix-signature': svixSignature,
        });
      } catch (err) {
        throw new BadRequestException('Invalid webhook signature');
      }
    }

    const { type, data } = payload;
    logger.info({ type, id: data?.id }, 'Clerk Webhook Received');

    if (type === 'user.created' || type === 'user.updated') {
      const email = data.email_addresses?.[0]?.email_address || '';
      await this.usersService.syncClerkUser({
        clerkId: data.id,
        email,
        firstName: data.first_name,
        lastName: data.last_name,
        avatarUrl: data.image_url,
      });
    }

    return { received: true };
  }
}
