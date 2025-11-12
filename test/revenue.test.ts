import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../src/server';
import { AppDataSource } from '../src/data-source';
import User from '../src/entity/User';
import { CreateRevenueDTO } from '../src/dtos/revenueDto/createRevenue.dto';
import { UpdateRevenueDTO } from '../src/dtos/revenueDto/updateRevenue.dto';

beforeAll(async () => {
    await AppDataSource.initialize();
});

describe('Create revenue test', () => {
    it('should create revenue successfully', async () => {
        const allUser = await supertest(app).get('/v1/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const date = '2025-11-12' as unknown as Date;
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createRevenue: CreateRevenueDTO = {
            date: date,
            description: 'any description',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/v1/revenue').send(createRevenue);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('idRevenue');
    });

    it('dont should create revenue successfully | user not found', async () => {
        const IdOneUser = 1000000 as unknown as User;

        const date = '2025-11-12' as unknown as Date;
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createRevenue: CreateRevenueDTO = {
            date: date,
            description: 'any description',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/v1/revenue').send(createRevenue);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('dont should create revenue successfully | some field not provided', async () => {
        const allUser = await supertest(app).get('/v1/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const date = '2025-11-12' as unknown as Date;
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createRevenue: CreateRevenueDTO = {
            date: date,
            description: '',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/v1/revenue').send(createRevenue);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Get one revenue test', () => {
    it('should get one revenue successfully', async () => {
        const allRevenue = await supertest(app).get('/v1/revenue');

        const { idRevenue, user } = allRevenue.body[0];

        const response = await supertest(app).get(`/v1/revenue/${idRevenue}/${user}`);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idRevenue');
    });

    it('dont should get one revenue successfully | revenue not found', async () => {
        const response = await supertest(app).get(`/v1/revenue/100000/100000`);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Revenue not found');
    });
});

describe('Get all revenue test', () => {
    it('should get one revenue successfully', async () => {
        const response = await supertest(app).get('/v1/revenue');

        expect(response.status).toEqual(200);
        expect(response.body[0]).toHaveProperty('idRevenue');
    });
});

describe('Update revenue test', () => {
    it('should update revenue successfully', async () => {
        const allRevenue = await supertest(app).get('/v1/revenue');

        const { idRevenue, user } = allRevenue.body[0];

        const date = '2025-11-12' as unknown as Date;
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateRevenue: UpdateRevenueDTO = {
            date: date,
            description: 'any description update',
            value: hash,
        };

        const response = await supertest(app).put(`/v1/revenue/${idRevenue}/${user}`).send(updateRevenue);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idRevenue');
    });

    it('dont should update revenue successfully | revenue not found', async () => {
        const date = '2025-11-12' as unknown as Date;
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateRevenue: UpdateRevenueDTO = {
            date: date,
            description: 'any description update',
            value: hash,
        };

        const response = await supertest(app).put(`/v1/revenue/100000/100000`).send(updateRevenue);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Revenue not found');
    });

    it('dont should update revenue successfully | some field not provided', async () => {
        const allRevenue = await supertest(app).get('/v1/revenue');

        const { idRevenue, user } = allRevenue.body[0];

        const date = '2025-11-12' as unknown as Date;
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateRevenue: UpdateRevenueDTO = {
            date: date,
            description: '',
            value: hash,
        };

        const response = await supertest(app).put(`/v1/revenue/${idRevenue}/${user}`).send(updateRevenue);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Delete revenue test', () => {
    it('should delete revenue successfully', async () => {
        const allRevenue = await supertest(app).get('/v1/revenue');

        const { idRevenue, user } = allRevenue.body[0];

        const response = await supertest(app).delete(`/v1/revenue/${idRevenue}/${user}`);

        expect(response.status).toEqual(200);
    });

    it('dont should delete goal successfully | revenue not found', async () => {
        const response = await supertest(app).delete('/v1/revenue/100000/100000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Revenue not found');
    });
});