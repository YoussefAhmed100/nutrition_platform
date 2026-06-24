import {
  IsString,
  Length,
} from 'class-validator';

export class UpdateGroupNameDto {
  @IsString()
  @Length(3, 50)
  groupName: string;
}