import { ConflictException, Injectable } from '@nestjs/common';
import { Farm } from '../entities/farm';
import { validateArea } from '@shared/utils/functions/validateArea';
import { FarmInput } from '../interfaces/farmRequest';
import { IFarmRepository } from '../interfaces/IFarmRepository';
import { CreateHarvestUsecase } from './createHarvestUsecase';
import { IProducerRepository } from '@producer/application/interfaces/IProducerRepository';

@Injectable()
export class CreateFarmUseCase {
  constructor(
    private farmRepository: IFarmRepository,
    private producerRepository: IProducerRepository,
    private createHarvestUseCase: CreateHarvestUsecase,
  ) {}

  async execute(data: FarmInput): Promise<Farm | null> {
    const producerExists = await this.producerRepository.findByProducerId(data.producerId);

    if (!producerExists) {
      throw new ConflictException('Producer does not exist, please sign up it first');
    }

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

    await this.createHarvestUseCase.execute({
      farmId: farmCreated!.id!,
      harvests: data.harvests,
    });

    return await this.farmRepository.findByParams(farmCreated);
  }
}
