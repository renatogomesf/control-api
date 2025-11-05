import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { UserDTO } from '../dtos/userDto/user.dto';
import User from '../entity/User';
import { userRepository } from '../repositories/userRepository';

const initialize = async () => {
    await AppDataSource.initialize();
};

const createUser = async () => {
    const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

    const user: UserDTO = new User();

    user.name = `name_${hash}`;
    user.lastName = `lastName_${hash}`;
    user.email = `email_${hash}@gmail.com`;
    user.password = '999';

    const userCreated: UserDTO = await userRepository.save(user);

    console.log(userCreated);
};

initialize().then(createUser);
