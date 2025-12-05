// apps/backend/src/departments/dto/create-department.dto.ts
export class CreateDepartmentDto {
  name: string;
  code: string; // 'L' for LSPD, 'B' for BCSO, etc.
}
