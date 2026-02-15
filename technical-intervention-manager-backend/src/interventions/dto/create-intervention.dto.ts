import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateInterventionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  assignedToId: string;
}
