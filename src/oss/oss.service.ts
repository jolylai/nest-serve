import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OSS from 'ali-oss';

@Injectable()
export class OssService {
  store: OSS;

  constructor(private readonly configService: ConfigService) {
    this.store = new OSS({
      region: this.configService.get('OSS_REGION'),
      bucket: this.configService.get('OSS_BUCKET'),
      accessKeyId: this.configService.get('OSS_ACCESSKEY_ID'),
      accessKeySecret: this.configService.get('OSS_ACCESSKEY_SECRET'),
    });
  }

  async list() {
    const res = await this.store.list(null, { timeout: 10000 });
    return res.objects;
  }
}
