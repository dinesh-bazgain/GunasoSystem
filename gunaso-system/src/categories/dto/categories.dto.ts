import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    code: string;

    @IsString()
    @IsNotEmpty()
    name_en: string;

    @IsString()
    @IsOptional()
    name_np: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    name_en?: string;

    @IsString()
    @IsOptional()
    name_np?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}