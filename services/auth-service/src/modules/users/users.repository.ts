import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByClerkId(clerkId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { clerkId } });
  }

  async upsertFromClerk(data: { clerkId: string; email: string; firstName?: string | null; lastName?: string | null; avatarUrl?: string | null }): Promise<User> {
    return this.prisma.user.upsert({
      where: { clerkId: data.clerkId },
      update: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        avatarUrl: data.avatarUrl,
      },
      create: {
        clerkId: data.clerkId,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        avatarUrl: data.avatarUrl,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
