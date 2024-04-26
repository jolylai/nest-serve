import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '张三' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '13800138000' })
  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  mobile: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsIn([0, 1])
  status: number;

  @ApiProperty({ example: 0 })
  @Transform(({ value }) => parseInt(value))
  @IsIn([0, 1, 2])
  @IsOptional()
  gender: number;
}

export class QueryUserDto {
  @IsNotEmpty()
  @IsString()
  readonly mobile: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
