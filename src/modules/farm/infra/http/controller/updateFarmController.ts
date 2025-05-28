import { Body, Controller, HttpCode, NotFoundException, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateFarmDTO } from '../../adapters/dto/farmDTO';
import { FarmViewModel } from '../viewModel/farmViewModel';
import { UpdateFarmUsecase } from 'modules/farm/application/use-cases/updateFarmUsecase';

@ApiTags('Farm')
@ApiResponse({ status: 404, description: 'Farm not found' })
@Controller('/farm')
export class UpdateFarmController {
  constructor(private readonly updateFarmUsecase: UpdateFarmUsecase) {}

  @Patch()
  @HttpCode(200)
  async handler(@Body() data: UpdateFarmDTO): Promise<FarmViewModel> {
    const farm = await this.updateFarmUsecase.execute(data);

    return FarmViewModel.toHttp(farm);
  }
}
