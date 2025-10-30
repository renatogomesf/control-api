import { describe, it, expect, beforeAll } from 'vitest';
import supertest, { Test } from 'supertest';
import app from '../src/server';
import { AppDataSource } from '../src/data-source';
import TestAgent from 'supertest/lib/agent';

let server: TestAgent<Test>;

beforeAll(() => {
    AppDataSource.initialize();

    server = supertest(app)
});

describe('Login test', () => {
    it('shold login successfully', async () => {
        const user = {
            email: 'faisca@gmail.com',
            password: '222',
        };

        const response = await server.post('/login').send(user);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('token');
    });

    it('dont shold login successfully | incorrect email or password', async () => {
        const user = {
            email: 'renato@gmail.com',
            password: '222',
        };

        const response = await server.post('/login').send(user);

        expect(response.status).toEqual(401);
        expect(response.body).toHaveProperty('message','incorrect email or password');
    });

    it('dont shold login successfully | password not provided', async () => {
        const user = {
            email: 'faisca@gmail.com',
            password: '',
        };

        const response = await server.post('/login').send(user);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message','all fields are required');
    });

    it('dont shold login successfully | email not provided', async () => {
        const user = {
            email: '',
            password: '123',
        };

        const response = await server.post('/login').send(user);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message','all fields are required');
    });

    it('dont shold login successfully | Email and password not provided', async () => {
        const user = {
            email: '',
            password: '',
        };

        const response = await server.post('/login').send(user);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message','all fields are required');
    });
});
