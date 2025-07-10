import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task-dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpDateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsBoolean()
  readonly completed?: boolean;
}
