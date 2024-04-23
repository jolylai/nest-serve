import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class VerificationService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建手机验证码
   * @returns
   */
  async createMobileCaptcha(mobile: string) {
    // 生成验证码
    const captcha = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    return this.prisma.verificationToken.create({
      data: {
        identifier: mobile,
        token: captcha,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
  }

  /**
   *  验证手机验证码
   * @param mobile
   * @param code
   */
  async verifyMobileCaptcha(mobile: string, captcha: string) {
    const verificationToken = await this.prisma.verificationToken.findFirst({
      where: {
        identifier: mobile,
        token: captcha,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    return verificationToken;
  }

  /**
   * 删除手机验证码
   * @param mobile
   */
  async deleteMobileCaptcha(mobile: string) {
    return this.prisma.verificationToken.deleteMany({
      where: {
        identifier: mobile,
      },
    });
  }
}
