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

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateFarmUseCase,
    CreateCropUsecase,
    CreateHarvestUsecase,
    DeleteFarmUseCase,
    { provide: IFarmRepository, useClass: farmRepository },
  ],
  controllers: [CreateFarmController, DeleteFarmController],
})
export class FarmModule {}
