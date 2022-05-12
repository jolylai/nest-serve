import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifyModule } from './notify/notify.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [NotifyModule, UserModule, PrismaModule, AuthModule, FileModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, FileService],
})
export class AppModule {}
