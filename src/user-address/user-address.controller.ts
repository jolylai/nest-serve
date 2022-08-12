import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserAddressDto } from './user-address.dto';
import { UserAddressService } from './user-address.service';

@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Get('/:userId')
  async findById(@Param('userId') useId: number) {
    return this.userAddressService.find(useId);
  }

  @Post()
  async create(@Body() userAddressDto: CreateUserAddressDto) {
    const { userId, ...data } = userAddressDto;
    return this.userAddressService.create({
      user: {
        connect: {
          id: userId,
        },
      },
      ...data,
    });
  }
}
