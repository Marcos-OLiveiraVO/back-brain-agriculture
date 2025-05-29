import { FarmRepositoryInMemory } from '../in-MemoryRepository/farmInMemoryRepository';
import { FarmEntityMock, FarmEntityMockTwo, HarvestEntityMock } from '../mockData/farmMock';
import { GetStatisticsUsecase } from '@farm/application/use-cases/getStatisticsUsecase';

describe('Get statistic use case', () => {
  let farmRepository: FarmRepositoryInMemory;
  let getStatistic: GetStatisticsUsecase;

  beforeEach(() => {
    farmRepository = new FarmRepositoryInMemory();
    getStatistic = new GetStatisticsUsecase(farmRepository);
  });

  it('should be able to return statistics', async () => {
    await farmRepository.createFarm(FarmEntityMock);
    await farmRepository.createFarm(FarmEntityMockTwo);

    await farmRepository.createHarvest([HarvestEntityMock]);
    const result = await getStatistic.execute();

    expect(result.totalFarms).toBe(2);
    expect(result.totalHectares.toNumber()).toBe(3000);
    expect(result.byState).toEqual(
      expect.arrayContaining([
        { state: 'São paulo', total: 1 },
        { state: 'Amazonas', total: 1 },
      ]),
    );
    expect(result.byCrop).toEqual(expect.arrayContaining([{ crop: 'Corn', total: 1 }]));
    expect(result.bySoilUsage.totalArable.toNumber()).toBe(2000);
    expect(result.bySoilUsage.totalVegetation.toNumber()).toBe(1000);
  });
});
