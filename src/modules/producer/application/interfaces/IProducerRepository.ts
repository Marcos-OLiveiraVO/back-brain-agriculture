import { Producer } from '../entities/producer';
import { FindProducer } from './producerRequest';

export abstract class IProducerRepository {
  abstract create(data: Producer): Promise<Producer>;
  abstract deleteProducer(producerId: number): Promise<void>;
  abstract findByParams(data: FindProducer): Promise<Producer | null>;
  abstract findByProducerId(producerId: number): Promise<Producer | null>;
}
