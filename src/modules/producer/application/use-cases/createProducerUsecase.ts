import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Producer } from '../entities/producer';
import { IProducerRepository } from '../interfaces/IProducerRepository';
import { ProducerInput } from '../interfaces/producerRequest';

@Injectable()
export class CreateProducerUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute(data: ProducerInput): Promise<Producer> {
    const atLeastOneField = data.cnpj || data.cpf;

    if (!atLeastOneField) {
      throw new UnprocessableEntityException('At least one field is required');
    }

    const producerExist = await this.producerRepository.findByParams(data);

    if (producerExist) {
      throw new ConflictException('Producer already exists');
    }

    const producer = new Producer(data);

    return await this.producerRepository.create(producer);
  }
}
