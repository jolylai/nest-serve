import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { ExcelService } from './excel.service';
import { InjectQueue } from '@nestjs/bull';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Excel')
@Controller({
  path: 'excel',
  version: '1',
})
export class ExcelController {
  constructor(
    private readonly excelService: ExcelService,
    @InjectQueue('excel') private excelQueue: Queue,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadXlsxFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.excelService.parseExcel(file.path);

    // const job = await this.excelQueue.add('excel', data);

    // return { jobId: job.id };

    return data;
  }

  @Get('progress/:jobId')
  async getProgress(@Param('jobId') jobId: string) {
    const job = await this.excelQueue.getJob(jobId);
    const percent = (job.progress() / job.data.length) * 100;

    return {
      jobId: job.id,
      jobName: job.name,
      progress: job.progress(),
      total: job.data.length,
      percent,
    };
  }
}
