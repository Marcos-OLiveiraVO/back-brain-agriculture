import { ProducerInMemoryRepository } from '../in-MemoryRepository/producerInMemoryRepository';
import { producerMock, producerMockTwo, producerMockUpdate } from '../mockData/producerMock';
import { UpdateProducerUseCase } from '@producer/application/use-cases/updateProducerUsecase';
import { Producer } from '@producer/application/entities/producer';
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';

let producerRepository: ProducerInMemoryRepository;
let updateProducer: UpdateProducerUseCase;

describe('Update producer use case', () => {
  beforeEach(async () => {
    producerRepository = new ProducerInMemoryRepository();
    updateProducer = new UpdateProducerUseCase(producerRepository);
  });

  it('should be able to update one producer', async () => {
    const producer = await producerRepository.create(new Producer(producerMock));

    const updatedProducer = await updateProducer.execute({
      producerId: producer._id!,
      ...producerMock,
      name: 'John Doe',
    });

    expect(producerRepository.producers.size).toBe(1);
    expect(producer.id).toEqual(updatedProducer.id);
    expect(updatedProducer.name).toEqual('John Doe');
  });

  it('should be able to throw an error if producer not found', async () => {
    await expect(
      updateProducer.execute({
        producerId: 1,
        ...producerMock,
        name: 'John Doe',
      }),
    ).rejects.toEqual(new NotFoundException('Producer not found'));
  });

  it('should be able to throw an error if producer not provided cpf or cnpj', async () => {
    const producer = await producerRepository.create(new Producer(producerMock));

    await expect(
      updateProducer.execute({
        producerId: producer.id!,
        ...producerMockUpdate,
      }),
    ).rejects.toEqual(new UnprocessableEntityException('You must provide at least a CPF or a CNPJ'));
  });

  it('should be able to throw an error if cpf is invalid', async () => {
    const producer = await producerRepository.create(new Producer(producerMock));

    await expect(
      updateProducer.execute({
        producerId: producer.id!,
        ...producerMock,
        cpf: '2',
      }),
    ).rejects.toEqual(new UnprocessableEntityException('Invalid CPF'));
  });

  it('should be able to throw an error if  cnpj is invalid', async () => {
    const producer = await producerRepository.create(new Producer(producerMock));

    await expect(
      updateProducer.execute({
        producerId: producer.id!,
        ...producerMock,
        cnpj: '2',
      }),
    ).rejects.toEqual(new UnprocessableEntityException('Invalid CNPJ'));
  });

  it('should be able to throw an error if cnpj or cpf is in use', async () => {
    const producer = await producerRepository.create(new Producer(producerMock));
    const producerTwo = await producerRepository.create(new Producer(producerMockTwo));

    await expect(
      updateProducer.execute({
        producerId: producerTwo.id!,
        ...producerMock,
        cnpj: producer.cnpj,
      }),
    ).rejects.toEqual(new UnprocessableEntityException('Another producer already uses this CPF or CNPJ'));
  });
});
