import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateFarmController } from './infra/http/controller/createFarmController';
import { CreateFarmUseCase } from './application/use-cases/createFarmUsecase';
import { IFarmRepository } from './application/interfaces/IFarmRepository';
import { CreateCropUsecase } from './application/use-cases/createCropUsecase';
import { CreateHarvestUsecase } from './application/use-cases/createHarvestUsecase';
import { farmRepository } from './infra/database/repositories/farmRepository';

@Module({
  imports: [DatabaseModule],
  providers: [CreateFarmUseCase, CreateCropUsecase, CreateHarvestUsecase, { provide: IFarmRepository, useClass: farmRepository }],
  controllers: [CreateFarmController],
})
export class FarmModule {}
