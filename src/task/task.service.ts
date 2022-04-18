import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron('45 * * * * *')
  log() {
    this.logger.debug('Called when the current second is 45');
  }

  @Interval(10000)
  interval() {
    this.logger.debug('Called every 10 seconds');
  }
}
