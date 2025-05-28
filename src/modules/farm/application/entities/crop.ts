export interface CropProps {
  harvestId: number;
  name: string;
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

  public set id(id: number | undefined) {
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
