import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [NotifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
