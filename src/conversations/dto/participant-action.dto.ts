import { IsMongoId } from 'class-validator';

export class ParticipantActionDto {
  @IsMongoId()
  participantId: string;
}