import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobCreateDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  order: number;

  @IsNotEmpty()
  @IsInt()
  status: number;

  @IsString()
  remark: string;
}

export class JobQueryDto {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  status: number;
}

export class JobUpdateDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  order: number;

  @IsOptional()
  @IsInt()
  status: number;

  @IsOptional()
  @IsString()
  remark: string;
}
