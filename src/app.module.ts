import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

import { NotifyModule } from './notify/notify.module';
import { UserModule } from './user/user.module';
import { UserAddressModule } from './address/address.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FileService } from './system/file/file.service';
import { FileModule } from './system/file/file.module';
import { AreaModule } from './area/area.module';
import { DepartmentService } from './department/department.service';
import { DepartmentController } from './department/department.controller';
import { JobController } from './job/job.controller';
import { JobService } from './job/job.service';
import { JobModule } from './job/job.module';
import { MenuModule } from './system/menu/menu.module';
import { ExcelModule } from './excel/excel.module';
import { OssModule } from './oss/oss.module';
import { DictionaryModule } from './system/dictionary/dictionary.module';
import { VerificationModule } from './verification/verification.module';
import authConfig from './config/auth-config';

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
      load: [
        authConfig,
        // databaseConfig,
        // appConfig,
        // mailConfig,
        // fileConfig,
        // facebookConfig,
        // googleConfig,
        // twitterConfig,
        // appleConfig,
      ],
      envFilePath: ['.env'],
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
    VerificationModule,
  ],
  controllers: [DepartmentController, JobController],
  providers: [PrismaService, FileService, DepartmentService, JobService],
})
export class AppModule {}
