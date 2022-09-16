import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

  async jwtSign(payload: string | object | Buffer) {
    return this.jwtService.sign(payload);
  }

  async login(payload: any) {
    return { token: this.jwtService.sign(payload) };
  }

  async getCaptcha() {
    return '1234';
  }
}
