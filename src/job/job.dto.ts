import { IsInt } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';

export class JobCreateDto {
  code: string;
  name: string;
  order: number;
  status: number;
}

export class JobQueryDto extends PartialType(
  OmitType(JobCreateDto, ['order'] as const),
) {}

export class JobUpdateDto extends PartialType(JobCreateDto) {
  @IsInt()
  id: number;
}
