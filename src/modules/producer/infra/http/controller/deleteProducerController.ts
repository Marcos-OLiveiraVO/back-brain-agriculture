import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { DeleteProducerDTO } from '../../adapters/dto/producerDTO';
import { ApiTags } from '@nestjs/swagger';
import { DeleteProducerUseCase } from '@producer/application/use-cases/deleteProducerUsecase';

@ApiTags('Producer')
@Controller('/producer')
export class DeleteProducerController {
  constructor(private readonly deleteProducerUsecase: DeleteProducerUseCase) {}

  @Delete('/:id')
  @HttpCode(204)
  async handler(@Param() param: DeleteProducerDTO): Promise<void> {
    await this.deleteProducerUsecase.execute(param.id);
  }
}
