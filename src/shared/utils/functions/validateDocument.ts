import { UnprocessableEntityException } from '@nestjs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { DocumentInput } from '../globalRequest';

export function ValidateDocument(data: DocumentInput) {
  const isCpfValid = data.cpf && cpf.isValid(data.cpf);
  const isCnpjValid = data.cnpj && cnpj.isValid(data.cnpj);

  if (!isCpfValid && !isCnpjValid) {
    throw new UnprocessableEntityException('You must provide a valid CPF or CNPJ');
  }
}
