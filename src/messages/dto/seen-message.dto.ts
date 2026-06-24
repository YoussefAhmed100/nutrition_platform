import { IsMongoId } from 'class-validator';

export class SeenMessageDto {
  @IsMongoId()
  messageId: string;

  @IsMongoId()
  userId: string;
}