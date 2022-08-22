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
import {
  DepartmentCreateDto,
  DepartmentUpdateDto,
  DepartmentQueryDto,
} from './department.dto';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async query(
    @Query() query: DepartmentQueryDto,
    @Query() pagination: PaginationDto,
  ) {
    const [list, total] = await this.departmentService.pagination({
      take: pagination.take,
      skip: pagination.skip,
      where: query,
    });

    return { list, total };
  }

  @Get('/:id')
  async read(@Param('id') id: number) {
    return this.departmentService.findById(id);
  }

  @Post()
  async create(@Body() data: DepartmentCreateDto) {
    return this.departmentService.create(data);
  }

  @Patch()
  async update(@Body() data: DepartmentUpdateDto) {
    const { id, ...rest } = data;
    return this.departmentService.update(id, rest);
  }
}
