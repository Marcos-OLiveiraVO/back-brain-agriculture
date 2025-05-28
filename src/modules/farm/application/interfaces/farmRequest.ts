export interface FarmInput {
  name: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  producerId: number;
  harvests: HarvestInput[];
  crops: CropInput[];
}

export interface HarvestInput {
  year: number;
  month: number;
  farmId: number;
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
