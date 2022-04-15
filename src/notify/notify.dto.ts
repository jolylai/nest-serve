import { IsNotEmpty } from 'class-validator';

export class ChanifyDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;
}

export class ChanifyResponse {
  'request-uid': string;
}
