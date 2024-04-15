import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Public } from './auth.decorator';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';

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

  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  async emailLogin(@Body() emailLoginDto: AuthEmailLoginDto) {

  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: any) {
    const token = await this.authService.jwtSign(request.user);
    return { token: `${token}` };
  }

  @Public()
  @Post('login/mobile')
  async mobileLogin(@Request() request: any) {
    const token = await this.authService.jwtSign(request.user);
    return { token: `${token}` };
  }

  @Public()
  @Get('login/captcha')
  async getCaptcha() {
    return this.authService.getCaptcha();
  }

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
