import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ example: 0 })
  // @IsNotEmpty()
  @IsInt()
  @IsOptional()
  parentId: number;

  @ApiProperty({ example: '部门' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsInt()
  sort: number;

  @ApiProperty({ example: 1 })
  @IsIn([0, 1])
  status: number;

  @IsOptional()
  description: string;
}

export class DepartmentQueryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsIn([0, 1])
  status: number;
}

export class UpdateDepartmentDto {
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
