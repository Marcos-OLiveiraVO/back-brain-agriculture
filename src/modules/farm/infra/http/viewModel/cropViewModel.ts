import { Crop } from 'modules/farm/application/entities/crop';

export class CropViewModel {
  static toHttp(crop: Crop) {
    return {
      id: crop.id,
      name: crop.name,
      harvestId: crop.harvestId,
      createdAt: crop.createdAt,
      updatedAt: crop.updatedAt,
    };
  }
}
