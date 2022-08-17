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
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  DictionaryCreateDto,
  DictionaryQueryDto,
  DictionaryUpdateDto,
} from './dictionary.dto';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

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

  @Get('/:id')
  async find(@Param('id') id: number) {
    return this.dictionaryService.findById(id);
  }

  @Post()
  async create(@Body() data: DictionaryCreateDto) {
    return this.dictionaryService.create(data);
  }

  @Patch()
  async update(@Body() data: DictionaryUpdateDto) {
    const { id, ...updateDto } = data;
    return this.dictionaryService.update(id, updateDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.dictionaryService.delete(id);
  }
}
