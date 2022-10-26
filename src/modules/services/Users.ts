import AppError from '@shared/errors/AppError';
import path from 'path';
import User from '@modules/entities/User';
import UserRepository from '@modules/repositories/UserRepository';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { isAfter, addHours } from 'date-fns';
import JWT from 'jsonwebtoken';
import upload from '@config/upload';
import fs, { readFileSync } from 'fs';
import UserTokenRepository from '@modules/repositories/UserTokenRepository';
import Ethereal from '@config/mails/Ethereal';

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

  async updateAvatar({ avatarFile, user_id }: IAvatarFile): Promise<User> {
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

  public async sendForgotPasswordEmail(email: string): Promise<void> {
    const repositoryUser = getCustomRepository(UserRepository);

    const repositoryUserToken = getCustomRepository(UserTokenRepository);

    const user = await repositoryUser.findByEmail(email);

    if (!user) throw new AppError('User email not found', 404);

    const { token } = await repositoryUserToken.generateToken(user.id);

    const forgotTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'config',
      'mails',
      'views',
      'forgot_password.hbs',
    );

    await Ethereal.sendMail({
      to: { name: user.name, email: user.email },
      subject: 'Recuperação de senha!',
      template: {
        file: forgotTemplate,
        variables: {
          link: `http://localhost:3000/reset_password?token=${token}`,
          name: user.name,
        },
      },
    });
  }

  public async resetPassword(password: string, token: string): Promise<void> {
    const repositoryUser = getCustomRepository(UserRepository);

    const repositoryUserToken = getCustomRepository(UserTokenRepository);

    const userToken = await repositoryUserToken.findByToken(token as string);

    if (!userToken) throw new AppError('UserToken not exists', 404);

    const user = await repositoryUser.findById(userToken.user_id);

    if (!user) throw new AppError('user not exists', 404);

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired', 401);
    }

    const hashPassword = await hash(password, 8);

    user.password = hashPassword;

    await repositoryUser.save(user);
  }
}
export default UsersService;
