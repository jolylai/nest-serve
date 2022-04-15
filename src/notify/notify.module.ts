import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
