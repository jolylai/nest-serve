import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@/config/config.type';
import { SessionService } from '@/session/session.service';
import { AuthMobileLoginDto, AuthAccountLoginDto } from './dto/auth-login.dto';
import {
  AuthEmailRegisterDto,
  AuthMobileRegisterDto,
} from './dto/auth-register.dto';
import { JwtPayloadType, JwtRefreshPayloadType } from './types/jwt.type';
import { PrismaService } from '@/prisma/prisma.service';
import { VerificationService } from '@/verification/verification.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly sessionService: SessionService,
    private readonly verificationService: VerificationService,
  ) {}

  async validateMobileLogin(mobileLoginDto: AuthMobileLoginDto) {
    const isValidCaptcha = await this.verificationService.verifyMobileCaptcha(
      mobileLoginDto.mobile,
      mobileLoginDto.captcha,
    );

    if (!isValidCaptcha) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: '验证码错误',
        },
      });
    }

    this.verificationService.deleteMobileCaptcha(mobileLoginDto.mobile);

    let user = await this.userService.findByMobile(mobileLoginDto.mobile);

    if (!user) {
      user = await this.userService.create({
        name: mobileLoginDto.mobile,
        mobile: mobileLoginDto.mobile,
        // todo delete
        password: mobileLoginDto.captcha,
        gender: 0,
        status: 1,
      });
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    // 创建 session
    const session = await this.sessionService.create({
      sessionToken: hash,
      user: {
        connect: {
          id: user.id,
        },
      },
      device: '',
      os: '',
      expiresAt: new Date(Date.now() + ms('1d')),
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      // role: user.role,
      sessionId: session.id,
      hash,
    });

    return {
      accessToken: token,
      accessTokenExpiresAt: tokenExpires,
      refreshToken,
      tokenType: 'bearer',
    };
  }

  // 账号密码登录
  async validateAccountLogin(passwordLoginDto: AuthAccountLoginDto) {
    const user = await this.userService.findByMobile(passwordLoginDto.mobile);

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
      passwordLoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          password: '密码错误',
        },
      });
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    // 创建 session
    const session = await this.sessionService.create({
      sessionToken: hash,
      user: {
        connect: {
          id: user.id,
        },
      },
      device: '',
      os: '',
      expiresAt: new Date(Date.now() + ms('1d')),
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user.id,
      // role: user.role,
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

  /**
   * 获取验证码
   * @param {String} mobile
   * @returns
   */
  async getCaptcha(mobile: string) {
    // todo 发送验证码
    return this.verificationService.createMobileCaptcha(mobile);
  }

  async emailRegister(dto: AuthEmailRegisterDto) {
    // return this.userService.create({
    //   name: dto.mobile,
    //   mobile: dto.mobile,
    //   password: dto.captcha,
    // });
  }

  async mobileRegister(dto: AuthMobileRegisterDto) {
    return this.userService.create({
      name: dto.mobile,
      mobile: dto.mobile,
      password: dto.captcha,
      gender: 0,
      status: 1,
    });
  }

  /**
   * 获取 access_token 和 refresh_token
   * @param data
   * @returns
   */
  private async getTokensData(data: {
    id: string;
    // role: string;
    sessionId: string;
    hash: string;
  }) {
    const tokenExpiresIn = this.configService.getOrThrow<AllConfigType>(
      'auth.expires',
      {
        infer: true,
      },
    );

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          // role: data.role,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow<AllConfigType>('auth.secret', {
            infer: true,
          }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow<AllConfigType>(
            'auth.refreshSecret',
            {
              infer: true,
            },
          ),
          expiresIn: this.configService.getOrThrow<AllConfigType>(
            'auth.refreshExpires',
            {
              infer: true,
            },
          ),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async refreshToken(data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>) {
    const session = await this.sessionService.findFirst({
      id: data.sessionId,
    });

    if (!session) {
      throw new UnauthorizedException();
    }

    if (session.id !== data.hash) {
      throw new UnauthorizedException();
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    await this.sessionService.update(session.id, {
      id: hash,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: session.userId,
      sessionId: session.id,
      hash,
    });

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }

  async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.delete({
      id: data.sessionId,
    });
  }

  async me(userJwtPayload: JwtPayloadType) {
    return this.userService.findById(userJwtPayload.id);
  }
}
