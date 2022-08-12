import { IsInt } from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';

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

export class MenuQueryDto extends PartialType(
  PickType(MenuCreateDto, ['name'] as const),
) {}

export class MenuUpdateDto extends PartialType(MenuCreateDto) {
  @IsInt()
  id: number;
}
