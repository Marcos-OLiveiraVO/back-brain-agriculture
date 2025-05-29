import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { IProducerRepository } from '../interfaces/IProducerRepository';
import { Producer } from '../entities/producer';
import { UpdateProducerInput } from '../interfaces/producerRequest';
import { ValidateDocument } from '@shared/utils/functions/validateDocument';

@Injectable()
export class UpdateProducerUseCase {
  constructor(private producerRepository: IProducerRepository) {}

  async execute(data: UpdateProducerInput): Promise<Producer> {
    const existingProducer = await this.producerRepository.findByParams({ id: data.producerId });

    if (!existingProducer) {
      throw new NotFoundException('Producer not found');
    }

    ValidateDocument(data);

    const documentChanged = (data.cpf && data.cpf !== existingProducer.cpf) || (data.cnpj && data.cnpj !== existingProducer.cnpj);

    if (documentChanged) {
      const otherProducer = await this.producerRepository.findByParams({
        cpf: data.cpf,
        cnpj: data.cnpj,
      });

      if (otherProducer && otherProducer.id !== data.producerId) {
        throw new UnprocessableEntityException('Another producer already uses this CPF or CNPJ');
      }
    }

    return await this.producerRepository.updateProducer(data);
  }
}
