import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../src/server';
import { AppDataSource } from '../src/data-source';
import { RegisterUserDTO } from './../src/dtos/register.dto';

beforeAll(async () => {
    await AppDataSource.initialize();
});

describe('Register test', () => {
    it('should register successfully', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userRegister: RegisterUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(userRegister);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('idUser');
    });

    it('dont should register successfully | name not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userRegister: RegisterUserDTO = {
            name: ``,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(userRegister);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont should register successfully | lastName not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userRegister: RegisterUserDTO = {
            name: `name_${hash}`,
            lastName: ``,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(userRegister);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont should register successfully | email not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userRegister: RegisterUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: ``,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(userRegister);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont should register successfully | password not provided', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userRegister: RegisterUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '',
        };

        const response = await supertest(app).post('/register').send(userRegister);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont should register successfully | email already registered', async () => {
        const allUser = await supertest(app).get('/v1/user');

        const { email }: { email: string } = await allUser.body[0];

        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const userRegister: RegisterUserDTO = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: email,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(userRegister);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'Email already registered');
    });
});
