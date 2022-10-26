import AppError from '@shared/errors/AppError';
import path from 'path';
import User from '@modules/entities/User';
import UserRepository from '@modules/repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import JWT from 'jsonwebtoken';
import upload from '@config/upload';
import fs, { readFileSync } from 'fs';

interface IUser {
  name?: string;
  email: string;
  password: string;
  token?: string;
}

interface IAvatarFile {
  avatarFile: string;
  user_id: string;
}

class UsersService {
  public async create({ name, email, password }: IUser): Promise<User> {
    const repositoryUser = getCustomRepository(UserRepository);

    const hasEmail = await repositoryUser.findByEmail(email);

    const hashPassword = await hash(password, 8);

    if (hasEmail) throw new AppError('Email already exists', 409);

    const user = repositoryUser.create({
      name,
      email,
      password: hashPassword,
    });

    await repositoryUser.save(user);

    return user;
  }

  public async getAll(): Promise<User[]> {
    const repositoryUser = getCustomRepository(UserRepository);
    const users = await repositoryUser.find();
    return users;
  }

  public async createAuth({ email, password }: IUser): Promise<IUser> {
    const repositoryUser = getCustomRepository(UserRepository);

    const hasUser = await repositoryUser.findByEmail(email);

    if (!hasUser) throw new AppError('Email or password incorrect', 401);

    const passwordEquals = await compare(password, hasUser?.password);

    if (!passwordEquals) throw new AppError('Email or password incorrect', 401);

    const absPath = path.resolve('./', 'jwt.auth.key').toString();

    const secret = readFileSync(absPath, 'utf-8').split('=')[1];

    const token = JWT.sign({ id: hasUser.id }, secret, { expiresIn: '1d' });

    return { ...hasUser, token };
  }

  async updateAvatar({ avatarFile, user_id }: IAvatarFile) {
    const repositoryUser = getCustomRepository(UserRepository);

    const user = await repositoryUser.findById(user_id);

    if (!user) throw new AppError('User not found', 404);

    if (user.avatar) {
      const avatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFile = await fs.promises.stat(avatarFilePath);

      if (userAvatarFile) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatar = avatarFile;

    await repositoryUser.save(user);

    return user;
  }
}
export default UsersService;
