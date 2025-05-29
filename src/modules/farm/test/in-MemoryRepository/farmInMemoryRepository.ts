import { Crop } from '@farm/application/entities/crop';
import { Harvest } from '@farm/application/entities/harvest';
import { Farm } from 'modules/farm/application/entities/farm';
import { IFarmRepository } from 'modules/farm/application/interfaces/IFarmRepository';
import {
  UpdateFarmRepositoryInput,
  UpdateHarvestInput,
  FindFarm,
  CreateCropInput,
  GetStatisticsOutput,
} from 'modules/farm/application/interfaces/farmRequest';

export class FarmRepositoryInMemory implements IFarmRepository {
  Farm = new Map<number, Farm>();
  Crop = new Map<number, Crop>();
  Harvest = new Map<number, Harvest>();

  private getNextId(map: Map<number, unknown>): number {
    return map.size ? Math.max(...map.keys()) + 1 : 1;
  }

  async createFarm(data: Farm): Promise<Farm> {
    const id = this.getNextId(this.Farm);

    data.id = id;
    return this.Farm.set(id, data).get(id)!;
  }

  async createHarvest(data: Harvest[]): Promise<Harvest[]> {
    const harvests = data.map(harvest => {
      const harvestId = this.getNextId(this.Harvest);
      const newHarvest = new Harvest(
        {
          Crop: [],
          farmId: harvest.farmId,
          month: harvest.month,
          year: harvest.year,
        },
        harvestId,
      );

      this.Harvest.set(harvestId, newHarvest);

      harvest.Crop?.forEach(crop => {
        const cropId = this.getNextId(this.Crop);
        const newCrop = new Crop({ harvestId: harvestId, name: crop.name }, cropId);

        this.Crop.set(cropId, newCrop);
        newHarvest.Crop?.push(newCrop);
      });

      return newHarvest;
    });

    return harvests;
  }

  async createCrop(data: Crop[]): Promise<Crop[]> {
    const crops = data.map(crop => {
      const id = this.getNextId(this.Crop);
      crop.id = id;

      return this.Crop.set(id, crop).get(id)!;
    });

    return crops;
  }

  async updateFarm(data: UpdateFarmRepositoryInput): Promise<Farm> {
    const farm = this.Farm.get(data.id)!;

    Object.assign(farm, data);

    return this.Farm.set(data.id, farm).get(data.id)!;
  }

  async updateHarvest(data: UpdateHarvestInput): Promise<Harvest> {
    const harvest = this.Harvest.get(data.id)!;

    Object.assign(harvest, data);

    return this.Harvest.set(data.id, harvest).get(data.id)!;
  }

  async findByParams(data: FindFarm): Promise<Farm | null> {
    const farm = [...this.Farm.values()].find(
      farm => (farm.name === data.name && farm.city === data.city && farm.state === data.state) || farm.id === data.id,
    );

    return farm ? farm : null;
  }

  async findHarvestById(data: FindFarm): Promise<boolean | null> {
    const harvest = this.Harvest.get(data.id!);

    return harvest ? true : false;
  }

  async findCropsByNamesAndHarvest(data: CreateCropInput): Promise<string[]> {
    const crops = [...this.Crop.values()].filter(crop => data.name.includes(crop.name) && crop.harvestId === data.harvestId);

    return crops.map(crop => crop.name);
  }

  findStatistics(): Promise<GetStatisticsOutput> {
    throw new Error('Method not implemented.');
  }

  async deleteFarm(farmId: number): Promise<void> {
    this.Farm.delete(farmId);
  }

  async deleteHarvest(harvestId: number): Promise<void> {
    this.Harvest.delete(harvestId);
  }

  async deleteCrop(cropId: number): Promise<void> {
    this.Crop.delete(cropId);
  }
}
