import { Crop } from '../entities/crop';
import { Farm } from '../entities/farm';
import { Harvest } from '../entities/harvest';
import { FindFarm } from './farmRequest';

export abstract class IFarmRepository {
  abstract createFarm(data: Farm): Promise<Farm>;
  abstract createHarvest(data: Harvest[]): Promise<void>;
  abstract createCrop(data: Crop[]): Promise<void>;
  abstract findByParams(data: FindFarm): Promise<Farm | null>;
}
