import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCropDTO, FindHarvestDTO } from '../../adapters/dto/farmDTO';
import { CreateCropUsecase } from 'modules/farm/application/use-cases/createCropUsecase';
import { CropViewModel } from '../viewModel/cropViewModel';

@ApiTags('Crop')
@Controller('/crop')
export class CreateCropController {
  constructor(private readonly createCropUsecase: CreateCropUsecase) {}

  @Post('/:harvestId')
  @HttpCode(201)
  async handler(@Body() data: CreateCropDTO, @Param() harvestData: FindHarvestDTO): Promise<CropViewModel> {
    const result = await this.createCropUsecase.execute({
      name: data.name,
      harvestId: harvestData.harvestId,
    });

    return result.map(harvest => CropViewModel.toHttp(harvest));
  }
}
