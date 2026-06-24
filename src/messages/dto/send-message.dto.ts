import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SendMessageDto {
  @IsMongoId()
  conversationId: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  content?: string;


}