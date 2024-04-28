import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('excel')
export class ExcelProcessor {
  private readonly logger = new Logger(ExcelProcessor.name);

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @Process('excel')
  async processExcel(job: Job) {
    // console.log('job: ', job.data);
    // this.logger.debug('Start transcoding...\n');
    // this.logger.debug(job.data);
    // this.logger.debug('Transcoding completed \n');

    const sleep = (ms: number) => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    };

    let progress = 0;

    for (let i = 0; i < 10; i++) {
      console.log('progress: ', progress, job.id);
      await sleep(1000);
      progress += 1;
      await job.progress(progress);
    }
    return {};
  }
}
