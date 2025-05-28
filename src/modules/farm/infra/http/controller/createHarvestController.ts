import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateHarvestUsecase } from 'modules/farm/application/use-cases/createHarvestUsecase';
import { CreateHarvestDTO, FindFarmDTO } from '../../adapters/dto/farmDTO';
import { HarvestViewModel } from '../viewModel/harvestViewModel';

@ApiTags('Harvest')
@Controller('/harvest')
export class CreateHarvestController {
  constructor(private readonly createHarvestUsecase: CreateHarvestUsecase) {}

  @Post('/:farmId')
  @HttpCode(201)
  @ApiBody({ type: CreateHarvestDTO, isArray: true })
  async handler(@Body() data: CreateHarvestDTO[], @Param() harvestData: FindFarmDTO): Promise<HarvestViewModel> {
    const result = await this.createHarvestUsecase.execute({
      farmId: harvestData.farmId,
      harvests: data,
    });

    return result.map(harvest => HarvestViewModel.toHttp(harvest));
  }
}
