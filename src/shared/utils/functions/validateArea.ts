import { UnprocessableEntityException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { Area } from '../globalRequest';

export function validateArea(data: Area) {
  try {
    const totalArea = new Decimal(data.totalArea);
    const arableArea = new Decimal(data.arableArea);
    const vegetationArea = new Decimal(data.vegetationArea);

    const sumUsedArea = arableArea.plus(vegetationArea);

    if (sumUsedArea.gt(totalArea)) {
      throw new UnprocessableEntityException(
        `The area of arable land (${arableArea.toFixed()}) and the area of vegetation (${vegetationArea.toFixed()}) is greater than the total area of the farm (${totalArea.toFixed()})`,
      );
    }

    return {
      totalArea,
      arableArea,
      vegetationArea,
    };
  } catch (error) {
    throw new UnprocessableEntityException(error.message);
  }
}
