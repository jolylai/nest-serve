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
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthMobileRegisterDto } from './dto/auth-register.dto';
import { AuthMobileLoginDto, AuthPasswordLoginDto } from './dto/auth-login.dto';

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

  @Post('password/login')
  @HttpCode(HttpStatus.OK)
  async passwordLogin(@Body() passwordLoginDto: AuthPasswordLoginDto) {
    return this.authService.validatePasswordLogin(passwordLoginDto);
  }

  @Post('mobile/login')
  @HttpCode(HttpStatus.OK)
  async mobileLogin(@Body() mobileLoginDto: AuthMobileLoginDto) {
    return this.authService.validateMobileLogin(mobileLoginDto);
  }

  @Post('mobile/register')
  async register(@Body() mobileRegisterDto: AuthMobileRegisterDto) {
    return this.authService.mobileRegister(mobileRegisterDto);
  }

  @Get('login/captcha')
  async getCaptcha() {
    return this.authService.getCaptcha();
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refresh(@Request() request) {
    return this.authService.refreshToken({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @ApiBearerAuth()
  @SerializeOptions({
    groups: ['me'],
  })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request) {
    return this.authService.me(request.user);
  }
}
