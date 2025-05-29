import { FarmRepositoryInMemory } from '../in-MemoryRepository/farmInMemoryRepository';
import { DeleteCropUsecase } from '@farm/application/use-cases/deleteCropUsecase';
import { cropEntityMock } from '../mockData/farmMock';

let farmInMemoryRepository: FarmRepositoryInMemory;
let deleteCropUseCase: DeleteCropUsecase;

describe('Delete crop use case', () => {
  beforeEach(async () => {
    farmInMemoryRepository = new FarmRepositoryInMemory();
    deleteCropUseCase = new DeleteCropUsecase(farmInMemoryRepository);
  });

  it('should be able to delete one crop', async () => {
    const crop = await farmInMemoryRepository.createCrop([cropEntityMock]);
    expect(farmInMemoryRepository.Crop.size).toBe(1);

    await deleteCropUseCase.execute(crop[0].id!);
    expect(farmInMemoryRepository.Crop.size).toBe(0);
  });
});
