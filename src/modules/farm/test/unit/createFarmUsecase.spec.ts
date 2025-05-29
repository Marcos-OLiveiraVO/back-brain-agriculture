import { FarmRepositoryInMemory } from '../in-MemoryRepository/farmInMemoryRepository';
import { FarmBaseMock, FarmBaseWrongMock, FarmEntityMock } from '../mockData/farmMock';
import { CreateFarmUseCase } from '@farm/application/use-cases/createFarmUsecase';
import { ProducerInMemoryRepository } from '@producer/test/in-MemoryRepository/producerInMemoryRepository';
import { CreateHarvestUsecase } from '@farm/application/use-cases/createHarvestUsecase';
import { ConflictException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { producerMock } from '@producer/test/mockData/producerMock';
import { Producer } from '@producer/application/entities/producer';
import { Farm } from '@farm/application/entities/farm';

describe('Create farm use case', () => {
  let farmRepository: FarmRepositoryInMemory;
  let producerRepository: ProducerInMemoryRepository;
  let createHarvest: CreateHarvestUsecase;
  let createFarm: CreateFarmUseCase;

  beforeEach(() => {
    farmRepository = new FarmRepositoryInMemory();
    producerRepository = new ProducerInMemoryRepository();
    createHarvest = new CreateHarvestUsecase(farmRepository);
    createFarm = new CreateFarmUseCase(farmRepository, producerRepository, createHarvest);
  });

  it('should be able to create one farm', async () => {
    await producerRepository.create(new Producer(producerMock));

    const farm = await createFarm.execute(FarmBaseMock);

    expect(farm).toBeInstanceOf(Farm);
    expect(farmRepository.Farm.size).toBe(1);
    expect(farmRepository.Crop.size).toBe(2);
    expect(farmRepository.Harvest.size).toBe(1);
    expect(farm?.name).toBe(FarmBaseMock.name);
  });

  it('should be able to throw conflict exception if the farm already exists', async () => {
    await producerRepository.create(new Producer(producerMock));
    await farmRepository.createFarm(FarmEntityMock);

    await expect(createFarm.execute(FarmBaseMock)).rejects.toEqual(new ConflictException('Farm already exists'));
  });

  it('should be able tro throw and exception if the arable area and the vegetation area is greater than the total area', async () => {
    await producerRepository.create(new Producer(producerMock));

    const message =
      'The area of arable land (5000) and the area of vegetation (5000) is greater than the total area of the farm (1000)';

    await expect(createFarm.execute(FarmBaseWrongMock)).rejects.toEqual(new UnprocessableEntityException(message));
  });

  it('should create to throw one exception if producer not exists', async () => {
    await expect(createFarm.execute(FarmBaseMock)).rejects.toEqual(
      new NotFoundException('Producer does not exist, please sign up it first'),
    );
  });
});
