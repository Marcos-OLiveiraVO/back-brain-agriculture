import { Module } from '@nestjs/common';
import { CreateProducerUseCase } from './application/use-cases/createProducerUsecase';
import { IProducerRepository } from './application/interfaces/IProducerRepository';
import { ProducerRepository } from './infra/database/repositories/producerRepository';
import { CreateProducerController } from './infra/http/controller/createProducerController';
import { DatabaseModule } from '@shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateProducerUseCase, { provide: IProducerRepository, useClass: ProducerRepository }],
  controllers: [CreateProducerController],
})
export class ProducerModule {}
