import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Organization, OrgMembership, OrgRole } from '@prisma/client';

@Injectable()
export class OrganizationsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Organization | null> {
    return this.prisma.organization.findUnique({
      where: { id },
      include: { members: true },
    });
  }

  async findByUserId(userId: string): Promise<OrgMembership[]> {
    return this.prisma.orgMembership.findMany({
      where: { userId },
      include: { organization: true },
    });
  }

  async createOrganization(userId: string, data: { name: string; slug: string; clerkOrgId: string }): Promise<Organization> {
    return this.prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: {
          name: data.name,
          slug: data.slug,
          clerkOrgId: data.clerkOrgId,
        },
      });

      await tx.orgMembership.create({
        data: {
          organizationId: org.id,
          userId,
          role: OrgRole.OWNER,
        },
      });

      return org;
    });
  }
}
