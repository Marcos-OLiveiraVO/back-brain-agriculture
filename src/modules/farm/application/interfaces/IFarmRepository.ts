import { Crop } from '../entities/crop';
import { Farm } from '../entities/farm';
import { Harvest } from '../entities/harvest';
import { FindFarm, UpdateFarmRepositoryInput } from './farmRequest';

export abstract class IFarmRepository {
  abstract createFarm(data: Farm): Promise<Farm>;
  abstract createHarvest(data: Harvest[]): Promise<void>;
  abstract createCrop(data: Crop[]): Promise<void>;
  abstract updateFarm(data: UpdateFarmRepositoryInput): Promise<Farm>;
  abstract findByParams(data: FindFarm): Promise<Farm | null>;
  abstract deleteFarm(farmId: number): Promise<void>;
  abstract deleteHarvest(harvestId: number): Promise<void>;
}
