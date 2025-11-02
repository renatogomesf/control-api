import { describe, it, expect, beforeAll } from 'vitest';
import supertest from 'supertest';
import app from '../../src/server';
import { AppDataSource } from '../../src/data-source';

beforeAll(async () => {
    await AppDataSource.initialize();
});


describe('Get all user test', () => {
    it("should bring all users", async ()=>{
        const response = await supertest(app).get('/v1/getalluser');

        expect(response.status).toEqual(200)
        expect(response.body.length).toBeGreaterThan(0)
        expect(response.body[0]).toHaveProperty("idUser")
        expect(response.body[0]).toHaveProperty("name")
        expect(response.body[0]).toHaveProperty("lastName")
    })
})