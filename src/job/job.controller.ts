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
import { JobCreateDto, JobQueryDto, JobUpdateDto } from './job.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('/:id')
  async read(@Param('id') jobId: number) {
    return this.jobService.findById(jobId);
  }

  @Get()
  async query(@Query() query: JobQueryDto, @Query() pagination: PaginationDto) {
    const [list, total] = await this.jobService.pagination({
      take: pagination.take,
      skip: pagination.skip,
      where: query,
    });

    return { list, total };
  }

  @Post()
  async create(@Body() data: JobCreateDto) {
    return this.jobService.create(data);
  }

  @Patch()
  async update(@Body() data: JobUpdateDto) {
    const { id, ...rest } = data;
    return this.jobService.update(id, rest);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.jobService.delete(id);
  }
}
