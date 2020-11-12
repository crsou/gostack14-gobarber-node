import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
      // never tell the user which info was incorrect during login, it prevents them from guessing.
    }

    // user.password -> senha criptografada
    // password -> senha não-criptografada

    const passwordMatched = await compare(password, user.password);

    // use await whenever a function returns a Promise. Hover it to find out the return type.

    if (!passwordMatched) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
