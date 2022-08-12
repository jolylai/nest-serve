import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { MenuCreateDto, MenuQueryDto, MenuUpdateDto } from './menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/:id')
  async read(@Param('id') menuId: number) {
    return this.menuService.findById(menuId);
  }

  @Get()
  async query(
    @Query() query: MenuQueryDto,
    @Query() pagination: PaginationDto,
  ) {
    return this.menuService.pagination({
      take: pagination.take,
      skip: pagination.skip,
      where: query,
    });
  }

  @Post()
  async create(@Body() data: MenuCreateDto) {
    return this.menuService.create(data);
  }

  @Patch()
  async update(@Body() data: MenuUpdateDto) {
    const { id, ...rest } = data;
    return this.menuService.update(id, rest);
  }
}
