import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ProducerDTO } from '../../adapters/dto/producerDTO';
import { CreateProducerUseCase } from 'modules/producer/application/use-cases/createProducerUsecase';
import { ProducerViewModel } from '../viewModel/producerViewModel';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Producer')
@ApiResponse({ status: 409, description: 'Producer already exists with this cnpj or cpf exists' })
@ApiResponse({ status: 422, description: 'You must provide at least a CPF or a CNPJ' })
@ApiResponse({ status: 422, description: 'Invalid CPF' })
@ApiResponse({ status: 422, description: 'Invalid CNPJ' })
@ApiResponse({ status: 422, description: 'At least one field is required: cpf or cnpj' })
@Controller('/producer')
export class CreateProducerController {
  constructor(private readonly createProducerUseCase: CreateProducerUseCase) {}

  @Post()
  @HttpCode(201)
  async handler(@Body() data: ProducerDTO): Promise<ProducerViewModel> {
    const producer = await this.createProducerUseCase.execute(data);

    return ProducerViewModel.toHttp(producer);
  }
}
