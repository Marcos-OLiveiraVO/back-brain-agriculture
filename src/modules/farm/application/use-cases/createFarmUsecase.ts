import { ConflictException, Injectable } from '@nestjs/common';
import { Farm } from '../entities/farm';
import { validateArea } from '@shared/utils/functions/validateArea';
import { FarmInput, HarvestInput } from '../interfaces/farmRequest';
import { IFarmRepository } from '../interfaces/IFarmRepository';
import { CreateHarvestUsecase } from './createHarvestUsecase';

@Injectable()
export class CreateFarmUseCase {
  constructor(
    private farmRepository: IFarmRepository,
    private createHarvestUseCase: CreateHarvestUsecase,
  ) {}

  async execute(data: FarmInput): Promise<Farm | null> {
    const limitArea = validateArea(data);

    const farmExists = await this.farmRepository.findByParams(data);

    if (farmExists) {
      throw new ConflictException('Farm already exists');
    }

    const farm = new Farm({
      ...data,
      totalArea: limitArea.totalArea,
      arableArea: limitArea.arableArea,
      vegetationArea: limitArea.vegetationArea,
    });

    const farmCreated = await this.farmRepository.createFarm(farm);

    const harvestWithFarmId = data.harvests.map(harvest => {
      return {
        ...harvest,
        farmId: farmCreated!.id,
      };
    }) as HarvestInput[];

    await this.createHarvestUseCase.execute(harvestWithFarmId);

    return await this.farmRepository.findByParams(farmCreated);
  }
}
