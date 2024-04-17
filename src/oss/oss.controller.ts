import { Controller, Get } from '@nestjs/common';
import { OssService } from './oss.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OSS')
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Get()
  async query() {
    return this.ossService.list();
  }
}
