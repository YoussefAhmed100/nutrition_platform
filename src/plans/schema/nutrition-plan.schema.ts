import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Calories, CaloriesSchema } from './sections/calories.schema';

import { Macros, MacrosSchema } from './sections/macros.schema';

import { Meal, MealSchema } from './sections/meal.schema';

export type NutritionPlanDocument = HydratedDocument<NutritionPlan>;

@Schema({
  timestamps: true,
})
export class NutritionPlan {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  type: string;

  @Prop({
    type: CaloriesSchema,
    required: true,
  })
  calories: Calories;

  @Prop({
    required: true,
    min: 1,
  })
  durationInWeeks: number;

  @Prop({
    type: MacrosSchema,
    required: true,
  })
  macros: Macros;

  @Prop({
    type: [MealSchema],
    default: [],
  })
  meals: Meal[];

  @Prop({type: String, trim: true})
  instructions: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  patient: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  createdBy: Types.ObjectId;
}

export const NutritionPlanSchema = SchemaFactory.createForClass(NutritionPlan);
