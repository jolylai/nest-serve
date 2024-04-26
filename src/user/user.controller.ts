import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Query() pagination: PaginationDto) {
    const [list, total] = await this.userService.pagination({
      take: pagination.pageSize,
      skip: pagination.skip,
    });

    return { list, total };
  }

  @Get('/:userId')
  async findById(@Param('userId') useId: string) {
    return this.userService.findById(useId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
