import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '../src/server';
import User from '../src/entity/User';
import { CreateExpenseDTO } from '../src/dtos/expenseDto/createExpense.dto';
import { UpdateExpenseDTO } from '../src/dtos/expenseDto/updateExpense.dto';

describe('Create expense test', () => {
    it('should create expense successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createExpense: CreateExpenseDTO = {
            date: date,
            description: 'any description',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/expense').send(createExpense);

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('idExpense');
    });

    it('dont should create expense successfully | user not found', async () => {
        const IdOneUser = 1000000 as unknown as User;

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createExpense: CreateExpenseDTO = {
            date: date,
            description: 'any description',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/expense').send(createExpense);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('dont should create expense successfully | some field not provided', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const createExpense: CreateExpenseDTO = {
            date: date,
            description: '',
            value: hash,
            idUser: IdOneUser,
        };

        const response = await supertest(app).post('/test_route/expense').send(createExpense);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Get all expense test', () => {
    it('should get one expense successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const response = await supertest(app).get(`/test_route/expense/${IdOneUser}`);

        expect(response.status).toEqual(200);
        expect(response.body[0]).toHaveProperty('idExpense');
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('Update expense test', () => {
    it('should update expense successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const allexpense = await supertest(app).get(`/test_route/expense/${IdOneUser}`);

        const { idExpense, user } = allexpense.body[0];

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateExpense: UpdateExpenseDTO = {
            date: date,
            description: 'any description update',
            value: hash,
        };

        const response = await supertest(app).put(`/test_route/expense/${idExpense}/${user}`).send(updateExpense);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('idExpense');
    });

    it('dont should update expense successfully | expense not found', async () => {
        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateExpense: UpdateExpenseDTO = {
            date: date,
            description: 'any description update',
            value: hash,
        };

        const response = await supertest(app).put(`/test_route/expense/100000/100000`).send(updateExpense);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Expense not found');
    });

    it('dont should update expense successfully | some field not provided', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const allexpense = await supertest(app).get(`/test_route/expense/${IdOneUser}`);

        const { idExpense, user } = allexpense.body[0];

        const date = '2025-11-12';
        const hash: number = Math.floor(Math.random() * 1_000_000) + 1;

        const updateExpense: UpdateExpenseDTO = {
            date: date,
            description: '',
            value: hash,
        };

        const response = await supertest(app).put(`/test_route/expense/${idExpense}/${user}`).send(updateExpense);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('message', 'All fields are required');
    });
});

describe('Delete expense test', () => {
    it('should delete expense successfully', async () => {
        const allUser = await supertest(app).get('/test_route/user');
        const IdOneUser: User = await allUser.body[0].idUser;

        const allexpense = await supertest(app).get(`/test_route/expense/${IdOneUser}`);

        const { idExpense, user } = allexpense.body[0];

        const response = await supertest(app).delete(`/test_route/expense/${idExpense}/${user}`);

        expect(response.status).toEqual(200);
    });

    it('dont should delete expense successfully | expense not found', async () => {
        const response = await supertest(app).delete('/test_route/expense/100000/100000');

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('message', 'Expense not found');
    });
});
