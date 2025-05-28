import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prismaService';
import { Farm } from 'modules/farm/application/entities/farm';
import { FindFarm, UpdateFarmRepositoryInput } from 'modules/farm/application/interfaces/farmRequest';
import { IFarmRepository } from 'modules/farm/application/interfaces/IFarmRepository';
import { FarmMapper } from '../../adapters/mapper/farmMapper';
import { Crop } from 'modules/farm/application/entities/crop';
import { Harvest } from 'modules/farm/application/entities/harvest';
import { CropMapper } from '../../adapters/mapper/cropMapper';

@Injectable()
export class farmRepository implements IFarmRepository {
  constructor(private prisma: PrismaService) {}

  async createFarm(data: Farm): Promise<Farm> {
    const farm = await this.prisma.farm.create({
      data: FarmMapper.toDatabase(data),
    });

    return FarmMapper.toDomain(farm);
  }

  async createHarvest(data: Harvest[]): Promise<void> {
    const promises = data.map(async harvest => {
      const crops = harvest.Crop?.map(CropMapper.toDatabase) ?? [];

      await this.prisma.harvest.create({
        data: {
          year: harvest.year,
          month: harvest.month,
          farmId: harvest.farmId,
          Crop: {
            createMany: {
              data: crops,
              skipDuplicates: true,
            },
          },
        },
      });
    });

    await Promise.all(promises);
  }

  async updateFarm(data: UpdateFarmRepositoryInput): Promise<Farm> {
    const farm = await this.prisma.farm.update({
      where: { id: data.id },
      data: FarmMapper.toDatabase(data as unknown as Farm),
    });

    return FarmMapper.toDomain(farm);
  }

  async createCrop(data: Crop[]): Promise<void> {
    await this.prisma.crop.createMany({
      data: data.map(CropMapper.toDatabase),
      skipDuplicates: true,
    });
  }

  async findByParams(data: FindFarm): Promise<Farm | null> {
    const farm = await this.prisma.farm.findFirst({
      where: {
        OR: [{ name: data.name, city: data.city, state: data.state }, { id: data.id }],
      },
      include: {
        Harvest: { include: { Crop: true } },
        Producer: true,
      },
    });

    if (!farm) {
      return null;
    }

    return FarmMapper.toDomain(farm);
  }

  async deleteFarm(farmId: number): Promise<void> {
    await this.prisma.farm.deleteMany({
      where: { id: farmId },
    });
  }

  async deleteHarvest(harvestId: number): Promise<void> {
    await this.prisma.harvest.deleteMany({
      where: { id: harvestId },
    });
  }
}
