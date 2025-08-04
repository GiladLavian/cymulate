import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @Type(() => String)
  @IsOptional()
  sender: string;

  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  recipient: string;

  @IsString()
  @Type(() => String)
  @IsOptional()
  subject: string;

  @IsString()
  @Type(() => String)
  @IsOptional()
  body: string;

  @IsString()
  @Type(() => String)
  @IsOptional()
  messageType: string;
}
