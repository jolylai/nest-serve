import { Module } from '@nestjs/common';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { BullModule } from '@nestjs/bull';
import { ExcelProcessor } from './excel.processor';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: './public/uploads',
        filename: (req, file, cb) => {
          console.log('file: ', file);
          // 在此处自定义保存后的文件名称
          // const filename = createFileName(file);
          return cb(null, file.originalname);
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'excel',
    }),
  ],
  controllers: [ExcelController],
  providers: [ExcelService, ExcelProcessor],
  exports: [ExcelService],
})
export class ExcelModule {}
