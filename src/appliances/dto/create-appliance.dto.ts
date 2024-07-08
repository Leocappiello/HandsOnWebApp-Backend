import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateApplianceDto {
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty()
  @MaxLength(35)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  jobId: string;

  @IsString({ message: 'Invalid appliance text' })
  @IsNotEmpty()
  applianceText: string;
}
