import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Macros {
  @Prop({
    required: true,
    min: 0,
  })
  protein: number;

  @Prop({
    required: true,
    min: 0,
  })
  carbs: number;

  @Prop({
    required: true,
    min: 0,
  })
  fats: number;
}

export const MacrosSchema = SchemaFactory.createForClass(Macros);
