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

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { read } from 'xlsx';
import { FileService } from './file.service';
import { getContentType, getFilePath } from './file.util';
import { remove } from 'fs-extra';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async list(@Query() pagination: PaginationDto) {
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

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  uploadXlsxFile(@UploadedFile() file: Express.Multer.File) {
    const workbook = read(file.buffer, {
      type: 'buffer',
    });

    return workbook;
  }

  @Get('excel')
  async exportXlsxFile() {}

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
