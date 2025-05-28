import { Decimal } from '@prisma/client/runtime/library';
import { Producer } from '@producer/application/entities/producer';
import { Harvest } from './harvest';

export interface FarmProps {
  name: string;
  city: string;
  state: string;
  totalArea: Decimal;
  arableArea: Decimal;
  vegetationArea: Decimal;
  producerId: number;
  Producer?: Producer;
  Harvest?: Harvest[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Farm {
  private _props: FarmProps;
  private _id?: number;

  constructor(props: FarmProps, id?: number) {
    this._props = props;
    this._id = id;
  }

  public get id() {
    return this._id;
  }

  public set id(id: number | undefined) {
    this._id = id;
  }

  public get name(): string {
    return this._props.name;
  }

  public set name(name: string) {
    this._props.name = name;
  }

  public get state(): string {
    return this._props.state;
  }

  public set state(state: string) {
    this._props.state = state;
  }

  public set city(city: string) {
    this._props.city = city;
  }

  public get city(): string {
    return this._props.city;
  }

  public get totalArea(): Decimal {
    return this._props.totalArea;
  }

  public set totalArea(totalArea: Decimal) {
    this._props.totalArea = totalArea;
  }

  public get arableArea(): Decimal {
    return this._props.totalArea;
  }

  public set arableArea(arableArea: Decimal) {
    this._props.arableArea = arableArea;
  }

  public get vegetationArea(): Decimal {
    return this._props.totalArea;
  }

  public set vegetationArea(vegetationArea: Decimal) {
    this._props.vegetationArea = vegetationArea;
  }

  public get producerId(): number {
    return this._props.producerId;
  }

  public set producerId(producerId: number) {
    this._props.producerId = producerId;
  }

  public get Producer(): Producer | undefined {
    return this._props.Producer;
  }

  public set Producer(Producer: Producer | undefined) {
    this._props.Producer = Producer;
  }

  public get Harvest(): Harvest[] | undefined {
    return this._props.Harvest;
  }

  public set Harvest(Harvest: Harvest[] | undefined) {
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
