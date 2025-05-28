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
import { DeleteHarvestUsecase } from './application/use-cases/deleteHarvestUsecase';
import { DeleteHarvestController } from './infra/http/controller/deleteHarvestController';
import { UpdateFarmController } from './infra/http/controller/updateFarmController';
import { UpdateFarmUsecase } from './application/use-cases/updateFarmUsecase';
import { CreateHarvestController } from './infra/http/controller/createHarvestController';
import { DeleteCropUsecase } from './application/use-cases/deleteCropUsecase';
import { DeleteCropController } from './infra/http/controller/deleteCropController';
import { CreateCropController } from './infra/http/controller/createCropController';

@Module({
  imports: [DatabaseModule, ProducerModule],
  providers: [
    CreateFarmUseCase,
    CreateCropUsecase,
    CreateHarvestUsecase,
    UpdateFarmUsecase,
    DeleteFarmUseCase,
    DeleteHarvestUsecase,
    DeleteCropUsecase,
    { provide: IFarmRepository, useClass: farmRepository },
    { provide: IProducerRepository, useClass: ProducerRepository },
  ],
  controllers: [
    CreateFarmController,
    CreateHarvestController,
    CreateCropController,
    UpdateFarmController,
    DeleteFarmController,
    DeleteHarvestController,
    DeleteCropController,
  ],
})
export class FarmModule {}
