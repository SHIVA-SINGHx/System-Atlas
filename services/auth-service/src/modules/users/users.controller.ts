import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ServiceAuthGuard } from '../../common/guards/service-auth.guard';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string, @CorrelationId() correlationId: string) {
    const user = await this.usersService.getUserById(id);
    return { success: true, data: user, correlationId, timestamp: new Date().toISOString() };
  }

  @Get('by-clerk/:clerkId')
  @UseGuards(ServiceAuthGuard)
  async getByClerk(@Param('clerkId') clerkId: string, @CorrelationId() correlationId: string) {
    const user = await this.usersService.getUserByClerkId(clerkId);
    return { success: true, data: user, correlationId, timestamp: new Date().toISOString() };
  }
}
