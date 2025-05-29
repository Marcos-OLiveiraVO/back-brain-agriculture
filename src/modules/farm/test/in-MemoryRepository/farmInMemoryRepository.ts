import { Crop } from '@farm/application/entities/crop';
import { Harvest } from '@farm/application/entities/harvest';
import { Decimal } from '@prisma/client/runtime/library';
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
        console.log(' :cegou');
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

  async findStatistics(): Promise<GetStatisticsOutput> {
    const farms = [...this.Farm.values()];
    const crops = [...this.Crop.values()];
    console.log('crops :', crops);

    const totalFarms = farms.length;
    const totalHectares = farms.reduce((acc, farm) => acc.plus(farm.totalArea ?? 0), new Decimal(0));
    const totalArable = farms.reduce((acc, farm) => acc.plus(farm.arableArea ?? 0), new Decimal(0));
    const totalVegetation = farms.reduce((acc, farm) => acc.plus(farm.vegetationArea ?? 0), new Decimal(0));

    const farmsByStateMap = new Map<string, number>();
    for (const farm of farms) {
      const current = farmsByStateMap.get(farm.state) ?? 0;
      farmsByStateMap.set(farm.state, current + 1);
    }

    const cropsByNameMap = new Map<string, number>();
    for (const crop of crops) {
      const current = cropsByNameMap.get(crop.name) ?? 0;
      cropsByNameMap.set(crop.name, current + 1);
    }

    const byState = [...farmsByStateMap.entries()].map(([state, total]) => ({ state, total }));
    const byCrop = [...cropsByNameMap.entries()].map(([crop, total]) => ({ crop, total }));

    return {
      totalFarms,
      totalHectares,
      byState,
      byCrop,
      bySoilUsage: {
        totalArable,
        totalVegetation,
      },
    };
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
