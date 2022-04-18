import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  findById(@Param('userId') useId: number) {
    return this.userService.findById(useId);
  }

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }
}
