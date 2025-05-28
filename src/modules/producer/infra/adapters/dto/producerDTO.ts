import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { AtLeastOneField } from '@shared/utils/decorators/oneFieldNecessary';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

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
    example: '89589538000197',
    description: 'Producer CNPJ. Either CNPJ or CPF must be provided.',
    required: false,
    pattern: '^[0-9]{14}$',
  })
  @IsString({ message: 'cnpj must be a string' })
  @IsOptional({ message: 'cnpj is optional' })
  @Length(14, 14, { message: 'cnpj must be 14 characters' })
  cnpj?: string;

  @ApiProperty({
    example: '03949136045',
    description: 'Producer CPF. Either CPF or CNPJ must be provided.',
    required: false,
    pattern: '^[0-9]{11}$',
  })
  @IsString({ message: 'cpf must be a string' })
  @IsOptional({ message: 'cpf is optional' })
  @Length(11, 11, { message: 'cpf must be 11 characters' })
  cpf?: string;

  @ApiHideProperty()
  @AtLeastOneField(['cnpj', 'cpf'], { message: 'At least one field is required' })
  dummyValidationField: string;
}
