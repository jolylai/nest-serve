import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryRoleDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class CreateRoleDto {
  @IsString()
  code: string;

  @IsNumber()
  sort: number;

  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  status: number;

  // @IsBoolean()
  // @IsOptional()
  // isSystem: boolean;

  @IsNumber()
  dataScope: number;

  @IsString()
  @IsOptional()
  description: string;

  @Transform(({ value }) => value.join(','), { toClassOnly: true })
  @IsOptional()
  menuIds: string;

  @Transform(({ value }) => value.join(','), { toClassOnly: true })
  @IsOptional()
  deptIds: string;
}
