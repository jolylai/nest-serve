import { PartialType, PickType } from '@nestjs/swagger';

export class DepartmentCreateDto {
  name: string;
  parentId: number;
  order: number;
  leader: string;
  phone: string;
  email: string;
  status: number;
}

export class DepartmentQueryDto extends PartialType(
  PickType(DepartmentCreateDto, ['name', 'status']),
) {}

export class DepartmentUpdateDto extends PartialType(DepartmentCreateDto) {
  id: number;
}
