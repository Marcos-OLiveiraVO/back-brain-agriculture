import { AtLeastOneField } from '@shared/utils/decorators/oneFieldNecessary';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class ProducerDTO {
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name is required' })
  @Length(3, 255, { message: 'name must be between 3 and 255 characters' })
  name: string;

  @IsString({ message: 'cnpj must be a string' })
  @IsOptional({ message: 'cnpj is optional' })
  @Length(14, 14, { message: 'cnpj must be 14 characters' })
  cnpj?: string;

  @IsString({ message: 'cpf must be a string' })
  @IsOptional({ message: 'cpf is optional' })
  @Length(11, 11, { message: 'cpf must be 11 characters' })
  cpf?: string;

  @AtLeastOneField(['cnpj', 'cpf'], { message: 'At least one field is required' })
  dummyValidationField: string;
}
