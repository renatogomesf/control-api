import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '../src/server';
import User from '../src/entity/User';
import { CreateAmountToPayDTO } from '../src/dtos/amountToPayDto/createAmountToPay.dto';
import { UpdateAmountToPayDTO } from '../src/dtos/amountToPayDto/updateAmountToPay.dto';

describe('Create amount to pay test', () => {
    it('should create amount to pay successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createAmountToPay: CreateAmountToPayDTO = {
            date: date,
            name: `name_${hash}`,
            description: 'any description',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/amounttopay').send(createAmountToPay);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('idAmountToPay');
    });

    it('dont should create amount to pay successfully | user not found', async () => {
        const IdOneUser = 1000000 as unknown as User;

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createAmountToPay: CreateAmountToPayDTO = {
            date: date,
            name: `name_${hash}`,
            description: 'any description',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/amounttopay').send(createAmountToPay);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('dont should create amount to pay successfully | some field not provided', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createAmountToPay: CreateAmountToPayDTO = {
            date: date,
            name: `name_${hash}`,
            description: '',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/amounttopay').send(createAmountToPay);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Get all amount to pay test', () => {
    it('should get one amount to pay successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const response = await supertest(app).get(`/test_route/amounttopay/${IdOneUser}`);

        expect(response.status).toEqual(200);
        expect(response.body[0]).toHaveProperty('idAmountToPay');
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('Update amount to pay test', () => {
    it('should update amount to pay successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const allAmountToPay = await supertest(app).get(`/test_route/amounttopay/${IdOneUser}`);

        const { idAmountToPay, user } = allAmountToPay.body[0];

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateAmountToReceive: UpdateAmountToPayDTO = {
            date: date,
            name: `name_${hash}`,
            description: 'any description update',
            value: hash,
        };

        const response = await supertest(app)
            .put(`/test_route/amounttopay/${idAmountToPay}/${user}`)
            .send(updateAmountToReceive);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idAmountToPay');
    });

    it('dont should update amount to pay successfully | amount to pay not found', async () => {
        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateAmountToReceive: UpdateAmountToPayDTO = {
            date: date,
            name: `name_${hash}`,
            description: 'any description update',
            value: hash,
        };

        const response = await supertest(app).put(`/test_route/amounttopay/100000/100000`).send(updateAmountToReceive);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Amount to pay not found');
    });

    it('dont should update amount to pay successfully | some field not provided', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const allAmountToPay = await supertest(app).get(`/test_route/amounttopay/${IdOneUser}`);

        const { idAmountToPay, user } = allAmountToPay.body[0];

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateAmountToReceive: UpdateAmountToPayDTO = {
            date: date,
            name: `name_${hash}`,
            description: '',
            value: hash,
        };

        const response = await supertest(app)
            .put(`/test_route/amounttopay/${idAmountToPay}/${user}`)
            .send(updateAmountToReceive);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Delete amount to pay test', () => {
    it('should delete amount to pay successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const allAmountToPay = await supertest(app).get(`/test_route/amounttopay/${IdOneUser}`);

        const { idAmountToPay, user } = allAmountToPay.body[0];

        const response = await supertest(app).delete(`/test_route/amounttopay/${idAmountToPay}/${user}`);

        expect(response.status).toEqual(200);
    });

    it('dont should delete amount to pay successfully | amount to pay not found', async () => {
        const response = await supertest(app).delete('/test_route/amounttopay/100000/100000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Amount to pay not found');
    });
});
