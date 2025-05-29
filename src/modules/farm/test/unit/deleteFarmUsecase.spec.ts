import { Crop } from '@farm/application/entities/crop';
import { FarmRepositoryInMemory } from '../in-MemoryRepository/farmInMemoryRepository';
import { DeleteFarmUseCase } from '@farm/application/use-cases/deleteFarmUsecase';
import { FarmEntityMock } from '../mockData/farmMock';

let farmInMemoryRepository: FarmRepositoryInMemory;
let deleteFarm: DeleteFarmUseCase;

describe('Delete farm use case', () => {
  beforeEach(async () => {
    farmInMemoryRepository = new FarmRepositoryInMemory();
    deleteFarm = new DeleteFarmUseCase(farmInMemoryRepository);
  });

  it('should be able to delete one farm', async () => {
    const farm = await farmInMemoryRepository.createFarm(FarmEntityMock);
    expect(farmInMemoryRepository.Farm.size).toBe(1);

    await deleteFarm.execute(farm.id!);
    expect(farmInMemoryRepository.Crop.size).toBe(0);
  });
});
