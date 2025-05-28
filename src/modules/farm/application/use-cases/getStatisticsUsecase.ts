import { Injectable } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/IFarmRepository';
import { GetStatisticsOutput } from '../interfaces/farmRequest';

@Injectable()
export class GetStatisticsUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(): Promise<GetStatisticsOutput> {
    return await this.farmRepository.findStatistics();
  }
}
