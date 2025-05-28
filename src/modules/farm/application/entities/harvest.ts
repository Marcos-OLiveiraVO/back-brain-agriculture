import { Crop } from './crop';

export interface HarvestProps {
  year: number;
  month: number;
  farmId: number;
  Crop?: Crop[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Harvest {
  private _props: HarvestProps;
  private _id?: number;

  constructor(props: HarvestProps, id?: number) {
    this._props = props;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(id: number | undefined) {
    this._id = id;
  }

  public get year(): number {
    return this._props.year;
  }

  public set year(year: number) {
    this._props.year = year;
  }

  public set month(month: number) {
    this._props.month = month;
  }

  public get month(): number {
    return this._props.month;
  }

  public get farmId(): number {
    return this._props.farmId;
  }

  public set farmId(farmId: number) {
    this._props.farmId = farmId;
  }

  public get Crop(): Crop[] | undefined {
    return this._props.Crop;
  }

  public set Crop(Crop: Crop[] | undefined) {
    this._props.Crop = Crop;
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
