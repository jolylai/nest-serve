import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateDictionaryDto,
  DictionaryQueryDto,
  DictionaryUpdateDto,
  QueryDictionaryItemDto,
} from './dictionary.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DictionaryService } from './dictionary.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('字典管理')
@Controller({
  path: 'system/dictionary',
  version: '1',
})
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @ApiOperation({
    summary: '获取字典项',
    description: '使用分页获取字典项',
  })
  @Get('/item')
  @HttpCode(HttpStatus.OK)
  async findItems(
    @Query() queryDictionaryItemDto: QueryDictionaryItemDto,
    @Query() paginationDto: PaginationDto,
  ) {
    const [list, total] = await this.dictionaryService.pagination({
      take: paginationDto.take,
      skip: paginationDto.skip,
      where: queryDictionaryItemDto,
    });

    return { list, total };
  }

  @ApiOperation({
    summary: '获取字典类型',
    description: '使用分页获取字典类型',
  })
  @Get()
  async pagination(
    @Query() query: DictionaryQueryDto,
    @Query() pagination: PaginationDto,
  ) {
    const [list, total] = await this.dictionaryService.pagination({
      take: pagination.take,
      skip: pagination.skip,
      where: query,
    });

    return { list, total };
  }

  @ApiOperation({
    summary: '获取字典类型详情',
  })
  @Get('/:id')
  async find(@Param('id') id: number) {
    return this.dictionaryService.findById(id);
  }

  @ApiOperation({
    summary: '创建字典类型',
  })
  @Post()
  async create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionaryDto);
  }

  @ApiOperation({
    summary: '修改字典类型',
  })
  @Patch()
  async update(@Body() data: DictionaryUpdateDto) {
    const { id, ...updateDto } = data;
    return this.dictionaryService.update(id, updateDto);
  }

  @ApiOperation({
    summary: '删除字典类型',
  })
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.dictionaryService.delete(id);
  }
}
