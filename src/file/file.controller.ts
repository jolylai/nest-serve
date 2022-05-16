import {
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { readFile, writeFile } from 'fs-extra';
import { read, write, utils } from 'xlsx';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Get()
  async list() {
    return {
      code: 200,
      status: 200,
      data: {
        id: 'id',
        url: 'https://picsum.photos/200/300',
      },
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file: ', file);
    return this.fileService.create({
      name: file.filename,
      url: 'https://picsum.photos/200/300',
    });
  }

  @Delete(':id')
  deleteFile(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.delete(id);
  }

  @Post('xlsx')
  @UseInterceptors(FileInterceptor('file'))
  uploadXlsxFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file: ', file);
    console.log('file: ', file.filename);

    const workbook = read(file.buffer, {
      type: 'buffer',
    });

    return workbook;
  }

  @Get('xlsx')
  @Header('Content-Disposition', 'attachment; filename=download.xlsx')
  async exportXlsx() {
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

    return readFile('./hello.xlsx');
  }
}
