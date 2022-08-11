import { Body, Controller, Post, Request } from '@nestjs/common';
import { DepartmentCreateDto } from './department.dto';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() data: DepartmentCreateDto, @Request() request: any) {
    const user = request.user;
    console.log('user: ', user);
    return this.departmentService.create({ ...data, createdBy: 1 });
  }
}
