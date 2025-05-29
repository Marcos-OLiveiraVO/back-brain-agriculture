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

    const cpfChanged = data.cpf && existingProducer.cpf !== data.cpf;
    const cnpjChanged = data.cnpj && existingProducer.cnpj !== data.cnpj;

    if (cpfChanged || cnpjChanged) {
      const otherProducer = await this.producerRepository.findByParams({
        cpf: data.cpf,
        cnpj: data.cnpj,
      });

      const isSameProducer = otherProducer?.id === data.producerId;

      if (otherProducer && !isSameProducer) {
        throw new UnprocessableEntityException('Another producer already uses this CPF or CNPJ');
      }
    }

    return await this.producerRepository.updateProducer(data);
  }
}
