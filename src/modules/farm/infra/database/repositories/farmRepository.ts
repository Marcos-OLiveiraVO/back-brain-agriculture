import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prismaService';
import { Farm } from 'modules/farm/application/entities/farm';
import { IFarmRepository } from 'modules/farm/application/interfaces/IFarmRepository';
import { FarmMapper } from '../../adapters/mapper/farmMapper';
import { Crop } from 'modules/farm/application/entities/crop';
import { Harvest } from 'modules/farm/application/entities/harvest';
import { CropMapper } from '../../adapters/mapper/cropMapper';
import { HarvestMapper } from '../../adapters/mapper/harvestMapper';
import {
  CreateCropInput,
  FindFarm,
  HarvestDomainMapperInput,
  UpdateFarmRepositoryInput,
} from 'modules/farm/application/interfaces/farmRequest';

@Injectable()
export class farmRepository implements IFarmRepository {
  constructor(private prisma: PrismaService) {}

  async createFarm(data: Farm): Promise<Farm> {
    const farm = await this.prisma.farm.create({
      data: FarmMapper.toDatabase(data),
    });

    return FarmMapper.toDomain(farm);
  }

  async createHarvest(data: Harvest[]): Promise<Harvest[]> {
    const harvestsCreated = await Promise.all(
      data.map(async harvest => {
        const crops = harvest.Crop?.map(CropMapper.toDatabase) ?? [];

        const created = await this.prisma.harvest.create({
          data: {
            year: harvest.year,
            month: harvest.month,
            farmId: harvest.farmId,
            Crop: { createMany: { data: crops, skipDuplicates: true } },
          },
          include: { Crop: true },
        });

        return HarvestMapper.toDomain(created as unknown as HarvestDomainMapperInput);
      }),
    );

    return harvestsCreated;
  }

  async updateFarm(data: UpdateFarmRepositoryInput): Promise<Farm> {
    const farm = await this.prisma.farm.update({
      where: { id: data.id },
      data: FarmMapper.toDatabase(data as unknown as Farm),
    });

    return FarmMapper.toDomain(farm);
  }

  async createCrop(data: Crop[]): Promise<Crop[]> {
    const crops = await Promise.all(
      data.map(async crop => {
        return await this.prisma.crop.create({
          data: CropMapper.toDatabase(crop),
          include: { Harvest: true },
        });
      }),
    );

    return crops.map(crop => CropMapper.toDomain(crop));
  }

  async findByParams(data: FindFarm): Promise<Farm | null> {
    const farm = await this.prisma.farm.findFirst({
      where: {
        OR: [{ name: data.name, city: data.city, state: data.state }, { id: data.id }],
      },
      include: { Harvest: { include: { Crop: true } }, Producer: true },
    });

    if (!farm) {
      return null;
    }

    return FarmMapper.toDomain(farm);
  }

  async findHarvestById(data: FindFarm): Promise<boolean> {
    const harvest = await this.prisma.harvest.findFirst({
      where: { id: data.id },
      select: { id: true },
    });

    return harvest ? true : false;
  }

  async findCropsByNamesAndHarvest(data: CreateCropInput): Promise<string[]> {
    const crops = await this.prisma.crop.findMany({
      where: { name: { in: data.name }, harvestId: data.harvestId },
      select: { name: true },
    });

    return crops.map(crop => crop.name);
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

  async deleteCrop(cropId: number): Promise<void> {
    await this.prisma.crop.deleteMany({
      where: { id: cropId },
    });
  }
}
