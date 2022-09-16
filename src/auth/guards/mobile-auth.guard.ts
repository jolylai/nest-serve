import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MobileAuthGuard extends AuthGuard('mobile') {}
