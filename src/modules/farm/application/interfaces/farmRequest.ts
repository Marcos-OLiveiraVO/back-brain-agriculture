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
  crops: CropInput[];
}

export interface CreateHarvestInput {
  harvests: HarvestInput[];
  farmId: number;
}

export interface CropInput {
  name: string;
  harvestId: number;
}

export interface CreateCropInput {
  name: string[];
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

export interface UpdateHarvestInput {
  id: number;
  year: number;
  month: number;
}

export interface GetStatisticsOutput {
  totalFarms: number;
  totalHectares: Decimal;
  byState: { state: string; total: number }[];
  byCrop: { crop: string; total: number }[];
  bySoilUsage: {
    totalArable: Decimal;
    totalVegetation: Decimal;
  };
}
