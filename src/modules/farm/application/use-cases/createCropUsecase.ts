import { Injectable } from '@nestjs/common';
import { Crop } from '../entities/crop';
import { CropInput } from '../interfaces/farmRequest';
import { IFarmRepository } from '../interfaces/IFarmRepository';

@Injectable()
export class CreateCropUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(data: CropInput[]): Promise<void> {
    const crops = data.map(crop => new Crop(crop));

    await this.farmRepository.createCrop(crops);
  }
}
