import { Producer } from '../entities/producer';
import { FindProducer, UpdateProducerInput } from './producerRequest';

export abstract class IProducerRepository {
  abstract create(data: Producer): Promise<Producer>;
  abstract updateProducer(data: UpdateProducerInput): Promise<Producer>;
  abstract deleteProducer(producerId: number): Promise<void>;
  abstract findByParams(data: FindProducer): Promise<Producer | null>;
  abstract findByProducerId(producerId: number): Promise<Producer | null>;
}
