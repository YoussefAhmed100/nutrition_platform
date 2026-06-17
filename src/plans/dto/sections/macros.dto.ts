import { IsInt, Min, Max } from 'class-validator';

export class MacrosDto {
  @IsInt()
  @Min(0)
  @Max(100)
  protein: number;

  @IsInt()
  @Min(0)
  @Max(100)
  carbs: number;

  @IsInt()
  @Min(0)
  @Max(100)
  fats: number;
}