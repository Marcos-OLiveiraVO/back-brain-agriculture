export interface ProducerInput {
  name: string;
  cnpj?: string;
  cpf?: string;
}

export interface FindProducer extends Partial<ProducerInput> {
  id?: number;
}

export interface UpdateProducerInput extends ProducerInput {
  producerId: number;
}
