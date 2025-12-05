// apps/backend/src/departments/departments.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Department } from '@prisma/client';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() dto: CreateDepartmentDto): Promise<Department> {
    return this.departmentsService.create(dto);
  }

  @Get()
  findAll(): Promise<Department[]> {
    return this.departmentsService.findAll();
  }
}
