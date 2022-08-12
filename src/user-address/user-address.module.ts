import { Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';

@Module({
  providers: [UserAddressService],
  controllers: [UserAddressController],
})
export class UserAddressModule {}
