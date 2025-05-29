import { Crop } from '@farm/application/entities/crop';
import { Farm } from '@farm/application/entities/farm';
import { Harvest } from '@farm/application/entities/harvest';
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
  totalArea: Decimal(1000.0),
  arableArea: Decimal(500.0),
  vegetationArea: Decimal(500.0),
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
