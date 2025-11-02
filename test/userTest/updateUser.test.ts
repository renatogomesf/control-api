import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/server';
import { AppDataSource } from '../../src/data-source';
import { UpdateUserDTO } from '../../src/dtos/userDto/updateUser.dto';

let IdUser: number;

beforeAll(async () => {
    await AppDataSource.initialize();
});

beforeAll(async () => {
    const allUser = await supertest(app).get('/v1/getalluser');
    const IdOneUser: number = await allUser.body[0].idUser;

    IdUser = IdOneUser;
});

describe('Update user test', () => {
    it('should update user', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).put(`/v1/updateuser/${IdUser}`).send(userUpdate);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idUser');
    });

    it('dont should update user | name not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: ``,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).put(`/v1/updateuser/${IdUser}`).send(userUpdate);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont should update user | lastName not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: `name_${hash}`,
            lastName: ``,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).put(`/v1/updateuser/${IdUser}`).send(userUpdate);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont should update user | email not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: ``,
            password: '999',
        };

        const response = await supertest(app).put(`/v1/updateuser/${IdUser}`).send(userUpdate);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont should update user | password not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '',
        };

        const response = await supertest(app).put(`/v1/updateuser/${IdUser}`).send(userUpdate);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont should update user | user not found', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).put(`/v1/updateuser/100000`).send(userUpdate);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'user not found');
    });
});
