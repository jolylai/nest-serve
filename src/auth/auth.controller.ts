import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  SerializeOptions,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { Public } from './auth.decorator';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import * as bcrypt from 'bcrypt';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthMobileLoginDto } from './dto/auth-mobile-login.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('权鉴')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @Post('email/login')
  // @HttpCode(HttpStatus.OK)
  // async emailLogin(@Body() emailLoginDto: AuthEmailLoginDto) {
  //   return this.authService.validateEmailLogin(emailLoginDto);
  // }

  // @Public()
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() request: any) {
  //   const token = await this.authService.jwtSign(request.user);
  //   return { token: `${token}` };
  // }

  @Public()
  @Post('mobile/login')
  @HttpCode(HttpStatus.OK)
  async mobileLogin(@Body() mobileLoginDto: AuthMobileLoginDto) {
    return this.authService.validateMobileLogin(mobileLoginDto);
  }

  @Public()
  @Get('login/captcha')
  async getCaptcha() {
    return this.authService.getCaptcha();
  }

  // @ApiBearerAuth()
  // @SerializeOptions({
  //   groups: ['me'],
  // })
  // @Get('me')
  // @UseGuards(AuthGuard('jwt'))
  // @HttpCode(HttpStatus.OK)
  // public me(@Request() request): Promise<NullableType<User>> {
  //   return this.service.me(request.user);
  // }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { username, password } = registerDto;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    return this.userService.create({
      name: username,
      mobile: '',
      password: encryptedPassword,
    });
  }
}
