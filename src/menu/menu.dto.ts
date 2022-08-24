import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class MenuCreateOrUpdateDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsInt()
  parentId: number = null;

  @IsNotEmpty()
  @IsInt()
  type: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  permissions: string;

  @IsOptional()
  @IsString()
  query: string;

  @IsOptional()
  @IsIn([0, 1])
  isLink: number;

  @IsOptional()
  @IsIn([0, 1])
  visible: number;

  @IsOptional()
  @IsIn([0, 1])
  status: number;
}

export class MenuQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  parentId: number;
}
