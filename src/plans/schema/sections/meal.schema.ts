import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: true })
export class Meal {
  @Prop({ required: true, trim: true ,type: String})
  name: string;

  @Prop({ required: true,type: String })
  mealTime: string; 

  @Prop({ required: true, min: 0 })
  calories: number;

  @Prop({ trim: true })
  description?: string;
}

export const MealSchema = SchemaFactory.createForClass(Meal);