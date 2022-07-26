import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserAddressDto } from '../dtos/user-address.dto';
import { UserAddressService } from '../services/user-address.service';
import { UserService } from '../services/user.service';

@Controller('user-address')
export class UserAddressController {
  constructor(
    private readonly userService: UserService,
    private readonly userAddressService: UserAddressService,
  ) {}

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
