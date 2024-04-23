import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

export class AuthMobileRegisterDto {
  @ApiProperty({ example: '18188888888' })
  @IsPhoneNumber()
  mobile: string;

  @ApiProperty()
  @MinLength(6)
  captcha: string;
}

export class AuthEmailRegisterDto {
  @ApiProperty({ example: '123@qq.com' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;
}
