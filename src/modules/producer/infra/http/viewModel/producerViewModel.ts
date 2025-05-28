import { Producer } from '@producer/application/entities/producer';

export class ProducerViewModel {
  static toHttp(entity: Producer) {
    return {
      id: entity.id,
      name: entity.name,
      cnpj: entity.cnpj,
      cpf: entity.cpf,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
