import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not authenticated.', 401);
    }

    if (user.avatar) {
      /**
       * delete previous avatar
       */

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    /**
     * '.save' either creates a new entry or updates it.
     * it'll check if the user exists (if it has an id)
     * if it does not, it'll create one. If it does, it'll update.
     * here it is known for sure that the user exists, due to needing authentication
     */
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
