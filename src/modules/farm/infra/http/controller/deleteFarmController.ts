import { Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteFarmUseCase } from 'modules/farm/application/use-cases/deleteFarmUsecase';
import { DeleteFarmDTO } from '../../adapters/dto/farmDTO';

@ApiTags('Farm')
@Controller('/farm')
export class DeleteFarmController {
  constructor(private readonly deleteFarmUsecase: DeleteFarmUseCase) {}

  @Delete('/:farmId')
  @HttpCode(204)
  async handler(@Param() data: DeleteFarmDTO): Promise<void> {
    await this.deleteFarmUsecase.execute(data.farmId);
  }
}
