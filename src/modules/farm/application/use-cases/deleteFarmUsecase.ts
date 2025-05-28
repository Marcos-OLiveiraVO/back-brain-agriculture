import { Injectable } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/IFarmRepository';

@Injectable()
export class DeleteFarmUseCase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(farmId: number): Promise<void> {
    await this.farmRepository.deleteFarm(farmId);
  }
}
