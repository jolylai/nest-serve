import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByName(username);
    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(payload: any) {
    return { token: this.jwtService.sign(payload) };
  }
}
