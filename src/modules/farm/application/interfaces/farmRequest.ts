import { farm, producer, Prisma } from '@prisma/client';

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
  name: string;
  city: string;
  state: string;
}

export interface FarmDomainMapperInput extends farm {
  Producer?: producer;
  Harvest?: Prisma.harvestGetPayload<{ include: { Crop: true } }>[];
}
