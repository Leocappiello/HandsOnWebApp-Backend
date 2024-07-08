import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateJobDto {
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty()
  @MaxLength(35)
  name: string;

  @IsString({ message: 'description must be a string' })
  @IsNotEmpty()
  description: string;

  @IsString({ message: 'companyName must be a string' })
  @IsNotEmpty()
  @MaxLength(45)
  companyName: string;
}
