import { Controller, Get, Post, Param, Body, Headers, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { OrganizationsRepository } from './organizations.repository';
import { CorrelationId } from '../../common/decorators/correlation-id.decorator';

@Controller('orgs')
export class OrganizationsController {
  constructor(private orgsRepo: OrganizationsRepository) {}

  @Get('my-organizations')
  async getMyOrgs(@Headers('x-user-id') userId: string, @CorrelationId() correlationId: string) {
    if (!userId) throw new UnauthorizedException('User ID header required');
    const memberships = await this.orgsRepo.findByUserId(userId);
    return { success: true, data: memberships, correlationId, timestamp: new Date().toISOString() };
  }

  @Get(':id')
  async getOrg(@Param('id') id: string, @CorrelationId() correlationId: string) {
    const org = await this.orgsRepo.findById(id);
    if (!org) throw new NotFoundException('Organization not found');
    return { success: true, data: org, correlationId, timestamp: new Date().toISOString() };
  }

  @Post()
  async createOrg(
    @Headers('x-user-id') userId: string,
    @Body() body: { name: string; slug: string; clerkOrgId: string },
    @CorrelationId() correlationId: string,
  ) {
    if (!userId) throw new UnauthorizedException('User ID header required');
    const org = await this.orgsRepo.createOrganization(userId, body);
    return { success: true, data: org, correlationId, timestamp: new Date().toISOString() };
  }
}
