import { Injectable } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/IFarmRepository';

@Injectable()
export class DeleteCropUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(cropId: number): Promise<void> {
    await this.farmRepository.deleteCrop(cropId);
  }
}
