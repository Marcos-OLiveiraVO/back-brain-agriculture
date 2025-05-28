import { Injectable } from '@nestjs/common';
import { IProducerRepository } from '../interfaces/IProducerRepository';

@Injectable()
export class DeleteProducerUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute(producerId: number): Promise<void> {
    await this.producerRepository.deleteProducer(producerId);
  }
}
