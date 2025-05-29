import { ProducerInMemoryRepository } from '../in-MemoryRepository/producerInMemoryRepository';
import { DeleteProducerUseCase } from '@producer/application/use-cases/deleteProducerUsecase';
import { producerMock } from '../mockData/producerMock';
import { Producer } from '@producer/application/entities/producer';

let producerRepository: ProducerInMemoryRepository;
let deleteProducer: DeleteProducerUseCase;

describe('Delete producer use case', () => {
  beforeEach(async () => {
    producerRepository = new ProducerInMemoryRepository();
    deleteProducer = new DeleteProducerUseCase(producerRepository);
  });

  it('should be able to delete one producer', async () => {
    const producer = await producerRepository.create(new Producer(producerMock));

    expect(producerRepository.producers.size).toBe(1);
    await deleteProducer.execute(producer._id!);

    expect(producerRepository.producers.size).toBe(0);
  });
});
