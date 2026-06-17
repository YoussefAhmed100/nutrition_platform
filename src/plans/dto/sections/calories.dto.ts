import { IsInt, Min } from 'class-validator';

export class CaloriesDto {
  @IsInt()
  @Min(0)
  from: number;

  @IsInt()
  @Min(0)
  to: number;
}