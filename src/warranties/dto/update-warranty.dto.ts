import { IsString, IsInt, IsOptional, IsBoolean, Min } from 'class-validator';

export class UpdateWarrantyDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  purchaseDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  warrantyDurationMonths?: number;

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
