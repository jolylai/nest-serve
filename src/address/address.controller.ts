import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAddressDto } from './address.dto';
import { AddressService } from './address.service';

@Controller('user-address')
export class AddressController {
  constructor(private readonly userAddressService: AddressService) {}

  @Get('/:userId')
  async findById(@Param('userId') useId: string) {
    return this.userAddressService.find(useId);
  }

  @Post()
  async create(@Body() userAddressDto: CreateAddressDto) {
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
