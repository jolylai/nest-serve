import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class AuthMobileLoginDto {
  @ApiProperty({ example: '18188888888' })
  @IsMobilePhone()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}