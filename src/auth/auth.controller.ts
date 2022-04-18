import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Public } from './auth.decorator';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    const token = await this.authService.jwtSign(request.user);
    return { token };
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { name, password } = registerDto;
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    return this.userService.create({
      name,
      password: encryptedPassword,
    });
  }
}
