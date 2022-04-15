import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ChanifyDto, ChanifyResponse } from './notify.dto';

@Injectable()
export class NotifyService {
  constructor(private httpService: HttpService) {}

  send(chanifyDto: ChanifyDto): Observable<ChanifyResponse> {
    return this.httpService
      .post<{ 'request-uid': 'string' }>(
        `https://api.chanify.net/v1/sender`,
        chanifyDto,
      )
      .pipe(map((response) => response.data));
  }
}
