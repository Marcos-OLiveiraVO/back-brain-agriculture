import { farm, producer, Prisma, harvest } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface FarmInput {
  name: string;
  city: string;
  state: string;
  totalArea: string;
  arableArea: string;
  vegetationArea: string;
  producerId: number;
  harvests: HarvestInput[];
}

export interface UpdateFarmInput
  extends Omit<FarmInput, 'harvests' | 'producerId' | 'totalArea' | 'arableArea' | 'vegetationArea'> {
  totalArea: string;
  arableArea: string;
  vegetationArea: string;
  id: number;
}

export interface UpdateFarmRepositoryInput extends Omit<UpdateFarmInput, 'totalArea' | 'arableArea' | 'vegetationArea'> {
  totalArea: Decimal;
  arableArea: Decimal;
  vegetationArea: Decimal;
  id: number;
}

export interface HarvestInput {
  year: number;
  month: number;
  farmId: number;
  crops: CropInput[];
}

export interface CropInput {
  name: string;
  harvestId: number;
}

export interface FindFarm {
  name?: string;
  city?: string;
  state?: string;
  id?: number;
}

export interface FarmDomainMapperInput extends farm {
  Producer?: producer;
  Harvest?: Prisma.harvestGetPayload<{ include: { Crop: true } }>[];
}

export interface HarvestDomainMapperInput extends harvest {
  Crop?: Prisma.cropGetPayload<{ include: { Harvest: true } }>[];
}
