import { Injectable } from '@nestjs/common';
import { ProducerMapper } from '../../adapters/mapper/producerMapper';
import { Producer } from '@producer/application/entities/producer';
import { IProducerRepository } from '@producer/application/interfaces/IProducerRepository';
import { FindProducer } from '@producer/application/interfaces/producerRequest';
import { PrismaService } from '@shared/database/prismaService';

@Injectable()
export class ProducerRepository implements IProducerRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Producer): Promise<Producer> {
    const producer = await this.prisma.producer.create({
      data: ProducerMapper.toDatabase(data),
    });

    return ProducerMapper.toDomain(producer);
  }

  async deleteProducer(producerId: number): Promise<void> {
    await this.prisma.producer.deleteMany({
      where: {
        id: producerId,
      },
    });
  }

  async findByParams(data: FindProducer): Promise<Producer | null> {
    const producer = await this.prisma.producer.findFirst({
      where: {
        OR: [{ cnpj: data.cnpj }, { cpf: data.cpf }, { name: data.name }],
      },
    });

    if (!producer) {
      return null;
    }

    return ProducerMapper.toDomain(producer);
  }

  async findByProducerId(producerId: number): Promise<Producer | null> {
    const producer = await this.prisma.producer.findUnique({
      where: {
        id: producerId,
      },
    });

    if (!producer) {
      return null;
    }

    return ProducerMapper.toDomain(producer);
  }
}
