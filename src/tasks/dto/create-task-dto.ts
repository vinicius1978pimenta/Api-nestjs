import { IsString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber() 
  @IsNotEmpty()
  userId: number;
}
