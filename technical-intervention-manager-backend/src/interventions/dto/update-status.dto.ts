import { IsEnum } from 'class-validator';
import { InterventionStatus } from '../enums/status.enum';

export class UpdateStatusDto {
  @IsEnum(InterventionStatus)
  status: InterventionStatus;
}
