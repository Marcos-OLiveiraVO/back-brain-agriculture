import { Injectable, NotFoundException } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/IFarmRepository';
import { UpdateHarvestInput } from '../interfaces/farmRequest';
import { Harvest } from '../entities/harvest';

@Injectable()
export class UpdateHarvestUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(data: UpdateHarvestInput): Promise<Harvest> {
    const harvestExists = await this.farmRepository.findHarvestById(data);

    if (!harvestExists) {
      throw new NotFoundException('Harvest not found');
    }

    return await this.farmRepository.updateHarvest(data);
  }
}
