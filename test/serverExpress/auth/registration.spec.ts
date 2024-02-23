import supertest from "supertest";
import { start } from "../../../src/presentation/express";

const request = supertest(start);


describe('TEST', () => {
    it('test work', async () => {   
        //const res = await request.get('');
        //const response = await request.get('account/get');
        //expect(response.status).toBe(200);
        //expect(response.body).toBe('array');
    });
});