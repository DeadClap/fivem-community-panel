// apps/backend/src/departments/departments.service.ts
import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';

export interface Department {
  id: string;
  name: string;
  code: string;
}

@Injectable()
export class DepartmentsService {
  private readonly departments = new Map<string, Department>();
  private idCounter = 1;

  create(dto: CreateDepartmentDto): Department {
    const id = String(this.idCounter++);
    const department: Department = { id, ...dto };
    this.departments.set(id, department);
    return department;
  }

  findAll(): Department[] {
    return Array.from(this.departments.values());
  }
}
