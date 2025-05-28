import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindFarmDTO, UpdateFarmDTO } from '../../adapters/dto/farmDTO';
import { FarmViewModel } from '../viewModel/farmViewModel';
import { UpdateFarmUsecase } from 'modules/farm/application/use-cases/updateFarmUsecase';

@ApiTags('Farm')
@ApiResponse({ status: 404, description: 'Farm not found' })
@Controller('/farm')
export class UpdateFarmController {
  constructor(private readonly updateFarmUsecase: UpdateFarmUsecase) {}

  @Patch('/:farmId')
  @HttpCode(200)
  async handler(@Body() data: UpdateFarmDTO, @Param() farmData: FindFarmDTO): Promise<FarmViewModel> {
    const farm = await this.updateFarmUsecase.execute({
      ...data,
      id: farmData.farmId,
    });

    return FarmViewModel.toHttp(farm);
  }
}
