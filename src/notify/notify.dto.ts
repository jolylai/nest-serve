import { IsNotEmpty, IsString } from 'class-validator';

export class ChanifyDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}

export class ChanifyResponse {
  'request-uid': string;
}
