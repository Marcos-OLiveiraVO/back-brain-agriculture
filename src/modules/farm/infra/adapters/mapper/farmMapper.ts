import { farm, Prisma, producer } from '@prisma/client';
import { ProducerMapper } from '@producer/infra/adapters/mapper/producerMapper';
import { Farm } from 'modules/farm/application/entities/farm';

export interface FarmDomainMapperInput extends farm {
  Producer?: producer;
  Harvest?: Prisma.harvestGetPayload<{ include: { Crop: true } }>[];
}

export class FarmMapper {
  static toDomain(model: FarmDomainMapperInput): Farm {
    return new Farm(
      {
        name: model.name,
        city: model.city,
        state: model.state,
        totalArea: model.totalArea,
        arableArea: model.arableArea,
        vegetationArea: model.vegetationArea,
        producerId: model.producerId,
        createdAt: model.createdAt!,
        updatedAt: model.updatedAt!,
        Producer: model.Producer ? ProducerMapper.toDomain(model.Producer) : undefined,
      },
      model.id,
    );
  }
  static toDatabase(entity: Farm): Prisma.farmUncheckedCreateInput {
    return {
      name: entity.name,
      city: entity.city,
      state: entity.state,
      totalArea: entity.totalArea,
      arableArea: entity.arableArea,
      vegetationArea: entity.vegetationArea,
      producerId: entity.producerId,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }
}
