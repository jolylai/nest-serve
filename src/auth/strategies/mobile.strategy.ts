import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class MobileStrategy extends PassportStrategy(Strategy, 'mobile') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'mobile',
      passwordField: 'captcha',
    });
  }

  async validate(mobile: string, captcha: string) {
    const user = await this.authService.validateMobile(mobile);
    if (!user) {
      throw new NotFoundException('手机号不存在');
    }

    if (captcha !== '1234') {
      throw new BadRequestException('验证码错误');
    }

    return user;
  }
}
