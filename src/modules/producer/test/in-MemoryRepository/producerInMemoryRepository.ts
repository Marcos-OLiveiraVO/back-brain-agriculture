import { Producer } from '@producer/application/entities/producer';
import { IProducerRepository } from '@producer/application/interfaces/IProducerRepository';
import { FindProducer, UpdateProducerInput } from '@producer/application/interfaces/producerRequest';

export class ProducerInMemoryRepository implements IProducerRepository {
  producers = new Map<number, Producer>();

  async create(data: Producer): Promise<Producer> {
    const ids = [...this.producers.keys()];
    const id = ids.length > 0 ? Math.max(...ids) + 1 : 1;

    data.id = id;
    return this.producers.set(id, data).get(id)!;
  }

  async updateProducer(data: UpdateProducerInput): Promise<Producer> {
    const producer = this.producers.get(data.producerId);
    Object.assign(producer!, data);

    const updatedProducer = this.producers.set(data.producerId, producer!).get(data.producerId);

    return updatedProducer as Producer;
  }

  async deleteProducer(producerId: number): Promise<void> {
    this.producers.delete(producerId);
  }

  async findByParams(data: FindProducer): Promise<Producer | null> {
    const producer = [...this.producers.values()].find(
      producer =>
        producer.name === data.name || producer.cpf === data.cpf || producer.cnpj === data.cnpj || producer.id === data.id,
    );

    return producer || null;
  }

  async findByProducerId(producerId: number): Promise<Producer | null> {
    const producer = this.producers.get(producerId);

    return producer || null;
  }
}
