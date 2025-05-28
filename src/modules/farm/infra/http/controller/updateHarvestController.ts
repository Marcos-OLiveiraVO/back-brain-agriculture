import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindHarvestDTO, UpdateHarvestDTO } from '../../adapters/dto/farmDTO';
import { UpdateHarvestUsecase } from 'modules/farm/application/use-cases/updateHarvestUsecase';
import { HarvestViewModel } from '../viewModel/harvestViewModel';

@ApiTags('Harvest')
@Controller('/harvest')
export class UpdateHarvestController {
  constructor(private readonly updateHarvestUsecase: UpdateHarvestUsecase) {}

  @Patch('/:harvestId')
  @HttpCode(201)
  async handler(@Body() data: UpdateHarvestDTO, @Param() harvestData: FindHarvestDTO): Promise<HarvestViewModel> {
    const result = await this.updateHarvestUsecase.execute({
      ...data,
      id: harvestData.harvestId,
    });

    return HarvestViewModel.toHttp(result);
  }
}
