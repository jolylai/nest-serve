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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import fg from 'fast-glob';
import { remove } from 'fs-extra';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FileService } from './file.service';
import { getContentType, getFilePath } from './file.util';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文件管理')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'file',
  version: '1',
})
export class FileController {
  constructor(
    private readonly fileService: FileService,
    // @InjectQueue('file') private fileQueue: Queue,
  ) {}

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
