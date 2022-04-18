import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    console.log(' req.user: ', req.user);
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register() {
    return 'register';
  }
}
