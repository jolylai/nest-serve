import { Allow, IsInt, IsString } from 'class-validator';

export class DictionaryCreateDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsInt()
  status: number;

  @IsString()
  remark: string;
}

export class DictionaryQueryDto {
  @Allow()
  name: string;

  @Allow()
  code: string;

  @Allow()
  status: number;

  @Allow()
  beginTime: string;

  @Allow()
  endTime: string;
}

export class DictionaryUpdateDto {
  @IsInt()
  id: number;

  @Allow()
  name: string;

  @Allow()
  code: string;

  @Allow()
  status: number;

  @Allow()
  remark: string;
}
