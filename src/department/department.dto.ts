import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DepartmentCreateDto {
  @IsNotEmpty()
  @IsInt()
  parentId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsIn([0, 1])
  status: number;
}

export class DepartmentQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsIn([0, 1])
  status: number;
}

export class DepartmentUpdateDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsInt()
  parentId: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  order: number;

  @IsOptional()
  @IsIn([0, 1])
  status: number;
}
