import { CreateCropUsecase } from '@farm/application/use-cases/createCropUsecase';
import { FarmRepositoryInMemory } from '../in-MemoryRepository/farmInMemoryRepository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { HarvestEntityMock } from '../mockData/farmMock';
import { Crop } from '@farm/application/entities/crop';

describe('Create crop use case', () => {
  let farmRepository: FarmRepositoryInMemory;
  let createCropUseCase: CreateCropUsecase;

  beforeEach(() => {
    farmRepository = new FarmRepositoryInMemory();
    createCropUseCase = new CreateCropUsecase(farmRepository);
  });

  it('should create new crops if they do not exist yet', async () => {
    const harvestCreated = await farmRepository.createHarvest([HarvestEntityMock]);

    const input = {
      name: ['corn', 'soya'],
      harvestId: harvestCreated[0].id!,
    };

    const result = await createCropUseCase.execute(input);

    expect(result.length).toBe(2);
    expect(result.map(c => c.name)).toEqual(expect.arrayContaining(['corn', 'soya']));
  });

  it('should throw ConflictException if all crops already exist', async () => {
    const [createdHarvest] = await farmRepository.createHarvest([HarvestEntityMock]);

    const crops = [
      { name: 'corn', harvestId: createdHarvest.id! },
      { name: 'soya', harvestId: createdHarvest.id! },
    ];

    await farmRepository.createCrop(crops.map(crop => new Crop(crop)));

    const input = {
      name: ['corn', 'soya'],
      harvestId: createdHarvest.id!,
    };

    await expect(createCropUseCase.execute(input)).rejects.toEqual(new ConflictException('All crops already exist'));
  });

  it('should only create non-existing crops', async () => {
    const [createdHarvest] = await farmRepository.createHarvest([HarvestEntityMock]);

    const crops = [
      { name: 'corn', harvestId: createdHarvest.id! },
      { name: 'soya', harvestId: createdHarvest.id! },
    ];

    await farmRepository.createCrop(crops.map(crop => new Crop(crop)));

    const result = await createCropUseCase.execute({
      name: ['corn', 'pumpkin'],
      harvestId: createdHarvest.id!,
    });

    expect(result.length).toBe(1);
    expect(result[0].name).toBe('pumpkin');
  });

  it('should throw NotFoundException if harvest does not exist', async () => {
    const input = {
      name: ['Milho'],
      harvestId: 999,
    };

    await expect(createCropUseCase.execute(input)).rejects.toEqual(new NotFoundException('Harvest not found'));
  });
});
