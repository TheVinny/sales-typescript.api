import CostumersRepository from '@modules/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Costumer from '@modules/entities/Costumer';
import AppError from '@shared/errors/AppError';

interface ICostumers {
  id?: string;
  name: string;
  email: string;
}

class CostumersService {
  public async List(): Promise<Costumer[]> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const repository = await costumerRepository.find();

    return repository;
  }

  public async create({ name, email }: ICostumers): Promise<Costumer> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const hasEmail = await costumerRepository.findByEmail(email);

    if (hasEmail) throw new AppError('Email already exists', 409);

    const costumer = costumerRepository.create({
      name,
      email,
    });

    await costumerRepository.save(costumer);

    return costumer;
  }

  public async getOne(id: string): Promise<Costumer> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const costumer = await costumerRepository.findById(id);

    if (!costumer) throw new AppError('Costumer not found', 404);

    return costumer;
  }

  public async updateCostumer({
    id,
    name,
    email,
  }: ICostumers): Promise<Costumer> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const costumer = await costumerRepository.findById(id as string);

    if (!costumer) throw new AppError('Costumer id not found', 404);

    const hasEmail = await costumerRepository.findByEmail(email);

    if (hasEmail && email !== costumer.email)
      throw new AppError('Email already exists', 409);

    costumer.name = name;
    costumer.email = email;

    await costumerRepository.save(costumer);

    return costumer;
  }

  public async deleteCostumer(id: string): Promise<void> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const costumer = await costumerRepository.findById(id);

    if (!costumer) throw new AppError('Costumer id not found', 404);

    await costumerRepository.remove(costumer);
  }
}

export default CostumersService;
