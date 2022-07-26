import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateUserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list(@Query() pagination: PaginationDto) {
    const [list, total] = await this.userService.pagination({
      take: pagination.pageSize,
      skip: pagination.skip,
    });

    return { list, total };
  }

  @Get('/:userId')
  async findById(@Param('userId') useId: number) {
    return this.userService.findById(useId);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
