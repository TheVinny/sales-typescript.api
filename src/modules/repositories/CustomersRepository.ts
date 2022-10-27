import Costumer from '@modules/entities/Costumer';
import User from '@modules/entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Costumer)
class CostumersRepository extends Repository<Costumer> {
  public async findByName(name: string): Promise<Costumer | undefined> {
    const costumer = await this.findOne({
      where: [
        {
          name,
        },
      ],
    });
    return costumer;
  }

  public async findByEmail(email: string): Promise<Costumer | undefined> {
    const costumer = await this.findOne({
      where: [
        {
          email,
        },
      ],
    });
    return costumer;
  }

  public async findById(id: string): Promise<Costumer | undefined> {
    const costumer = await this.findOne({
      where: [
        {
          id,
        },
      ],
    });

    return costumer;
  }
}

export default CostumersRepository;
