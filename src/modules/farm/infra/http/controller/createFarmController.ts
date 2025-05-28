import { Body, Controller, HttpCode, NotFoundException, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFarmUseCase } from 'modules/farm/application/use-cases/createFarmUsecase';
import { FarmDTO } from '../../adapters/dto/farmDTO';
import { FarmViewModel } from '../viewModel/farmViewModel';

@ApiTags('Farm')
@ApiResponse({ status: 409, description: 'Farm already exists' })
@ApiResponse({ status: 422, description: 'arable land and vegetation area is greater than total area' })
@Controller('/farm')
export class CreateFarmController {
  constructor(private readonly createFarmUseCase: CreateFarmUseCase) {}

  @Post()
  @HttpCode(201)
  async handler(@Body() data: FarmDTO): Promise<FarmViewModel> {
    const farm = await this.createFarmUseCase.execute(data);

    if (!farm) {
      throw new NotFoundException('Farm cannot be created');
    }

    return FarmViewModel.toHttp(farm);
  }
}
