import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '../src/server';
import User from '../src/entity/User';
import { CreateGoalDTO } from '../src/dtos/goalDto/createGoal.dto';
import { UpdateGoalDTO } from '../src/dtos/goalDto/updateGoal.dto';

describe('Create goal test', () => {
    it('should create goal successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');

        const IdOneUser: User = await allUser.body[0].idUser;

        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createGoal: CreateGoalDTO = {
            goal: `name_${hash}`,
            currentValue: hash,
            totalValue: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/goal').send(createGoal);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('idGoal');
    });

    it('dont should create goal successfully | User not found', async () => {
        const IdOneUser = 100000 as unknown as User;

        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createGoal: CreateGoalDTO = {
            goal: `name_${hash}`,
            currentValue: hash,
            totalValue: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/goal').send(createGoal);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('dont should create goal successfully | some field not provided', async () => {
        const allUser = await supertest(app).get('/test_route/user');

        const IdOneUser: User = await allUser.body[0].idUser;

        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createGoal: CreateGoalDTO = {
            goal: ``,
            currentValue: hash,
            totalValue: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/goal').send(createGoal);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Get all goal test', () => {
    it('should get all goal successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');

        const IdOneUser: number = await allUser.body[0].idUser;

        const response = await supertest(app).get(`/test_route/goal/${IdOneUser}`);

        expect(response.status).toEqual(200);
        expect(response.body[0]).toHaveProperty('idGoal');
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('Update goal test', () => {
    it('should update goal successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');

        const IdOneUser: number = await allUser.body[0].idUser;

        const allGoal = await supertest(app).get(`/test_route/goal/${IdOneUser}`);

        const { idGoal, user } = await allGoal.body[0];

        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateGoal: UpdateGoalDTO = {
            goal: `name_${hash}`,
            currentValue: hash,
            totalValue: hash,
        };

        const response = await supertest(app).put(`/test_route/goal/${idGoal}/${user}`).send(updateGoal);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idGoal');
    });

    it('dont should update goal successfully | goal not found', async () => {
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateGoal: UpdateGoalDTO = {
            goal: `name_${hash}`,
            currentValue: hash,
            totalValue: hash,
        };

        const response = await supertest(app).put(`/test_route/goal/100000/100000`).send(updateGoal);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Goal not found');
    });

    it('dont should update goal successfully | some field not provided', async () => {
        const allUser = await supertest(app).get('/test_route/user');

        const IdOneUser: number = await allUser.body[0].idUser;

        const allGoal = await supertest(app).get(`/test_route/goal/${IdOneUser}`);

        const { idGoal, user } = await allGoal.body[0];

        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateGoal: UpdateGoalDTO = {
            goal: `name_${hash}`,
            currentValue: 0,
            totalValue: hash,
        };

        const response = await supertest(app).put(`/test_route/goal/${idGoal}/${user}`).send(updateGoal);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Delete goal test', () => {
    it('should delete goal successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');

        const IdOneUser: number = await allUser.body[0].idUser;

        const allGoal = await supertest(app).get(`/test_route/goal/${IdOneUser}`);

        const { idGoal, user } = await allGoal.body[0];

        const response = await supertest(app).delete(`/test_route/goal/${idGoal}/${user}`);

        expect(response.status).toEqual(200);
    });

    it('dont should delete goal successfully | goal not found', async () => {
        const response = await supertest(app).delete('/test_route/goal/100000/100000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Goal not found');
    });
});
