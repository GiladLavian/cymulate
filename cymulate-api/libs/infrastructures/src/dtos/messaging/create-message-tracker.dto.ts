import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageTrackerDto {
  @IsString()
  @Type(() => String)
  @IsNotEmpty()
  id: string;
}
