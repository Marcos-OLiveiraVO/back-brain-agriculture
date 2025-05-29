import { UpdateHarvestInput } from '@farm/application/interfaces/farmRequest';
import { FarmRepositoryInMemory } from '../in-MemoryRepository/farmInMemoryRepository';
import { HarvestEntityMock, wrongUpdateHarvest } from '../mockData/farmMock';
import { UpdateHarvestUsecase } from '@farm/application/use-cases/updateHarvestUsecase';
import { Harvest } from '@farm/application/entities/harvest';
import { NotFoundException } from '@nestjs/common';

describe('Update farm use case', () => {
  let farmRepository: FarmRepositoryInMemory;
  let updateHarvest: UpdateHarvestUsecase;

  beforeEach(() => {
    farmRepository = new FarmRepositoryInMemory();
    updateHarvest = new UpdateHarvestUsecase(farmRepository);
  });

  it('should be able to throw not found exception if the harvest does not exist', async () => {
    await expect(updateHarvest.execute(wrongUpdateHarvest)).rejects.toEqual(new NotFoundException('Harvest not found'));
  });

  it('should be able to update a harvest', async () => {
    const [harvestCreated] = await farmRepository.createHarvest([HarvestEntityMock]);

    const input: UpdateHarvestInput = {
      id: harvestCreated.id!,
      year: 2025,
      month: 1,
    };

    const result = await updateHarvest.execute(input);

    expect(result.month).toBe(input.month);
    expect(result.year).toBe(input.year);
    expect(result.farmId).toBe(harvestCreated.farmId);
    expect(result).toBeInstanceOf(Harvest);
  });
});
