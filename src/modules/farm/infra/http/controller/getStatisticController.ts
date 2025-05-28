import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetStatisticsUsecase } from 'modules/farm/application/use-cases/getStatisticsUsecase';
import { GetStatisticsOutput } from 'modules/farm/application/interfaces/farmRequest';

@ApiTags('Statistic')
@Controller('/statistic')
export class GetStatisticController {
  constructor(private readonly getStatisticUsecase: GetStatisticsUsecase) {}

  @Get()
  @HttpCode(201)
  async handler(): Promise<GetStatisticsOutput> {
    return await this.getStatisticUsecase.execute();
  }
}
