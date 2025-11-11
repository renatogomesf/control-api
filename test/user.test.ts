import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../src/server';
import { AppDataSource } from '../src/data-source';
import { UpdateUserDTO } from './../src/dtos/userDto/updateUser.dto';

let IdUser: number;

beforeAll(async () => {
    await AppDataSource.initialize();
});

beforeAll(async () => {
    const allUser = await supertest(app).get('/v1/user');
    const IdOneUser: number = await allUser.body[0].idUser;

    IdUser = IdOneUser;
});

describe('Get one user test', () => {
    it('should get one user successfully', async () => {
        const allUser = await supertest(app).get('/v1/user');

        const IdOneUser: number = await allUser.body[0].idUser;

        const response = await supertest(app).get(`/v1/user/${IdOneUser}`);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idUser');
    });

    it('dont should get one user successfully | user not found', async () => {
        const response = await supertest(app).get('/v1/user/100000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });
});

describe('Get all user test', () => {
    it('should get all users', async () => {
        const response = await supertest(app).get('/v1/user');

        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('idUser');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('lastName');
    });
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

        const response = await supertest(app).put(`/v1/user/${IdUser}`).send(userUpdate);

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

        const response = await supertest(app).put(`/v1/user/${IdUser}`).send(userUpdate);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });

    it('dont should update user | lastName not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: `name_${hash}`,
            lastName: ``,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).put(`/v1/user/${IdUser}`).send(userUpdate);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });

    it('dont should update user | email not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: ``,
            password: '999',
        };

        const response = await supertest(app).put(`/v1/user/${IdUser}`).send(userUpdate);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });

    it('dont should update user | password not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '',
        };

        const response = await supertest(app).put(`/v1/user/${IdUser}`).send(userUpdate);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });

    it('dont should update user | user not found', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userUpdate: UpdateUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).put(`/v1/user/100000`).send(userUpdate);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });
});

describe('Delete one user test', () => {
    it('should delete user successfully', async () => {
        const allUser = await supertest(app).get('/v1/user');

        const IdOneUser: number = await allUser.body[0].idUser;

        const response = await supertest(app).delete(`/v1/user/${IdOneUser}`);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('name');
    });

    it('dont should delete user successfully | user not found', async () => {
        const response = await supertest(app).delete('/v1/user/100000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });
});
