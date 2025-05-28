import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prismaService';
import { Farm } from 'modules/farm/application/entities/farm';
import { IFarmRepository } from 'modules/farm/application/interfaces/IFarmRepository';
import { FarmMapper } from '../../adapters/mapper/farmMapper';
import { Crop } from 'modules/farm/application/entities/crop';
import { Harvest } from 'modules/farm/application/entities/harvest';
import { CropMapper } from '../../adapters/mapper/cropMapper';
import { HarvestMapper } from '../../adapters/mapper/harvestMapper';
import { Decimal } from '@prisma/client/runtime/library';
import {
  CreateCropInput,
  FindFarm,
  GetStatisticsOutput,
  HarvestDomainMapperInput,
  UpdateFarmRepositoryInput,
  UpdateHarvestInput,
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

  async updateHarvest(data: UpdateHarvestInput): Promise<Harvest> {
    const harvest = await this.prisma.harvest.update({
      where: { id: data.id },
      data: HarvestMapper.toDatabase(data as unknown as Harvest),
    });

    return HarvestMapper.toDomain(harvest);
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

  async findStatistics(): Promise<GetStatisticsOutput> {
    const aggregatePromise = this.prisma.farm.aggregate({
      _count: { id: true },
      _sum: {
        totalArea: true,
        arableArea: true,
        vegetationArea: true,
      },
    });

    const groupByPromise = this.prisma.farm.groupBy({ by: ['state'], _count: { _all: true } });
    const cropsPromise = this.prisma.crop.groupBy({ by: ['name'], _count: { _all: true } });

    const [aggregates, farmsByState, cropsByName] = await Promise.all([aggregatePromise, groupByPromise, cropsPromise]);

    return {
      totalFarms: aggregates._count.id,
      totalHectares: aggregates._sum.totalArea ?? Decimal(0),
      byState: farmsByState.map(item => ({
        state: item.state,
        total: item._count._all,
      })),
      byCrop: cropsByName.map(item => ({
        crop: item.name,
        total: item._count._all,
      })),
      bySoilUsage: {
        totalArable: aggregates._sum.arableArea ?? Decimal(0),
        totalVegetation: aggregates._sum.vegetationArea ?? Decimal(0),
      },
    };
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
