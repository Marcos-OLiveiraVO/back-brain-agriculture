import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Producer } from '../entities/producer';
import { IProducerRepository } from '../interfaces/IProducerRepository';
import { ProducerInput } from '../interfaces/producerRequest';
import { ValidateDocument } from '@shared/utils/functions/validateDocument';

@Injectable()
export class CreateProducerUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute(data: ProducerInput): Promise<Producer> {
    ValidateDocument(data);

    const producerExist = await this.producerRepository.findByParams(data);

    if (producerExist) {
      throw new ConflictException('Producer already exists with this cnpj or cpf exists');
    }

    const producer = new Producer(data);

    return await this.producerRepository.create(producer);
  }
}
