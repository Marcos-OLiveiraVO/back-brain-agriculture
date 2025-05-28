import { Module } from '@nestjs/common';
import { IProducerRepository } from '@producer/application/interfaces/IProducerRepository';
import { ProducerRepository } from '@producer/infra/database/repositories/producerRepository';
import { ProducerModule } from '@producer/producer.module';
import { DatabaseModule } from '@shared/database/database.module';
import { IFarmRepository } from './application/interfaces/IFarmRepository';
import { CreateCropUsecase } from './application/use-cases/createCropUsecase';
import { CreateFarmUseCase } from './application/use-cases/createFarmUsecase';
import { CreateHarvestUsecase } from './application/use-cases/createHarvestUsecase';
import { DeleteCropUsecase } from './application/use-cases/deleteCropUsecase';
import { DeleteFarmUseCase } from './application/use-cases/deleteFarmUsecase';
import { DeleteHarvestUsecase } from './application/use-cases/deleteHarvestUsecase';
import { UpdateFarmUsecase } from './application/use-cases/updateFarmUsecase';
import { farmRepository } from './infra/database/repositories/farmRepository';
import { CreateCropController } from './infra/http/controller/createCropController';
import { CreateFarmController } from './infra/http/controller/createFarmController';
import { CreateHarvestController } from './infra/http/controller/createHarvestController';
import { DeleteCropController } from './infra/http/controller/deleteCropController';
import { DeleteFarmController } from './infra/http/controller/deleteFarmController';
import { DeleteHarvestController } from './infra/http/controller/deleteHarvestController';
import { UpdateFarmController } from './infra/http/controller/updateFarmController';
import { UpdateHarvestController } from './infra/http/controller/updateHarvestController';
import { UpdateHarvestUsecase } from './application/use-cases/updateHarvestUsecase';
import { GetStatisticController } from './infra/http/controller/getStatisticController';
import { GetStatisticsUsecase } from './application/use-cases/getStatisticsUsecase';

@Module({
  imports: [DatabaseModule, ProducerModule],
  providers: [
    CreateFarmUseCase,
    CreateCropUsecase,
    CreateHarvestUsecase,
    UpdateFarmUsecase,
    UpdateHarvestUsecase,
    DeleteFarmUseCase,
    DeleteHarvestUsecase,
    DeleteCropUsecase,
    GetStatisticsUsecase,
    { provide: IFarmRepository, useClass: farmRepository },
    { provide: IProducerRepository, useClass: ProducerRepository },
  ],
  controllers: [
    CreateFarmController,
    CreateHarvestController,
    CreateCropController,
    UpdateHarvestController,
    UpdateFarmController,
    DeleteFarmController,
    DeleteHarvestController,
    DeleteCropController,
    GetStatisticController,
  ],
})
export class FarmModule {}
