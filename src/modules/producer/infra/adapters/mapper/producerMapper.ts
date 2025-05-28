import { Injectable } from '@nestjs/common';
import { producer } from '@prisma/client';
import { Producer } from '@producer/application/entities/producer';

@Injectable()
export class ProducerMapper {
  static toDatabase(entity: Producer): producer {
    return {
      id: entity.id!,
      name: entity.name,
      cnpj: entity.cnpj!,
      cpf: entity.cpf!,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }
  static toDomain(entity: producer): Producer {
    return new Producer(
      {
        name: entity.name,
        cnpj: entity.cnpj!,
        cpf: entity.cpf!,
        createdAt: entity.createdAt!,
        updatedAt: entity.updatedAt!,
      },
      entity.id,
    );
  }
}
