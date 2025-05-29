import { Module } from '@nestjs/common';
import { CreateProducerUseCase } from './application/use-cases/createProducerUsecase';
import { IProducerRepository } from './application/interfaces/IProducerRepository';
import { ProducerRepository } from './infra/database/repositories/producerRepository';
import { CreateProducerController } from './infra/http/controller/createProducerController';
import { DatabaseModule } from '@shared/database/database.module';
import { DeleteProducerController } from './infra/http/controller/deleteProducerController';
import { DeleteProducerUseCase } from './application/use-cases/deleteProducerUsecase';
import { UpdateProducerController } from './infra/http/controller/updateProducerController';
import { UpdateProducerUseCase } from './application/use-cases/updateProducerUsecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateProducerUseCase,
    UpdateProducerUseCase,
    DeleteProducerUseCase,
    { provide: IProducerRepository, useClass: ProducerRepository },
  ],
  controllers: [CreateProducerController, UpdateProducerController, DeleteProducerController],
  exports: [{ provide: IProducerRepository, useClass: ProducerRepository }],
})
export class ProducerModule {}
