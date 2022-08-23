import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
  async query(@Query() query: MenuQueryDto) {
    return this.menuService.findChildren(
      Object.assign({ parentId: null }, query),
    );
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
