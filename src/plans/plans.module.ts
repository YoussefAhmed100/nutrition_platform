import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NutritionPlan, NutritionPlanSchema } from './schema/nutrition-plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: NutritionPlan.name, schema: NutritionPlanSchema },
      ]),
  ],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
