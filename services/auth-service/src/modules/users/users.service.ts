import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getUserByClerkId(clerkId: string): Promise<User> {
    const user = await this.usersRepo.findByClerkId(clerkId);
    if (!user) throw new NotFoundException('User not found for given Clerk ID');
    return user;
  }

  async syncClerkUser(dto: { clerkId: string; email: string; firstName?: string | null; lastName?: string | null; avatarUrl?: string | null }): Promise<User> {
    return this.usersRepo.upsertFromClerk(dto);
  }
}
