import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../src/server';
import { AppDataSource } from '../src/data-source';
import { LoginUserDTO } from './../src/dtos/login.dto';

beforeAll(async () => {
    await AppDataSource.initialize();
});

describe('Login test', () => {
    it('should login successfully', async () => {
        const allUser = await supertest(app).get('/v1/user');

        const { email, password }: LoginUserDTO = await allUser.body[0];

        const userLogin: LoginUserDTO = {
            email: email,
            password: password,
        };

        const response = await supertest(app).post('/login').send(userLogin);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('token');
    });

    it('dont should login successfully | incorrect email or password', async () => {
        const userLogin: LoginUserDTO = {
            email: 'teste@gmail.com',
            password: '222',
        };

        const response = await supertest(app).post('/login').send(userLogin);

        expect(response.status).toEqual(401);
        expect(response.body).toHaveProperty('message', 'incorrect email or password');
    });

    it('dont should login successfully | password not provided', async () => {
        const userLogin: LoginUserDTO = {
            email: 'teste@gmail.com',
            password: '',
        };

        const response = await supertest(app).post('/login').send(userLogin);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });

    it('dont should login successfully | email not provided', async () => {
        const userLogin: LoginUserDTO = {
            email: '',
            password: '123',
        };

        const response = await supertest(app).post('/login').send(userLogin);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });

    it('dont should login successfully | Email and password not provided', async () => {
        const userLogin: LoginUserDTO = {
            email: '',
            password: '',
        };

        const response = await supertest(app).post('/login').send(userLogin);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});
