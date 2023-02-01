import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateAbsenceRequestDto {
  @IsNotEmpty()
  @IsBoolean()
  is_approve: boolean;
}
