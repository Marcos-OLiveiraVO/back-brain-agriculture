import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class ProducerDTO {
  @ApiProperty({
    example: 'João Silva',
    description: 'Full name of the producer',
    required: true,
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name is required' })
  @Length(3, 255, { message: 'name must be between 3 and 255 characters' })
  name: string;

  @ApiProperty({
    example: '32936337000100',
    description: 'Producer CNPJ. Either CNPJ or CPF must be provided.',
    required: false,
    pattern: '^[0-9]{14}$',
  })
  @IsString({ message: 'cnpj must be a string' })
  @IsOptional({ message: 'cnpj is optional' })
  @Length(14, 14, { message: 'cnpj must be 14 characters' })
  cnpj?: string;

  @ApiProperty({
    example: '94756224032',
    description: 'Producer CPF. Either CPF or CNPJ must be provided.',
    required: false,
    pattern: '^[0-9]{11}$',
  })
  @IsString({ message: 'cpf must be a string' })
  @IsOptional({ message: 'cpf is optional' })
  @Length(11, 11, { message: 'cpf must be 11 characters' })
  cpf?: string;
}

export class DeleteProducerDTO {
  @ApiProperty({
    example: 1,
    description: 'Producer ID',
    required: true,
  })
  @IsNotEmpty({ message: 'id is required' })
  @IsInt({ message: 'id must be an integer' })
  @IsPositive({ message: 'id must be a positive number' })
  id: number;
}

export class UpdateProducerDTO extends ProducerDTO {}
export class FindProducerDTO extends DeleteProducerDTO {}
