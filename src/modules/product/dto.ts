import { IsString, IsNotEmpty, IsOptional, IsNumber, IsInt, IsUrl, IsPositive, Min, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  delivery_fee: number;

  @IsString()
  @IsUrl()
  @MaxLength(255)
  image_url: string;

  @Type(() => Number)
  @IsInt()
  record_status: number;
}

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  delivery_fee?: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(255)
  image_url?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  record_status?: number;
}
