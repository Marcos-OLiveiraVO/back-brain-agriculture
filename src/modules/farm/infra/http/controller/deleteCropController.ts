import { Controller, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteCropDTO } from '../../adapters/dto/farmDTO';
import { DeleteCropUsecase } from 'modules/farm/application/use-cases/deleteCropUsecase';

@ApiTags('Crop')
@Controller('/Crop')
export class DeleteCropController {
  constructor(private readonly deleteCropUsecase: DeleteCropUsecase) {}

  @Delete('/:cropId')
  @HttpCode(204)
  async handler(@Param() data: DeleteCropDTO): Promise<void> {
    await this.deleteCropUsecase.execute(data.cropId);
  }
}
