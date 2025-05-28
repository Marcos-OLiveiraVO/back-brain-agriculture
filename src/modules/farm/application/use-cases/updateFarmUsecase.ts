import { Injectable, NotFoundException } from '@nestjs/common';
import { IFarmRepository } from '../interfaces/IFarmRepository';
import { UpdateFarmInput } from '../interfaces/farmRequest';
import { Farm } from '../entities/farm';
import { validateArea } from '@shared/utils/functions/validateArea';

@Injectable()
export class UpdateFarmUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(data: UpdateFarmInput): Promise<Farm> {
    const farm = await this.farmRepository.findByParams(data);

    if (!farm) {
      throw new NotFoundException('Farm not found');
    }

    const limitArea = validateArea(data);

    return this.farmRepository.updateFarm({
      ...data,
      totalArea: limitArea.totalArea,
      arableArea: limitArea.arableArea,
      vegetationArea: limitArea.vegetationArea,
    });
  }
}
