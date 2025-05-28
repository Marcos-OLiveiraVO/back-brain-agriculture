import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Crop } from '../entities/crop';
import { CreateCropInput } from '../interfaces/farmRequest';
import { IFarmRepository } from '../interfaces/IFarmRepository';

@Injectable()
export class CreateCropUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(data: CreateCropInput): Promise<Crop[]> {
    const harvestExists = await this.farmRepository.findHarvestById({ id: data.harvestId });

    if (!harvestExists) {
      throw new NotFoundException('Harvest not found');
    }

    const existingCrops = await this.farmRepository.findCropsByNamesAndHarvest(data);
    const existingNames = new Set(existingCrops.map(c => c));

    const cropsToCreate = data.name
      .filter(name => !existingNames.has(name))
      .map(name => new Crop({ name, harvestId: data.harvestId }));

    if (!cropsToCreate.length) {
      throw new ConflictException('All crops already exist');
    }

    return await this.farmRepository.createCrop(cropsToCreate);
  }
}
