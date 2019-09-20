const request = require('supertest')('http://127.0.0.1:8080');
const expect = require("chai").expect;
require('../server/config/database');


describe('UUID Route Test', function () {

    describe('GET', function () {
        it('should be Badgeuse intelligente : UUID', async () => {
            const res = await request.get('/uuid');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Badgeuse intelligente : UUID')
        });
    });
    describe('POST', function () {
        before(async () => {
            const res = await db.query("UPDATE users u, users_extend ue SET ue.card = 55555555 WHERE u.id_user = ue.id_user AND u.id_user = 1;",
                [], (res) => {
                });
        });
        it('should display an error when payload is wrong', async () => {
            const res = await request
                .post("/uuid")
                .send(
                    {"uuid": 11111111111111}
                );
            expect(res.status).to.equal(500)
        });
        it('should behave correctly with weird payloads (SQLi attack)', async () => {
            const res = await request
                .post("/uuid")
                .send(
                    {"uuid": '57 AND (SELECT * FROM `users`)'}
                );
            expect(res.status).to.equal(500)
        });

        it('should work with correct payload', async () => {
            const res = await request
                .post("/uuid")
                .send(
                    {"uuid": '55555555'}
                );
            expect(res.status).to.equal(200)
        });
    });
});
