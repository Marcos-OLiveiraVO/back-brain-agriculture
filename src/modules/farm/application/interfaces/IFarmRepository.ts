import { Crop } from '../entities/crop';
import { Farm } from '../entities/farm';
import { Harvest } from '../entities/harvest';
import { CreateCropInput, FindFarm, GetStatisticsOutput, UpdateFarmRepositoryInput, UpdateHarvestInput } from './farmRequest';

export abstract class IFarmRepository {
  abstract createFarm(data: Farm): Promise<Farm>;
  abstract createHarvest(data: Harvest[]): Promise<Harvest[]>;
  abstract createCrop(data: Crop[]): Promise<Crop[]>;
  abstract updateFarm(data: UpdateFarmRepositoryInput): Promise<Farm>;
  abstract updateHarvest(data: UpdateHarvestInput): Promise<Harvest>;
  abstract findByParams(data: FindFarm): Promise<Farm | null>;
  abstract findHarvestById(data: FindFarm): Promise<boolean | null>;
  abstract findCropsByNamesAndHarvest(data: CreateCropInput): Promise<string[]>;
  abstract findStatistics(): Promise<GetStatisticsOutput>;
  abstract deleteFarm(farmId: number): Promise<void>;
  abstract deleteHarvest(harvestId: number): Promise<void>;
  abstract deleteCrop(cropId: number): Promise<void>;
}
