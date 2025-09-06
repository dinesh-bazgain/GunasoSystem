import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Role } from "@prisma/client";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  role: Role
}