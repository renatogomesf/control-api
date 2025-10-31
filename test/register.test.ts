import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../src/server';
import { AppDataSource } from '../src/data-source';

beforeAll(() => {
    AppDataSource.initialize();
});

describe('Register test', () => {
    it('shold register successfully', async () => {
        const hash = Math.floor(Math.random() * 1_000_000) + 1;

        const user = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(user);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('idUser');
    });

    it('dont shold register successfully | name not provided', async () => {
        const hash = Math.floor(Math.random() * 1_000_000) + 1;

        const user = {
            name: ``,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(user);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont shold register successfully | lastName not provided', async () => {
        const hash = Math.floor(Math.random() * 1_000_000) + 1;

        const user = {
            name: `name_${hash}`,
            lastName: ``,
            email: `email_${hash}@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(user);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont shold register successfully | email not provided', async () => {
        const hash = Math.floor(Math.random() * 1_000_000) + 1;

        const user = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: ``,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(user);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont shold register successfully | password not provided', async () => {
        const hash = Math.floor(Math.random() * 1_000_000) + 1;

        const user = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `email_${hash}@gmail.com`,
            password: '',
        };

        const response = await supertest(app).post('/register').send(user);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'all fields are required');
    });

    it('dont shold register successfully | email already registered', async () => {
        const hash = Math.floor(Math.random() * 1_000_000) + 1;

        const user = {
            name: `name_${hash}`,
            lastName: `lastName_${hash}`,
            email: `faisca@gmail.com`,
            password: '999',
        };

        const response = await supertest(app).post('/register').send(user);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'email already registered');
    });
});
