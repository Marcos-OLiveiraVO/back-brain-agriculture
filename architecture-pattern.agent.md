# Architecture Pattern (Back Brain Agriculture)

This document is a template for understanding and replicating the architecture patterns used in this project. It is intended as a reference for building new modules/features consistent with the existing Clean Architecture / DDD structure.

---

## 🧱 High-Level Structure

This project follows a modular, clean architecture approach with separate layers for application logic, infrastructure, and tests. Each feature (module) is self-contained under `src/modules/<feature>`, and follows a consistent folder layout:

```
src/modules/<feature>
  ├── application
  │   ├── entities
  │   ├── interfaces
  │   └── use-cases
  ├── infra
  │   ├── adapters
  │   │   ├── dto
  │   │   └── mapper
  │   ├── database/repositories
  │   └── http/controllers
  └── test
      ├── in-MemoryRepository
      ├── mockData
      └── unit
```

Each part has a clear responsibility:

- **Application**: Business logic, domain entities, input/output contracts.
- **Infrastructure (infra)**: Implementation details (database, HTTP controllers, DTO mapping).
- **Test**: Fast unit tests with in-memory repositories and mocks.

---

## 🧩 Core Concepts and Patterns

### ✅ Entities

- Located at: `src/modules/<feature>/application/entities`
- Represent the domain model and encapsulate invariants and validation rules.
- Avoid framework or persistence dependencies.

#### Example Entity (TypeScript)

```ts
export interface CropProps {
  harvestId: number;
  name: string;
  Harvest?: Harvest;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Crop {
  private _props: CropProps;
  private _id?: number;

  constructor(props: CropProps, id?: number) {
    this._props = props;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get harvestId(): number {
    return this._props.harvestId;
  }

  public set harvestId(harvestId: number) {
    this._props.harvestId = harvestId;
  }

  public get name(): string {
    return this._props.name;
  }

  public set name(name: string) {
    this._props.name = name;
  }

  public get Harvest(): Harvest | undefined {
    return this._props.Harvest;
  }

  public set Harvest(Harvest: Harvest | undefined) {
    this._props.Harvest = Harvest;
  }

  public get createdAt(): Date | undefined {
    return this._props.createdAt;
  }

  public set createdAt(createdAt: Date | undefined) {
    this._props.createdAt = createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this._props.updatedAt;
  }

  public set updatedAt(updatedAt: Date | undefined) {
    this._props.updatedAt = updatedAt;
  }
}
```

---

## 📦 Use-Cases (Application Services)

- Located at: `src/modules/<feature>/application/use-cases`
- Each use-case is a single business action (e.g., `CreateFarmUsecase`, `UpdateProducerUsecase`).
- Use-cases are plain classes with a single public method usually named `execute()`.
- Dependencies are injected via constructor (mostly repository interfaces).
- Use-cases should not depend on infrastructure directly (e.g., no Prisma or HTTP).

### Typical structure:

- Input DTO / request interface (from `application/interfaces`)
- Injected repository interface
- Output DTO or primitive response

#### Example Use-Case (TypeScript)

```ts
@Injectable()
export class CreateCropUsecase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(data: CreateCropInput): Promise<Crop[]> {
    const harvestExists = await this.farmRepository.findHarvestById({ id: data.harvestId });

    if (!harvestExists) {
      throw new NotFoundException('Harvest not found');
    }

    const existingCrops = await this.farmRepository.findCropsByNamesAndHarvest(data);
    const existingNames = new Set(existingCrops);

    const cropsToCreate = data.name
      .filter(name => !existingNames.has(name))
      .map(name => new Crop({ name, harvestId: data.harvestId }));

    if (!cropsToCreate.length) {
      throw new ConflictException('All crops already exist');
    }

    return this.farmRepository.createCrop(cropsToCreate);
  }
}
```

---

## 🌐 Controllers

- Located at: `src/modules/<feature>/infra/http/controllers`
- Controllers are NestJS classes (decorated with `@Controller`) and map HTTP routes to use-cases.
- Controllers should be thin:
  - Validate input (often via NestJS pipes and DTOs)
  - Map request body/query to use-case input
  - Call the use-case
  - Map use-case output to HTTP response

Controllers typically reference:

- DTOs (in `infra/adapters/dto`)
- Mappers (in `infra/adapters/mapper`)
- Use-cases (from `application/use-cases`)

#### Example Controller (TypeScript)

```ts
@ApiTags('Crop')
@Controller('/crop')
export class CreateCropController {
  constructor(private readonly createCropUsecase: CreateCropUsecase) {}

  @Post('/:harvestId')
  @HttpCode(201)
  async handler(@Body() data: CreateCropDTO, @Param() harvestData: FindHarvestDTO) {
    const result = await this.createCropUsecase.execute({
      name: data.name,
      harvestId: harvestData.harvestId,
    });

    return result.map(harvest => CropViewModel.toHttp(harvest));
  }
}
```

---

## 🔁 Mappers

- Located at: `src/modules/<feature>/infra/adapters/mapper`
- Translate between layers (e.g., entity → response DTO, request DTO → use-case input).
- Keep mapping logic centralized so controllers stay thin.

### Example Mapper (TypeScript)

```ts
export class CropMapper {
  static toDatabase(entity: Crop) {
    return {
      name: entity.name,
      harvestId: entity.harvestId,
    };
  }

  static toDomain(model: any): Crop {
    return new Crop(
      {
        name: model.name,
        harvestId: model.harvestId,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      },
      model.id,
    );
  }
}
```

---

## 🧩 View Models

- Located at: `src/modules/<feature>/infra/http/viewModel`
- Used by controllers to shape the final HTTP response shape.
- Keep them simple and focused on data transformation (no business logic).

### Example ViewModel (TypeScript)

```ts
export class CropViewModel {
  static toHttp(crop: Crop) {
    return {
      id: crop.id,
      name: crop.name,
      harvestId: crop.harvestId,
      createdAt: crop.createdAt,
      updatedAt: crop.updatedAt,
    };
  }
}
```

---

## 📦 DTOs

- Located at: `src/modules/<feature>/infra/adapters/dto`
- Define the shape of request and response payloads for HTTP endpoints.
- Used by controllers and validation pipes.

#### Example DTO (TypeScript)

```ts
// src/modules/farm/infra/adapters/dto/farmDTO.ts
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateCropDTO {
  @ApiProperty({
    example: ['Corn'],
    description: 'Name of the crop',
    required: true,
    isArray: true,
  })
  @IsNotEmpty({ message: 'name is required' })
  @IsArray({ message: 'name must be an array' })
  @ArrayMaxSize(3, { message: 'name must have a maximum of 10 elements' })
  name: string[];
}
```

---

## 🗄️ Repositories

- Interface (contract) defined in: `src/modules/<feature>/application/interfaces`
- Implementation located in: `src/modules/<feature>/infra/database/repositories`

### Repository Interface

- Defines methods for persistence (create, update, find, delete, etc.)
- Returns domain entities or plain objects depending on the use-case expectations.

#### Example Repository Interface (TypeScript)

```ts
export abstract class IFarmRepository {
  abstract createFarm(data: Farm): Promise<Farm>;
  abstract createHarvest(data: Harvest[]): Promise<Harvest[]>;
  abstract createCrop(data: Crop[]): Promise<Crop[]>;
  abstract updateFarm(data: UpdateFarmRepositoryInput): Promise<Farm>;
  abstract updateHarvest(data: UpdateHarvestInput): Promise<Harvest>;
  abstract findByParams(data: FindFarm): Promise<Farm | null>;
  abstract findHarvestById(data: FindFarm): Promise<boolean | null>;
  abstract findCropsByNamesAndHarvest(data: CreateCropInput): Promise<string[]>;
  abstract findStatistics(): Promise<GetStatisticsOutput>;
  abstract deleteFarm(farmId: number): Promise<void>;
  abstract deleteHarvest(harvestId: number): Promise<void>;
  abstract deleteCrop(cropId: number): Promise<void>;
}
```

### Repository Implementation

- Implements the interface using Prisma (or any other DB tool).
- Exists in the infra layer and is bound to the interface in the module provider.

#### Example Repository Implementation (TypeScript)

```ts
@Injectable()
export class farmRepository implements IFarmRepository {
  constructor(private prisma: PrismaService) {}

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

    return Boolean(harvest);
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
}
```

---

## 🧩 Interfaces (Contracts)

- Located at: `src/modules/<feature>/application/interfaces`
- Includes:
  - Repository interfaces
  - Request payload contracts (e.g., `farmRequest.ts`)

This keeps the application layer isolated from infra details.

---

## 🧪 Module Wiring

- The Nest module wires together controllers, use-cases, and repository bindings.
- It imports shared modules (e.g., `DatabaseModule`) and other feature modules as needed.

### Example Module (TypeScript)

```ts
// src/modules/farm/farm.module.ts
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, ProducerModule],
  providers: [
    CreateFarmUseCase,
    UpdateHarvestUsecase,
    DeleteFarmUseCase,
    GetStatisticsUsecase,
    { provide: IFarmRepository, useClass: farmRepository },
    { provide: IProducerRepository, useClass: ProducerRepository },
  ],
  controllers: [CreateFarmController, UpdateFarmController, DeleteCropController, GetStatisticController],
})
export class FarmModule {}
```

---

## 🧪 Unit Tests

- Located at: `src/modules/<feature>/test/unit`
- Each use-case typically has a corresponding test file.
- Tests should use in-memory repositories (located in `test/in-MemoryRepository`) to avoid external dependencies.
- Mock data lives in `test/mockData` and is shared among tests.

### In-memory repository pattern

- A lightweight implementation of the repository interface that stores data in memory.
- Used to test use-cases without requiring a database.

#### Example In-Memory Repository (TypeScript)

```ts
// src/modules/farm/test/in-MemoryRepository/farmInMemoryRepository.ts

export class FarmRepositoryInMemory implements IFarmRepository {
  Farm = new Map<number, Farm>();
  Crop = new Map<number, Crop>();
  Harvest = new Map<number, Harvest>();

  private getNextId(map: Map<number, unknown>): number {
    return map.size ? Math.max(...map.keys()) + 1 : 1;
  }

  async createCrop(data: Crop[]): Promise<Crop[]> {
    const crops = data.map(crop => {
      const id = this.getNextId(this.Crop);
      crop.id = id;
      return this.Crop.set(id, crop).get(id)!;
    });

    return crops;
  }

  async findCropsByNamesAndHarvest(data: CreateCropInput): Promise<string[]> {
    const crops = [...this.Crop.values()].filter(crop => data.name.includes(crop.name) && crop.harvestId === data.harvestId);

    return crops.map(crop => crop.name);
  }

  // ...implement other repository methods similarly (createFarm, findByParams, etc.)
}
```

### Example Unit Test (TypeScript)

```ts
// src/modules/farm/test/unit/createCropUsecase.spec.ts

describe('Create crop use case', () => {
  let farmRepository: FarmRepositoryInMemory;
  let createCropUseCase: CreateCropUsecase;

  beforeEach(() => {
    farmRepository = new FarmRepositoryInMemory();
    createCropUseCase = new CreateCropUsecase(farmRepository);
  });

  it('should create new crops if they do not exist yet', async () => {
    const harvestCreated = await farmRepository.createHarvest([HarvestEntityMock]);

    const input = { name: ['corn', 'soya'], harvestId: harvestCreated[0].id! };

    const result = await createCropUseCase.execute(input);

    expect(result.length).toBe(2);
    expect(result.map(c => c.name)).toEqual(expect.arrayContaining(['corn', 'soya']));
  });

  it('should throw ConflictException if all crops already exist', async () => {
    const [createdHarvest] = await farmRepository.createHarvest([HarvestEntityMock]);

    await farmRepository.createCrop(
      [
        { name: 'corn', harvestId: createdHarvest.id! },
        { name: 'soya', harvestId: createdHarvest.id! },
      ].map(crop => new Crop(crop)),
    );

    await expect(createCropUseCase.execute({ name: ['corn', 'soya'], harvestId: createdHarvest.id! })).rejects.toEqual(
      new ConflictException('All crops already exist'),
    );
  });

  it('should throw NotFoundException if harvest does not exist', async () => {
    await expect(createCropUseCase.execute({ name: ['Milho'], harvestId: 999 })).rejects.toEqual(
      new NotFoundException('Harvest not found'),
    );
  });
});
```

---

## 🧰 Utils

- Shared utility functions live under: `src/shared/utils/functions`
- Common helpers include:
  - `validateArea.ts` (area validation rules)
  - `validateDocument.ts` (CPF/CNPJ validation)

These utilities are used across modules to avoid code duplication.

---

## 🧩 Shared Services

- Shared services and infrastructure are under `src/shared`.
- Examples:
  - `src/shared/database/prismaService.ts` (Prisma client wrapper)
  - `src/shared/utils/globalRequest.ts` (some request-scoped helpers)

Shared services are injected where needed, but the pattern is to keep them in the `shared/` folder, outside individual modules.

---

## 🧭 How to Use This Template for New Modules

1. Create a folder: `src/modules/<feature>`.
2. Add domain entities under `application/entities`.
3. Add repository interfaces and request contracts under `application/interfaces`.
4. Implement your business rules in use-cases inside `application/use-cases`.
5. Create DTOs and mappers in `infra/adapters`.
6. Implement database access in `infra/database/repositories`.
7. Add HTTP controllers in `infra/http/controllers`.
8. Add unit tests under `test/` (use in-memory repository and mock data).

---

## 📌 Notes / Best Practices

- Keep business rules inside use-cases and entities; avoid putting logic in controllers.
- Keep the domain layer framework-agnostic: no NestJS or Prisma imports in `application/`.
- Use DTOs and mappers to isolate changes when endpoint contracts evolve.
- When adding new functionality, add a unit test first (TDD) to ensure behavior is explicit.

---

## 📘 Quick Reference: Folder Purpose

- `src/modules/<feature>/application`: domain logic and contracts
- `src/modules/<feature>/infra`: infrastructure glue (controllers, DB, mappers, DTOs)
- `src/modules/<feature>/test`: unit tests and in-memory fakes
- `src/shared`: shared infrastructure and utilities

---

✅ This file is intended to be used as a template, documenting the patterns and directory conventions used across projects built in this same style.
