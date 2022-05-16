import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { AreaService } from './area.service';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get()
  async getArea(
    @Query('pid', ParseIntPipe) pid: number,
    @Query('level', ParseIntPipe) level: number,
  ) {
    return this.areaService.findMany({ where: { pid, level } });
  }
}
