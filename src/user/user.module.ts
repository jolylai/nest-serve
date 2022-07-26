import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserAddressService } from './services/user-address.service';
import { UserAddressController } from './controllers/user-address.controller';

@Module({
  providers: [UserService, UserAddressService],
  controllers: [UserAddressController, UserController],
  exports: [UserService],
})
export class UserModule {}
