import { PartialType, PickType } from '@nestjs/swagger';

export class DictionaryCreateDto {
  code: string;
  name: string;
  status: number;
  remark: string;
}

export class DictionaryQueryDto extends PartialType(
  PickType(DictionaryCreateDto, ['name', 'status']),
) {}

export class DictionaryUpdateDto extends PartialType(DictionaryCreateDto) {
  id: number;
}
