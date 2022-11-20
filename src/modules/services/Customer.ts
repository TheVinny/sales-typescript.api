import CustomersRepository from '@modules/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import Costumer from '@modules/entities/Customer';
import AppError from '@shared/errors/AppError';

interface ICostumers {
  id?: string;
  name: string;
  email: string;
}

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Costumer[];
}

class CustomersService {
  public async List(): Promise<IPaginateCustomer> {
    const costumerRepository = getCustomRepository(CustomersRepository);

    const costumers = await costumerRepository.createQueryBuilder().paginate();

    return costumers as IPaginateCustomer;
  }

  public async create({ name, email }: ICostumers): Promise<Costumer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const hasEmail = await customerRepository.findByEmail(email);

    if (hasEmail) throw new AppError('Email already exists', 409);

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }

  public async getOne(id: string): Promise<Costumer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) throw new AppError('Customer not found', 404);

    return customer;
  }

  public async updateCustomer({
    id,
    name,
    email,
  }: ICostumers): Promise<Costumer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id as string);

    if (!customer) throw new AppError('Costumer id not found', 404);

    const hasEmail = await customerRepository.findByEmail(email);

    if (hasEmail && email !== customer.email)
      throw new AppError('Email already exists', 409);

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }

  public async deleteCustomer(id: string): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) throw new AppError('Costumer id not found', 404);

    await customerRepository.remove(customer);
  }
}

export default CustomersService;
