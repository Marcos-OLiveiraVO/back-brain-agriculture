import { crop, Prisma } from '@prisma/client';
import { Crop } from 'modules/farm/application/entities/crop';

export class CropMapper {
  static toDomain(model: crop): Crop {
    return new Crop(
      {
        name: model.name,
        harvestId: model.harvestId,
        createdAt: model.createdAt!,
        updatedAt: model.updatedAt!,
      },
      model.id,
    );
  }
  static toDatabase(crop: Crop): Prisma.cropUncheckedCreateInput {
    return {
      id: crop.id,
      name: crop.name,
      harvestId: crop.harvestId,
      createdAt: crop.createdAt,
      updatedAt: crop.updatedAt,
    };
  }
}
