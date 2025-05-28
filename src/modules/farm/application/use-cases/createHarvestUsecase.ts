import { Injectable } from '@nestjs/common';
import { HarvestInput } from '../interfaces/farmRequest';
import { IFarmRepository } from '../interfaces/IFarmRepository';
import { Harvest } from '../entities/harvest';

@Injectable()
export class CreateHarvestUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(data: HarvestInput[]): Promise<void> {
    const harvest = data.map(crop => new Harvest(crop));

    await this.farmRepository.createHarvest(harvest);
  }
}
