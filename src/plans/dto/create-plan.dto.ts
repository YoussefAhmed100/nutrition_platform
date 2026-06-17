import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CaloriesDto } from './sections/calories.dto';
import { MacrosDto } from './sections/macros.dto';
import { MealDto } from './sections/meal.dto';

export class CreateNutritionPlanDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @ValidateNested()
  @Type(() => CaloriesDto)
  calories: CaloriesDto;

  @IsInt()
  @Min(1)
  durationInWeeks: number;

  @ValidateNested()
  @Type(() => MacrosDto)
  macros: MacrosDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealDto)
  meals: MealDto[];

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsMongoId()
  patient: string;
}