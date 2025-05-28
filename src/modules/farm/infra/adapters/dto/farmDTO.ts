import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNonNegativeDecimal } from '@shared/utils/decorators/decimal';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length, Max, Min, ValidateNested } from 'class-validator';

export class FarmDTO {
  @ApiProperty({
    example: 1,
    description: 'Id of the owner of the farm',
    required: true,
  })
  @IsInt({ message: 'producerId must be an integer' })
  @IsNotEmpty({ message: 'producerId is required' })
  @IsPositive({ message: 'producerId must be a positive number' })
  producerId: number;

  @ApiProperty({
    example: 'Farm sunset',
    description: 'Name of the farm',
    required: true,
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name is required' })
  @Length(3, 255, { message: 'name must be between 3 and 255 characters' })
  name: string;

  @ApiProperty({
    example: 'Manaus',
    description: 'City of the farm',
    required: true,
  })
  @IsString({ message: 'city must be a string' })
  @IsNotEmpty({ message: 'city is required' })
  @Length(3, 30, { message: 'city must be between 3 and 30 characters' })
  city: string;

  @ApiProperty({
    example: 'Amazonas',
    description: 'State of the farm',
    required: true,
  })
  @IsString({ message: 'state must be a string' })
  @IsNotEmpty({ message: 'state is required' })
  @Length(3, 30, { message: 'state must be between 3 and 30 characters' })
  state: string;

  @ApiProperty({
    example: '1000.00',
    description: 'Total area of the farm',
    required: true,
  })
  @IsNotEmpty({ message: 'totalArea is required' })
  @IsString({ message: 'totalArea must be a string' })
  @IsNonNegativeDecimal({ message: 'totalArea must be a decimal number' })
  totalArea: string;

  @ApiProperty({
    example: '500.00',
    description: 'Arable area of the farm',
    required: true,
  })
  @IsNotEmpty({ message: 'arableArea is required' })
  @IsString({ message: 'arableArea must be a string' })
  @IsNonNegativeDecimal({ message: 'arableArea must be a decimal number' })
  arableArea: string;

  @ApiProperty({
    example: '500.00',
    description: 'vegetation Area of the farm',
    required: true,
  })
  @IsNotEmpty({ message: 'vegetationArea is required' })
  @IsString({ message: 'vegetationArea must be a string' })
  @IsNonNegativeDecimal({ message: 'vegetationArea must be a decimal number' })
  vegetationArea: string;

  @ApiProperty({
    type: () => HarvestDTO,
    isArray: true,
    required: true,
    description: 'Harvests linked to the farm',
  })
  @ValidateNested({ each: true })
  @Type(() => HarvestDTO)
  harvests: HarvestDTO[];
}

export class HarvestDTO {
  @ApiProperty({
    example: '2025',
    description: 'Year of the harvest',
    required: true,
  })
  @IsInt({ message: 'year must be an integer' })
  @IsNotEmpty({ message: 'year is required' })
  @IsPositive({ message: 'year must be a positive number' })
  year: number;

  @ApiProperty({
    example: '1',
    description: 'Month of the harvest: eg. 1 = January',
    required: true,
  })
  @IsInt({ message: 'month must be an integer' })
  @IsNotEmpty({ message: 'month is required' })
  @IsPositive({ message: 'month must be a positive number' })
  @Min(1, { message: 'month must be at least 1' })
  @Max(12, { message: 'month must be at most 12' })
  month: number;

  @ApiHideProperty()
  @IsInt({ message: 'farmId must be an integer' })
  @IsOptional({ message: 'farmId is optional' })
  @IsPositive({ message: 'farmId must be a positive number' })
  farmId: number;

  @ApiProperty({
    type: () => CropDTO,
    isArray: true,
    required: true,
    description: 'Crops linked to the farm',
  })
  @ValidateNested({ each: true })
  @Type(() => CropDTO)
  crops: CropDTO[];
}

export class CropDTO {
  @ApiProperty({
    example: 'Corn',
    description: 'Name of the crop',
    required: true,
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name is required' })
  @Length(3, 255, { message: 'name must be between 3 and 255 characters' })
  name: string;

  @ApiHideProperty()
  @IsInt({ message: 'harvestId must be an integer' })
  @IsOptional({ message: 'harvestId is optional' })
  @IsPositive({ message: 'harvestId must be a positive number' })
  harvestId: number;
}

export class DeleteFarmDTO {
  @ApiProperty({
    example: 1,
    description: 'Id of the farm',
    required: true,
  })
  @IsInt({ message: 'farmId must be an integer' })
  @IsNotEmpty({ message: 'farmId is required' })
  @IsPositive({ message: 'farmId must be a positive number' })
  farmId: number;
}

export class DeleteHarvestDTO {
  @ApiProperty({
    example: 1,
    description: 'Id of the harvest',
    required: true,
  })
  @IsInt({ message: 'harvestId must be an integer' })
  @IsNotEmpty({ message: 'harvestId is required' })
  @IsPositive({ message: 'harvestId must be a positive number' })
  harvestId: number;
}

export class UpdateFarmDTO extends OmitType(FarmDTO, ['harvests', 'producerId']) {}
export class FindFarmDTO extends DeleteFarmDTO {}

export class CreateHarvestDTO extends OmitType(HarvestDTO, ['farmId']) {}
