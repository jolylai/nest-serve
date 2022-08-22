import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class MenuCreateDto {
  type: string;
  icon: string;
  name: string;
  order: number;
  path: string;
  parentId: number;
  isLink: number;
  visible: number;
  status: number;
}

export class MenuQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  parentId: number;
}

export class MenuUpdateDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
