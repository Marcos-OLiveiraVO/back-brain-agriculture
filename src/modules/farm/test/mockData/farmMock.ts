import { Crop } from '@farm/application/entities/crop';
import { Farm } from '@farm/application/entities/farm';
import { Harvest } from '@farm/application/entities/harvest';
import { FarmInput, UpdateHarvestInput } from '@farm/application/interfaces/farmRequest';
import { Decimal } from '@prisma/client/runtime/library';

export const cropEntityMock = new Crop({
  harvestId: 1,
  name: 'Corn',
});

export const CropEntityMock = new Crop({
  harvestId: 1,
  name: 'Corn',
});

export const HarvestEntityMock = new Harvest({
  farmId: 1,
  year: 2025,
  month: 1,
  Crop: [CropEntityMock],
});

export const FarmEntityMock = new Farm({
  producerId: 1,
  name: 'Farm sunshine',
  city: 'Manaus',
  state: 'Amazonas',
  totalArea: Decimal(1000),
  arableArea: Decimal(500),
  vegetationArea: Decimal(500),
  Harvest: [HarvestEntityMock],
});

export const HarvestInputBaseMock = {
  year: 2024,
  month: 10,
  crops: [
    { name: 'Soja', harvestId: 1 },
    { name: 'Milho', harvestId: 1 },
  ],
};

export const FarmBaseWrongMock: FarmInput = {
  producerId: 1,
  name: 'Farm sunshine',
  city: 'Manaus',
  state: 'Amazonas',
  totalArea: '1000',
  arableArea: '5000',
  vegetationArea: '5000',
  harvests: [HarvestInputBaseMock],
};

export const FarmBaseMock: FarmInput = {
  producerId: 1,
  name: 'Farm sunshine',
  city: 'Manaus',
  state: 'Amazonas',
  totalArea: '1000',
  arableArea: '500',
  vegetationArea: '500',
  harvests: [HarvestInputBaseMock],
};

export const wrongUpdateHarvest: UpdateHarvestInput = {
  id: 10,
  year: 2025,
  month: 1,
};
