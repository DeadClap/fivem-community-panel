import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RankBand } from '@prisma/client';

@Injectable()
export class DepartmentRanksService {
  constructor(private readonly prisma: PrismaService) {}

  findByDepartment(departmentId: string) {
    return this.prisma.departmentRank.findMany({
      where: { departmentId },
      orderBy: { level: 'asc' },
    });
  }

  // For later: create/update ranks, etc.
  create(
    departmentId: string,
    data: { name: string; shortCode?: string; level: number; band: RankBand },
  ) {
    return this.prisma.departmentRank.create({
      data: {
        departmentId,
        name: data.name,
        shortCode: data.shortCode,
        level: data.level,
        band: data.band,
      },
    });
  }
}
