import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly current: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly pageSize: number = 10;

  get skip(): number {
    return (this.current - 1) * this.pageSize;
  }

  get take(): number {
    return this.pageSize;
  }
}
