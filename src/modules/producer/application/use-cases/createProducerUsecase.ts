import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { Producer } from '../entities/producer';
import { IProducerRepository } from '../interfaces/IProducerRepository';
import { ProducerInput } from '../interfaces/producerRequest';

@Injectable()
export class CreateProducerUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute(data: ProducerInput): Promise<Producer> {
    const isCpfValid = data.cpf && cpf.isValid(data.cpf);
    const isCnpjValid = data.cnpj && cnpj.isValid(data.cnpj);

    if (!isCpfValid && !isCnpjValid) {
      throw new UnprocessableEntityException('You must provide a valid CPF or CNPJ');
    }

    const producerExist = await this.producerRepository.findByParams(data);

    if (producerExist) {
      throw new ConflictException('Producer already exists');
    }

    const producer = new Producer(data);

    return await this.producerRepository.create(producer);
  }
}
