import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMenuDto {
  @IsOptional()
  @IsInt()
  parentId: number;

  @IsNotEmpty()
  @IsIn([1, 2, 3])
  type: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsInt()
  sort: number;

  @IsOptional()
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  icon: string;

  @IsOptional()
  @IsString()
  permission: string;

  @IsOptional()
  @IsBoolean()
  isExternal: boolean;

  @IsOptional()
  @IsBoolean()
  isHidden: boolean;

  @IsOptional()
  @IsBoolean()
  isCache: boolean;

  @IsOptional()
  @IsIn([0, 1])
  visible: number;

  @IsOptional()
  @IsIn([0, 1])
  status: number;
}

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

  @IsOptional()
  // @IsString()
  name: string | null;

  @IsNotEmpty()
  @IsInt()
  sort: number;

  @IsOptional()
  // @IsString()
  path: string | null;

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

export class QueryMenuDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  title: string;

  @IsIn([0, 1])
  @IsOptional()
  status: number;
}
