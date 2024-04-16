import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsInt()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly mobile: string;

  @IsNotEmpty()
  @IsInt()
  readonly provinceId: number;

  @IsNotEmpty()
  @IsInt()
  readonly cityId: number;

  @IsNotEmpty()
  @IsInt()
  readonly areaId: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly fullAddress: string;

  @IsNotEmpty()
  @IsLongitude()
  readonly longitude: number;

  @IsNotEmpty()
  @IsLatitude()
  readonly latitude: number;

  @IsNotEmpty()
  @IsInt()
  readonly isDefault: number;
}
