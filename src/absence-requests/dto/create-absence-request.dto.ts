import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateAbsenceRequestDto {
  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
