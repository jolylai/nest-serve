import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateMenuDto, MenuCreateOrUpdateDto, QueryMenuDto } from './menu.dto';
import { MenuService } from './menu.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@ApiTags('Menu')
@Controller({
  path: 'system/menu',
  version: '1',
})
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/tree')
  async tree(@Query() query: QueryMenuDto) {
    return this.menuService.findTree(query);
  }

  @Get('/:id')
  async read(@Param('id') menuId: number) {
    return this.menuService.findById(menuId);
  }

  @Get()
  async query(@Query() query: QueryMenuDto) {
    return this.menuService.findChildren(Object.assign({}, query));
  }

  @Post()
  async create(@Body() data: CreateMenuDto) {
    return this.menuService.create(data);
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
