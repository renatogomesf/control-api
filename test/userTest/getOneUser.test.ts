import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/server';
import { AppDataSource } from '../../src/data-source';

beforeAll(() => {
    AppDataSource.initialize();
});

describe('Get one user test', () => {
    it('shold get one user successfully', async () => {
        const response = await supertest(app).get('/v1/getoneuser/1');

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idUser');
    });

    it('dont shold get one user successfully | user not found', async () => {
        const response = await supertest(app).get('/v1/getoneuser/10000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'user not found');
    });

    it('dont shold get one user successfully | id not provided', async () => {
        const response = await supertest(app).get('/v1/getoneuser');

        expect(response.status).toEqual(404);
    });
});
