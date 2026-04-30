import { IsString, IsInt, IsOptional, IsBoolean, Min, MinLength } from 'class-validator';

export class CreateWarrantyDTO {
  @IsString()
  userId!: string;

  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  category!: string;

  @IsString()
  purchaseDate!: string;

  @IsInt()
  @Min(1)
  warrantyDurationMonths!: number;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isPrecious?: boolean;
}
