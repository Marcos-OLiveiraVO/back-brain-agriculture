import { Producer } from '../entities/producer';
import { FindProducer } from './producerRequest';

export abstract class IProducerRepository {
  abstract create(data: Producer): Promise<Producer>;
  abstract findByParams(data: FindProducer): Promise<Producer | null>;
}
