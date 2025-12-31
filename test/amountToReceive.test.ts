import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '../src/server';
import User from '../src/entity/User';
import { CreateAmountToReceiveDTO } from '../src/dtos/amountToReceiveDto/createAmountToReceive.dto';
import { UpdateAmountToReceiveDTO } from '../src/dtos/amountToReceiveDto/updateAmountToReceive.dto';

describe('Create amount to receive test', () => {
    it('should create amount to receive successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createAmountToReceive: CreateAmountToReceiveDTO = {
            date: date,
            name: `name_${hash}`,
            description: 'any description',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/amounttoreceive').send(createAmountToReceive);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('idAmountToReceive');
    });

    it('dont should create amount to receive successfully | user not found', async () => {
        const IdOneUser = 1000000 as unknown as User;

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createAmountToReceive: CreateAmountToReceiveDTO = {
            date: date,
            name: `name_${hash}`,
            description: 'any description',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/amounttoreceive').send(createAmountToReceive);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('dont should create amount to receive successfully | some field not provided', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createAmountToReceive: CreateAmountToReceiveDTO = {
            date: date,
            name: `name_${hash}`,
            description: '',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/amounttoreceive').send(createAmountToReceive);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Get all amount to receive test', () => {
    it('should get one amount to receive successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const response = await supertest(app).get(`/test_route/amounttoreceive/${IdOneUser}`);

        expect(response.status).toEqual(200);
        expect(response.body[0]).toHaveProperty('idAmountToReceive');
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('Update amount to receive test', () => {
    it('should update amount to receive successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const allAmountToReceive = await supertest(app).get(`/test_route/amounttoreceive/${IdOneUser}`);

        const { idAmountToReceive, user } = allAmountToReceive.body[0];

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateAmountToReceive: UpdateAmountToReceiveDTO = {
            date: date,
            name: `name_${hash}`,
            description: 'any description update',
            value: hash,
        };

        const response = await supertest(app)
            .put(`/test_route/amounttoreceive/${idAmountToReceive}/${user}`)
            .send(updateAmountToReceive);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idAmountToReceive');
    });

    it('dont should update amount to receive successfully | amount to receive not found', async () => {
        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateAmountToReceive: UpdateAmountToReceiveDTO = {
            date: date,
            name: `name_${hash}`,
            description: 'any description update',
            value: hash,
        };

        const response = await supertest(app)
            .put(`/test_route/amounttoreceive/100000/100000`)
            .send(updateAmountToReceive);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Amount to receive not found');
    });

    it('dont should update amount to receive successfully | some field not provided', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const allAmountToReceive = await supertest(app).get(`/test_route/amounttoreceive/${IdOneUser}`);

        const { idAmountToReceive, user } = allAmountToReceive.body[0];

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateAmountToReceive: UpdateAmountToReceiveDTO = {
            date: date,
            name: `name_${hash}`,
            description: '',
            value: hash,
        };

        const response = await supertest(app)
            .put(`/test_route/amounttoreceive/${idAmountToReceive}/${user}`)
            .send(updateAmountToReceive);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Delete amount to receive test', () => {
    it('should delete amount to receive successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const allAmountToReceive = await supertest(app).get(`/test_route/amounttoreceive/${IdOneUser}`);

        const { idAmountToReceive, user } = allAmountToReceive.body[0];

        const response = await supertest(app).delete(`/test_route/amounttoreceive/${idAmountToReceive}/${user}`);

        expect(response.status).toEqual(200);
    });

    it('dont should delete amount to receive successfully | amount to receive not found', async () => {
        const response = await supertest(app).delete('/test_route/amounttoreceive/100000/100000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Amount to receive not found');
    });
});
