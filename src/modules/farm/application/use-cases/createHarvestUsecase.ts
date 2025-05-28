import { Injectable } from '@nestjs/common';
import { HarvestInput } from '../interfaces/farmRequest';
import { IFarmRepository } from '../interfaces/IFarmRepository';
import { Harvest } from '../entities/harvest';
import { Crop } from '../entities/crop';

@Injectable()
export class CreateHarvestUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(data: HarvestInput[]): Promise<void> {
    const harvest = data.map(harvest => {
      return new Harvest({
        ...harvest,
        Crop: harvest.crops.map(crop => new Crop(crop)),
      });
    });

    await this.farmRepository.createHarvest(harvest);
  }
}
