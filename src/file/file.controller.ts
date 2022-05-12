import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.decorator';
import { read } from 'xlsx';

@Controller('file')
export class FileController {
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

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file: ', file);

    const workbook = read(file.buffer, {
      type: 'buffer',
    });

    return workbook;
  }

  // @Get('xlsx')
  // async exportXlsx() {}
}
