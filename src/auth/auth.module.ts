import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionModule } from '@/session/session.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { VerificationModule } from '@/verification/verification.module';
import { VerificationService } from '@/verification/verification.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    SessionModule,
    VerificationModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    VerificationService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
