import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { TicketStatus } from '@prisma/client';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  code?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus; // Defaults to NEW in schema

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  wardId: number;

  @IsUUID()
  @IsNotEmpty()
  createdById: string;

  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}

export class UpdateTicketDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  code?: string;
  
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @IsOptional()
  categoryId?: number;

  @IsOptional()
  wardId?: number;

  @IsUUID()
  @IsOptional()
  assignedToId?: string;

  @IsDateString()
  @IsOptional()
  closedAt?: Date;
}
