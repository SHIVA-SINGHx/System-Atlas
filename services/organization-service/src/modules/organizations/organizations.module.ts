import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsRepository } from './organizations.repository';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsRepository],
  exports: [OrganizationsRepository],
})
export class OrganizationsModule {}
