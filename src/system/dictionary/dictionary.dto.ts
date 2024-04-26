import { Allow, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class QueryDictionaryItemDto {}

export class CreateDictionaryDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  status: number;

  @IsBoolean()
  @IsOptional()
  isSystem: boolean;

  @IsString()
  @IsOptional()
  description: string;
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
