import { ConflictException, Injectable } from '@nestjs/common';
import { Farm } from '../entities/farm';
import { validateArea } from '@shared/utils/functions/validateArea';
import { FarmInput } from '../interfaces/farmRequest';
import { IFarmRepository } from '../interfaces/IFarmRepository';
import { CreateHarvestUsecase } from './createHarvestUsecase';
import { CreateCropUsecase } from './createCropUsecase';

@Injectable()
export class CreateFarmUseCase {
  constructor(
    private farmRepository: IFarmRepository,
    private createHarvestUseCase: CreateHarvestUsecase,
    private createCropUseCase: CreateCropUsecase,
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

    const harvestPromise = this.createHarvestUseCase.execute(data.harvests);
    const cropPromise = this.createCropUseCase.execute(data.crops);

    await Promise.all([harvestPromise, cropPromise]);

    return await this.farmRepository.findByParams(farmCreated)!;
  }
}
