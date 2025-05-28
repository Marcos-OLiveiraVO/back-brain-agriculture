import { Prisma } from '@prisma/client';
import { Harvest } from 'modules/farm/application/entities/harvest';
import { CropMapper } from './cropMapper';
import { HarvestDomainMapperInput } from 'modules/farm/application/interfaces/farmRequest';

export class HarvestMapper {
  static toDomain(model: HarvestDomainMapperInput): Harvest {
    return new Harvest(
      {
        year: model.year,
        month: model.month!,
        farmId: model.farmId,
        createdAt: model.createdAt!,
        updatedAt: model.updatedAt!,
        Crop: model.Crop ? model.Crop.map(CropMapper.toDomain) : undefined,
      },
      model.id,
    );
  }
  static toDatabase(harvest: Harvest): Prisma.harvestUncheckedCreateInput {
    return {
      id: harvest.id,
      year: harvest.year,
      month: harvest.month,
      farmId: harvest.farmId,
      createdAt: harvest.createdAt,
      updatedAt: harvest.updatedAt,
    };
  }
}
