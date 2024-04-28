import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { createFileName, FileDestination } from './file.util';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: FileDestination,
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const filename = createFileName(file);
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
