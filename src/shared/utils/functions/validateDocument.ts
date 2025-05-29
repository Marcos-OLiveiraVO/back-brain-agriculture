import { UnprocessableEntityException } from '@nestjs/common';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { DocumentInput } from '../globalRequest';

export function ValidateDocument(data: DocumentInput) {
  const hasCpf = !!data.cpf;
  const hasCnpj = !!data.cnpj;

  if (!hasCpf && !hasCnpj) {
    throw new UnprocessableEntityException('You must provide at least a CPF or a CNPJ');
  }

  if (hasCpf && !cpf.isValid(data.cpf!)) {
    throw new UnprocessableEntityException('Invalid CPF');
  }

  if (hasCnpj && !cnpj.isValid(data.cnpj!)) {
    throw new UnprocessableEntityException('Invalid CNPJ');
  }
}
