import { Harvest } from 'modules/farm/application/entities/harvest';
import { CropViewModel } from './cropViewModel';

export class HarvestViewModel {
  static toHttp(harvest: Harvest) {
    return {
      id: harvest.id,
      year: harvest.year,
      month: harvest.month,
      farmId: harvest.farmId,
      createdAt: harvest.createdAt,
      updatedAt: harvest.updatedAt,
      crops: harvest.Crop ? harvest.Crop.map(crop => CropViewModel.toHttp(crop)) : undefined,
    };
  }
}
