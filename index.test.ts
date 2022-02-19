import {app} from "./index";
import request from "supertest";
import * as TimeFormat from "hh-mm-ss";

let idToTest: string;

describe('Space test suite', () => {
    it('test post(`/`) endpoint', async() => {
        const title = 'Nowy ten teges';
        const response = await request(app)
            .post(`/`)
            .type('form')
            .send({'title': title});

        idToTest = response.text.slice(response.text.indexOf(`<form method="POST" action="/`)+29, response.text.indexOf(`?_method=PATCH" >`));
        expect(response.status).toBe(200);
        expect(response.headers[`content-type`]).toBe('text/html; charset=utf-8');
        expect(response.headers[`connection`]).toBe('close');

    });

    it('test get(`/`) endpoint', async() => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.headers[`content-type`]).toBe('text/html; charset=utf-8');
        expect(response.headers[`connection`]).toBe('close');

    });

    it('test get(`/get-time`) endpoint', async() => {
        const response = await request(app).get("/get-time");

        expect(response.status).toBe(200);
        expect(response.headers[`content-type`]).toBe('application/json; charset=utf-8');
        expect(response.headers[`connection`]).toBe('close');

    });
    it('test get(`/get-data/:id`) endpoint', async() => {

        const response = await request(app).get(`/get-data/${idToTest}`);

        expect(TimeFormat.toS(response.body) <= 1);
        expect(response.status).toBe(200);
        expect(response.headers[`content-type`]).toBe('application/json; charset=utf-8');
        expect(response.headers[`connection`]).toBe('close');

    });

    it('test patch(`/`) endpoint', async() => {
        const response = await request(app).patch(`/${idToTest}`);

        expect(response.status).toBe(200);
        expect(response.headers[`content-type`]).toBe('text/html; charset=utf-8');
        expect(response.headers[`connection`]).toBe('close');
    });

    it('test delete(`/`) endpoint', async() => {
        const response = await request(app).delete(`/${idToTest}`);

        expect(response.status).toBe(200);
        expect(response.headers[`content-type`]).toBe('text/html; charset=utf-8');
        expect(response.headers[`connection`]).toBe('close');
    });
    it('test get(`/docs`) endpoint', async() => {
        const response = await request(app).get("/docs");
        expect(response.status).toBe(200);
        expect(response.headers[`content-type`]).toBe('text/html; charset=utf-8');
        expect(response.headers[`connection`]).toBe('close');

    });

});