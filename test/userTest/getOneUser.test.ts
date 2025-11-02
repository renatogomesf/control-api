import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/server';
import { AppDataSource } from '../../src/data-source';

beforeAll(async () => {
    await AppDataSource.initialize();
});

describe('Get one user test', () => {
    it('should get one user successfully', async () => {
        const allUser = await supertest(app).get('/v1/getalluser');

        const IdOneUser: number = await allUser.body[0].idUser;

        const response = await supertest(app).get(`/v1/getoneuser/${IdOneUser}`);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idUser');
    });

    it('dont should get one user successfully | user not found', async () => {
        const response = await supertest(app).get('/v1/getoneuser/100000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'user not found');
    });

    it('dont should get one user successfully | id not provided', async () => {
        const response = await supertest(app).get('/v1/getoneuser');

        expect(response.status).toEqual(404);
    });
});
