import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Response,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import fg from 'fast-glob';
import { remove } from 'fs-extra';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FileService } from './file.service';
import { getContentType, getFilePath } from './file.util';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @InjectQueue('file') private fileQueue: Queue,
  ) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  async uploadXlsxFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.fileService.parseExcel(file.path);

    const job = await this.fileQueue.add('excel', data);

    return { jobId: job.id };
  }

  @Get('progress/:jobId')
  async getProgress(@Param('jobId') jobId: string) {
    const job = await this.fileQueue.getJob(jobId);
    const percent = (job.progress() / job.data.length) * 100;

    return {
      jobId: job.id,
      jobName: job.name,
      progress: job.progress(),
      total: job.data.length,
      percent,
    };
  }

  @Get()
  async list(@Query() pagination: PaginationDto) {
    console.log('pagination: ', pagination);
    const files = await fg(['public/uploads/**'], { stats: true });
    const list = files.map((file) => {
      return {
        name: file.name,
        size: file.stats.size,
        createdAt: file.stats.ctime,
      };
    });

    return { data: list, total: list.length };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: file.path, name: file.filename };
  }

  @Get(':filename')
  async getFile(
    @Param('filename') filename: string,
    @Response({ passthrough: true }) res,
  ) {
    const file = createReadStream(getFilePath(filename));

    res.set({
      'Content-Type': getContentType(filename),
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(file);
  }

  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string) {
    await remove(getFilePath(filename));

    return { name: filename };
  }
}
