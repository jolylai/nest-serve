import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import {
  CreateDepartmentDto,
  DepartmentQueryDto,
  UpdateDepartmentDto,
} from './department.dto';
import { DepartmentService } from './department.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@ApiTags('Department')
@Controller({
  path: 'department',
  version: '1',
})
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

  @Get('/tree')
  async tree() {
    return this.departmentService.findSubTree(0);
  }

  @Get('/export')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
  )
  @Header('Content-Disposition', 'attachment; filename=department.xlsx')
  async export() {
    return this.departmentService.findSubTree(0);
  }

  @Get('/:id')
  async read(@Param('id') id: number) {
    return this.departmentService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(@Body() data: UpdateDepartmentDto) {
    const { id, ...rest } = data;
    return this.departmentService.update(id, rest);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') deptId: number) {
    return this.departmentService.delete(deptId);
  }
}
