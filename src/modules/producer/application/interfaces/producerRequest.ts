export interface ProducerInput {
  name: string;
  cnpj?: string;
  cpf?: string;
}

export interface FindProducer extends ProducerInput {}
