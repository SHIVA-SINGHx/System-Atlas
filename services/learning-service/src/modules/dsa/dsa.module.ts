import { Module } from '@nestjs/common';
import { DSAController } from './dsa.controller';
import { DSAService } from './dsa.service';

@Module({
  controllers: [DSAController],
  providers: [DSAService],
  exports: [DSAService],
})
export class DSAModule {}
