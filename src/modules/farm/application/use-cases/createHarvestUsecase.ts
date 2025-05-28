import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHarvestInput } from '../interfaces/farmRequest';
import { IFarmRepository } from '../interfaces/IFarmRepository';
import { Harvest } from '../entities/harvest';
import { Crop } from '../entities/crop';

@Injectable()
export class CreateHarvestUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(data: CreateHarvestInput): Promise<Harvest[]> {
    const farmExists = await this.farmRepository.findByParams({ id: data.farmId });

    if (!farmExists) {
      throw new NotFoundException('Farm not found');
    }

    const harvest = data.harvests.map(harvest => {
      return new Harvest({
        ...harvest,
        Crop: harvest.crops.map(crop => new Crop(crop)),
        farmId: data.farmId,
      });
    });

    return await this.farmRepository.createHarvest(harvest);
  }
}
