import { Module } from '@nestjs/common';
import { WardsService } from './wards.service';
import { WardsController } from './wards.controller';

@Module({
  providers: [WardsService],
  controllers: [WardsController]
})
export class WardsModule {}
