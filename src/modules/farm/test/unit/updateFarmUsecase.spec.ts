import { UpdateFarmInput } from '@farm/application/interfaces/farmRequest';
import { FarmRepositoryInMemory } from '../in-MemoryRepository/farmInMemoryRepository';
import { FarmBaseMock, FarmBaseWrongMock, FarmEntityMock } from '../mockData/farmMock';
import { UpdateFarmUsecase } from '@farm/application/use-cases/updateFarmUsecase';
import { Farm } from '@farm/application/entities/farm';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';

describe('Update farm use case', () => {
  let farmRepository: FarmRepositoryInMemory;
  let updateFarm: UpdateFarmUsecase;

  beforeEach(() => {
    farmRepository = new FarmRepositoryInMemory();
    updateFarm = new UpdateFarmUsecase(farmRepository);
  });

  it('should be able to throw unprocessable entity exception if the arable area and the vegetation area is greater than the total area', async () => {
    const farm = await farmRepository.createFarm(FarmEntityMock);

    const input: UpdateFarmInput = {
      ...FarmBaseWrongMock,
      id: farm.id!,
    };

    const message = new UnprocessableEntityException(
      `The area of arable land (${input.arableArea}) and the area of vegetation (${input.vegetationArea}) is greater than the total area of the farm (${input.totalArea})`,
    );

    await expect(updateFarm.execute(input)).rejects.toEqual(message);
  });

  it('should be able to throw not found exception if the farm does not exist', async () => {
    await expect(updateFarm.execute({ ...FarmBaseMock, id: 1 })).rejects.toEqual(new NotFoundException('Farm not found'));
  });

  it('should be able to update a farm', async () => {
    const harvestCreated = await farmRepository.createFarm(FarmEntityMock);

    const input: UpdateFarmInput = {
      ...FarmBaseMock,
      id: harvestCreated.id!,
      name: 'Farm ACT',
    };

    const result = await updateFarm.execute(input);

    expect(result.name).toBe(input.name);
    expect(result.totalArea).toBe(FarmEntityMock.totalArea);
    expect(result.arableArea).toBe(FarmEntityMock.arableArea);
    expect(result.vegetationArea).toBe(FarmEntityMock.vegetationArea);
    expect(result).toBeInstanceOf(Farm);
  });
});
