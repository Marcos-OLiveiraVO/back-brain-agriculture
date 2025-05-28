import { ProducerViewModel } from '@producer/infra/http/viewModel/producerViewModel';
import { Farm } from 'modules/farm/application/entities/farm';
import { HarvestViewModel } from './harvestViewModel';

export class FarmViewModel {
  static toHttp(farm: Farm) {
    return {
      id: farm.id,
      producerId: farm.Producer ? undefined : farm.producerId,
      name: farm.name,
      city: farm.city,
      state: farm.state,
      totalArea: farm.totalArea,
      arableArea: farm.arableArea,
      vegetationArea: farm.vegetationArea,
      createdAt: farm.createdAt,
      updatedAt: farm.updatedAt,
      producer: farm.Producer ? ProducerViewModel.toHttp(farm.Producer) : undefined,
      harvests: farm.Harvest ? farm.Harvest.map(harvest => HarvestViewModel.toHttp(harvest)) : undefined,
    };
  }
}
