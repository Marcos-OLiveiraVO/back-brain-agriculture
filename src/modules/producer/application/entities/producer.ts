export interface ProducerProps {
  name: string;
  cnpj?: string;
  cpf?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Producer {
  _props: ProducerProps;
  _id?: number;

  constructor(props: ProducerProps, id?: number) {
    this._props = props;
    this._id = id;
  }

  public get id(): number | undefined {
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

  public get cnpj(): string | undefined {
    return this._props.cnpj;
  }

  public set cnpj(cnpj: string | undefined) {
    this._props.cnpj = cnpj;
  }

  public get cpf(): string | undefined {
    return this._props.cpf;
  }

  public set cpf(cpf: string | undefined) {
    this._props.cpf = cpf;
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
