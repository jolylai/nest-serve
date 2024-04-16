import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthMobileRegisterDto {
  @ApiProperty({ example: '18188888888' })
  @IsPhoneNumber()
  mobile: string;

  @ApiProperty()
  @MinLength(6)
  captcha: string;
}
