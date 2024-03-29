import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MenuCreateOrUpdateDto, MenuQueryDto } from './menu.dto';
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
    return this.menuService.findChildren(Object.assign({}, query));
  }

  @Post()
  async create(@Body() data: MenuCreateOrUpdateDto) {
    return this.menuService.upsert(data);
  }

  @Patch()
  async update(@Body() data: MenuCreateOrUpdateDto) {
    const { id, ...rest } = data;
    return this.menuService.update(id, rest);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.menuService.delete(id);
  }
}
