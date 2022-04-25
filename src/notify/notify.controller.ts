import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Public } from 'src/auth/auth.decorator';
import { ChanifyDto, ChanifyResponse } from './notify.dto';
import { NotifyService } from './notify.service';

@Controller('notify')
export class NotifyController {
  constructor(private notifyService: NotifyService) {}

  @Public()
  @Post('chanify')
  chanify(@Body() chanifyDto: ChanifyDto): Observable<ChanifyResponse> {
    return this.notifyService.send(chanifyDto);
  }
}
