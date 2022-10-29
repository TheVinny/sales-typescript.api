import Redis, { Redis as RedisClient } from 'ioredis';

import redis from '@config/redis/redis';

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    //instacinha o Redis passando a config como parametro
    this.client = new Redis(redis.config.redis);
  }

  public async save(key: string, value: unknown): Promise<void> {
    // salva os dados no redis atráves do método set passando a chave e dando o parse pra string
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    // recupera os dados no redis atráves do get passando a chave e dando o parse pra objeto novamente
    const recoverItens = await this.client.get(key);

    if (!recoverItens) {
      return null;
    }

    const parseJson = JSON.parse(recoverItens) as T;

    return parseJson;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
