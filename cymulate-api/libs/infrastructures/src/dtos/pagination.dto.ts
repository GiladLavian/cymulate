import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class OrderByDto {
  @IsString()
  field: string;

  @IsIn(['asc', 'desc'])
  direction: 'asc' | 'desc';
}

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  take?: number;

  @IsOptional()
  @Type(() => String)
  orderByField?: string;

  @IsOptional()
  @Type(() => String)
  orderByDirection: 'asc' | 'desc';
}
