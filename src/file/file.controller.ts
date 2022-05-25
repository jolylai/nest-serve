import {
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { writeFile } from 'fs-extra';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { read, write, utils } from 'xlsx';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async list(@Query() pagination: PaginationDto) {
    const [list, total] = await this.fileService.pagination({
      skip: pagination.skip,
      take: pagination.take,
    });

    return { list, total };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.create({
      name: file.filename,
      url: 'https://picsum.photos/200/300',
    });
  }

  @Delete(':id')
  deleteFile(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.delete(id);
  }

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  uploadXlsxFile(@UploadedFile() file: Express.Multer.File) {
    const workbook = read(file.buffer, {
      type: 'buffer',
    });

    return workbook;
  }

  @Get('xlsx')
  @Header('Content-Disposition', 'attachment; filename=download.xlsx')
  async exportXlsxFile() {
    const workBook = utils.book_new();
    const workSheet = utils.aoa_to_sheet([[1, 2, 3]], {
      cellDates: true,
    });

    // 向工作簿中追加工作表
    utils.book_append_sheet(workBook, workSheet, 'helloWorld');

    // 浏览器端和node共有的API,实际上node可以直接使用xlsx.writeFile来写入文件,但是浏览器没有该API
    const result = write(workBook, {
      bookType: 'xlsx', // 输出的文件类型
      type: 'buffer', // 输出的数据类型
      compression: true, // 开启zip压缩
    });

    // 写入文件
    writeFile('./hello.xlsx', result);
    const file = createReadStream('package.json');

    return new StreamableFile(file);
  }

  @Get(':id')
  async getFile(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.findById(id);
  }
}
