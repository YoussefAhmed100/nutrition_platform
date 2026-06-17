import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/users/enums/roles.enum';
import { IsInternationalPhoneNumber } from 'src/common/validators/is-phone.validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Ahmed Mohamed',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  fullName: string;

  @ApiProperty({
    example: 'ahmed@example.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    example: '+201001234567',
   
  })
  @IsOptional()
  @IsString()
  @IsInternationalPhoneNumber({
    message: 'Invalid phone number',
  })
  phone: string;
}
