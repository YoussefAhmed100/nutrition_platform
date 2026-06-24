import { IsArray, ArrayMinSize, IsMongoId } from 'class-validator';

export class CreateConversationDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  participants: string[];
}