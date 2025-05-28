import { Injectable } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/IFarmRepository';

@Injectable()
export class DeleteHarvestUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(harvestId: number): Promise<void> {
    await this.farmRepository.deleteHarvest(harvestId);
  }
}
