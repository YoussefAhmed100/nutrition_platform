import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Calories {
  @Prop({
    required: true,
    min: 0,
  })
  from: number;

  @Prop({
    required: true,
    min: 0,
  })
  to: number;
}

export const CaloriesSchema = SchemaFactory.createForClass(Calories);
