import { Body, Controller, Post } from '@nestjs/common';
import { DictionaryCreateDto } from './dictionary.dto';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post()
  async create(@Body() data: DictionaryCreateDto) {
    return this.dictionaryService.create(data);
  }
}
