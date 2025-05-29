import { Body, Controller, HttpCode, Param, Patch } from '@nestjs/common';
import { FindProducerDTO, UpdateProducerDTO } from '../../adapters/dto/producerDTO';
import { ProducerViewModel } from '../viewModel/producerViewModel';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProducerUseCase } from '@producer/application/use-cases/updateProducerUsecase';

@ApiTags('Producer')
@ApiResponse({ status: 404, description: 'Producer not found' })
@ApiResponse({ status: 422, description: 'You must provide a valid CPF or CNPJ' })
@ApiResponse({ status: 422, description: 'Another producer already uses this CPF or CNPJ' })
@Controller('/producer')
export class UpdateProducerController {
  constructor(private readonly updateProducerUseCase: UpdateProducerUseCase) {}

  @Patch('/:id')
  @HttpCode(200)
  async handler(@Body() data: UpdateProducerDTO, @Param() param: FindProducerDTO): Promise<ProducerViewModel> {
    const producer = await this.updateProducerUseCase.execute({
      ...data,
      producerId: param.id,
    });

    return ProducerViewModel.toHttp(producer);
  }
}
