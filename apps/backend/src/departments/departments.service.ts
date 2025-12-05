// apps/backend/src/departments/departments.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from '@prisma/client';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateDepartmentDto): Promise<Department> {
    return this.prisma.department.create({
      data: {
        name: dto.name,
        code: dto.code,
      },
    });
  }

  findAll(): Promise<Department[]> {
    return this.prisma.department.findMany();
  }
}
