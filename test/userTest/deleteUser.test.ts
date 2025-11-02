import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/server';
import { AppDataSource } from '../../src/data-source';

beforeAll(async () => {
    await AppDataSource.initialize();
});

describe('Delete one user test', () => {
    it('should delete user successfully', async () => {
        const allUser = await supertest(app).get('/v1/getalluser');

        const IdOneUser: number = await allUser.body[0].idUser;

        const response = await supertest(app).delete(`/v1/deleteuser/${IdOneUser}`);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('name');
    });

    it('dont should delete user successfully | user not found', async () => {
        const response = await supertest(app).delete('/v1/deleteuser/100000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'user not found');
    });

    it('dont should delete user successfully | id not provided', async () => {
        const response = await supertest(app).get('/v1/deleteuser');

        expect(response.status).toEqual(404);
    });
});