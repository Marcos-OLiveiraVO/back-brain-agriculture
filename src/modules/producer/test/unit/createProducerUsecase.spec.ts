import { CreateProducerUseCase } from '@producer/application/use-cases/createProducerUsecase';
import { ProducerInMemoryRepository } from '../in-MemoryRepository/producerInMemoryRepository';
import { UnprocessableEntityException } from '@nestjs/common';
import { producerMock } from '../mockData/producerMock';

let producerRepository: ProducerInMemoryRepository;
let createProducer: CreateProducerUseCase;

describe('Create producer use case', () => {
  beforeEach(async () => {
    producerRepository = new ProducerInMemoryRepository();
    createProducer = new CreateProducerUseCase(producerRepository);
  });

  it('should be able to create one producer', async () => {
    await createProducer.execute(producerMock);

    expect(producerRepository.producers.size).toBe(1);
  });

  it('should not be able to create a producer if document already exists', async () => {
    await createProducer.execute(producerMock);

    await expect(createProducer.execute(producerMock)).rejects.toEqual(
      new UnprocessableEntityException('Producer already exists with this cnpj or cpf exists'),
    );
  });

  it('should not be able to create a producer with invalid cpf', async () => {
    await expect(createProducer.execute({ ...producerMock, cpf: '3' })).rejects.toEqual(
      new UnprocessableEntityException('Invalid CPF'),
    );
  });

  it('should not be able to create a producer with invalid cnpj', async () => {
    await expect(createProducer.execute({ ...producerMock, cnpj: '3' })).rejects.toEqual(
      new UnprocessableEntityException('Invalid CNPJ'),
    );
  });
});
