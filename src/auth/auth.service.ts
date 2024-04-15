import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { AuthMobileLoginDto } from './dto/auth-mobile-login.dto';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { SessionService } from '@/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService<AllConfigType>,
    private readonly sessionService: SessionService,
  ) {}

  async validateMobileLogin(mobileLoginDto: AuthMobileLoginDto) {
    const user = await this.userService.findByMobile(mobileLoginDto.mobile);

    if (!user) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          mobile: '用户不存在',
        },
      });
    }

    // 效验密码
    const isValidPassword = await bcrypt.compare(
      mobileLoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: 'incorrectPassword',
        },
      });
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = await this.sessionService.create({
      user,
      hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      role: user.role,
      sessionId: session.id,
      hash,
    });

    return {
      refreshToken,
      token,
      tokenExpires,
      user,
    };
  }

  async validateMobile(mobile: string) {
    return this.userService.findByMobile(mobile);
  }

  async validateUser(mobile: string, password: string) {
    const user = await this.userService.findByMobile(mobile);
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    }

    return null;
  }

  async login(payload: any) {
    return { token: this.jwtService.sign(payload) };
  }

  async getCaptcha() {
    return '1234';
  }

  private async getTokensData(data: {
    id: string;
    role: string;
    sessionId: string;
    hash: string;
  }) {
    // const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
    //   infer: true,
    // });

    const tokenExpiresIn = '1d';
    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          sessionId: data.sessionId,
        },
        {
          // secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          secret: 'secret',
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          // secret: this.configService.getOrThrow('auth.refreshSecret', {
          //   infer: true,
          // }),
          secret: 'secret',
          // expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
          //   infer: true,
          // }),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}
