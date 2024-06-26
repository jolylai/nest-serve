import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, Length } from 'class-validator';

export class AuthMobileLoginDto {
  @ApiProperty({ example: '18188888888' })
  @IsMobilePhone()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ example: '123456' })
  @Length(6, 6)
  @IsNotEmpty()
  captcha: string;
}

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class AuthAccountLoginDto {
  @ApiProperty({ example: '+8618188888888' })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  password: string;
}

export class AuthMobileCaptchaDto {
  @ApiProperty({ example: '+8618188888888' })
  @IsMobilePhone('zh-CN')
  @IsNotEmpty()
  mobile: string;
}
