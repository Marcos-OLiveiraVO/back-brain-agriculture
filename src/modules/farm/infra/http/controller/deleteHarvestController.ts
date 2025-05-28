import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteHarvestDTO } from '../../adapters/dto/farmDTO';
import { DeleteHarvestUsecase } from 'modules/farm/application/use-cases/deleteHarvestUsecase';

@ApiTags('Harvest')
@Controller('/harvest')
export class DeleteHarvestController {
  constructor(private readonly deleteHarvestUsecase: DeleteHarvestUsecase) {}

  @Delete('/:harvestId')
  @HttpCode(204)
  async handler(@Param() data: DeleteHarvestDTO): Promise<void> {
    await this.deleteHarvestUsecase.execute(data.harvestId);
  }
}
