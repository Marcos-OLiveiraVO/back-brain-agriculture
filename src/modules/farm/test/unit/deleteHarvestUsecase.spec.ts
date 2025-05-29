import { FarmRepositoryInMemory } from '../in-MemoryRepository/farmInMemoryRepository';
import { HarvestEntityMock } from '../mockData/farmMock';
import { DeleteHarvestUsecase } from '@farm/application/use-cases/deleteHarvestUsecase';

let farmInMemoryRepository: FarmRepositoryInMemory;
let deleteHarvest: DeleteHarvestUsecase;

describe('Delete harvest use case', () => {
  beforeEach(async () => {
    farmInMemoryRepository = new FarmRepositoryInMemory();
    deleteHarvest = new DeleteHarvestUsecase(farmInMemoryRepository);
  });

  it('should be able to delete one harvest', async () => {
    const harvest = await farmInMemoryRepository.createHarvest([HarvestEntityMock]);

    expect(farmInMemoryRepository.Harvest.size).toBe(1);

    await deleteHarvest.execute(harvest[0].id!);
    expect(farmInMemoryRepository.Harvest.size).toBe(0);
  });
});
