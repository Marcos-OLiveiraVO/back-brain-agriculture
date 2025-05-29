import { NotFoundException } from '@nestjs/common';
import { FarmRepositoryInMemory } from '../in-MemoryRepository/farmInMemoryRepository';
import { FarmEntityMock, HarvestEntityMock, HarvestInputBaseMock } from '../mockData/farmMock';
import { CreateHarvestUsecase } from '@farm/application/use-cases/createHarvestUsecase';

describe('Create harvest use case', () => {
  let farmRepository: FarmRepositoryInMemory;
  let createHarvest: CreateHarvestUsecase;

  beforeEach(() => {
    farmRepository = new FarmRepositoryInMemory();
    createHarvest = new CreateHarvestUsecase(farmRepository);
  });

  it('should create new harvest if they do not exist yet', async () => {
    const farm = await farmRepository.createFarm(FarmEntityMock);

    const harvestInput = {
      farmId: farm.id,
      harvests: HarvestInputBaseMock,
    };

    const [createdHarvest] = await createHarvest.execute({
      harvests: [harvestInput.harvests],
      farmId: harvestInput.farmId!,
    });

    const cropNames = createdHarvest.Crop?.map(crop => crop.name);

    expect(cropNames).toEqual(expect.arrayContaining(['Soja', 'Milho']));
    expect(createdHarvest.farmId).toEqual(harvestInput.farmId);
  });

  it('should be able to throw and notFoundException if farm not found', async () => {
    await expect(
      createHarvest.execute({
        harvests: [HarvestInputBaseMock],
        farmId: 999,
      }),
    ).rejects.toEqual(new NotFoundException('Farm not found'));
  });
});
