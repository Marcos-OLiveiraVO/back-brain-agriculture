import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ProducerDTO } from '../../adapters/dto/producerDTO';
import { CreateProducerUseCase } from 'modules/producer/application/use-cases/createProducerUsecase';
import { Producer } from 'modules/producer/application/entities/producer';

@Controller('/producer')
export class CreateProducerController {
  constructor(private readonly createProducerUseCase: CreateProducerUseCase) {}

  @Post()
  @HttpCode(201)
  async handler(@Body() data: ProducerDTO): Promise<Producer> {
    return this.createProducerUseCase.execute(data);
  }
}
