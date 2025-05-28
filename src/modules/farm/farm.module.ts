import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateFarmController } from './infra/http/controller/createFarmController';
import { CreateFarmUseCase } from './application/use-cases/createFarmUsecase';
import { IFarmRepository } from './application/interfaces/IFarmRepository';
import { CreateCropUsecase } from './application/use-cases/createCropUsecase';
import { CreateHarvestUsecase } from './application/use-cases/createHarvestUsecase';
import { farmRepository } from './infra/database/repositories/farmRepository';
import { DeleteFarmController } from './infra/http/controller/deleteFarmController';
import { DeleteFarmUseCase } from './application/use-cases/deleteFarmUsecase';
import { ProducerRepository } from '@producer/infra/database/repositories/producerRepository';
import { IProducerRepository } from '@producer/application/interfaces/IProducerRepository';
import { ProducerModule } from '@producer/producer.module';

@Module({
  imports: [DatabaseModule, ProducerModule],
  providers: [
    CreateFarmUseCase,
    CreateCropUsecase,
    CreateHarvestUsecase,
    DeleteFarmUseCase,
    { provide: IFarmRepository, useClass: farmRepository },
    { provide: IProducerRepository, useClass: ProducerRepository },
  ],
  controllers: [CreateFarmController, DeleteFarmController],
})
export class FarmModule {}
