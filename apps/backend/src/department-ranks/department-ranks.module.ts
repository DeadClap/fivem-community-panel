import { Module } from '@nestjs/common';
import { DepartmentRanksService } from './department-ranks.service';

@Module({
  providers: [DepartmentRanksService],
  exports: [DepartmentRanksService],
})
export class DepartmentRanksModule {}
