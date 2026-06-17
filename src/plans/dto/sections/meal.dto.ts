import {
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class MealDto {
  @IsString()
  name: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  mealTime: string;

  @IsInt()
  @Min(0)
  calories: number;

  @IsOptional()
  @IsString()
  description?: string;
}