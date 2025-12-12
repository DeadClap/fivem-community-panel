import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembershipsService {
  constructor(private readonly prisma: PrismaService) {}

  async assignUserToDepartment(
    userId: string,
    departmentId: string,
    rankId: string,
  ) {
    // Enforce one membership per user per department via the unique index
    return this.prisma.userDepartmentMembership.upsert({
      where: {
        userId_departmentId: { userId, departmentId },
      },
      update: { rankId },
      create: {
        userId,
        departmentId,
        rankId,
      },
    });
  }

  findUserMemberships(userId: string) {
    return this.prisma.userDepartmentMembership.findMany({
      where: { userId },
      include: {
        department: true,
        rank: true,
      },
    });
  }
}
