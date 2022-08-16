import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifyModule } from './notify/notify.module';
import { UserModule } from './user/user.module';
import { UserAddressModule } from './address/address.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { AreaModule } from './area/area.module';
import { DepartmentService } from './department/department.service';
import { DepartmentController } from './department/department.controller';
import { JobController } from './job/job.controller';
import { JobService } from './job/job.service';
import { JobModule } from './job/job.module';
import { MenuModule } from './menu/menu.module';
import { ExcelModule } from './excel/excel.module';
import { OssModule } from './oss/oss.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotifyModule,
    UserModule,
    UserAddressModule,
    PrismaModule,
    AuthModule,
    FileModule,
    AreaModule,
    JobModule,
    MenuModule,
    ExcelModule,
    OssModule,
    DictionaryModule,
  ],
  controllers: [AppController, DepartmentController, JobController],
  providers: [
    AppService,
    PrismaService,
    FileService,
    DepartmentService,
    JobService,
  ],
})
export class AppModule {}
