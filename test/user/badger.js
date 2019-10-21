const config = require('../../src/server/config/config');
const request = require('supertest')('http://127.0.0.1:' + config.auth.PORT_EXPRESS);
const expect = require("chai").expect;

describe('Badger Route Test', function () {
    describe('GET', function () {
        it('should be Badgeuse intelligente : badger', async () => {
            const res = await request.get('/badger');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Badgeuse intelligente : badger')
        });
    });
    describe('POST', function () {
        var token = '';
        before(async () => {
            token = await request
                .post('/login')
                .send({
                    "action": "tryConnect",
                    "userMail": "florent.bourgeois@uha.fr",
                    "password": "uha"
                });
            token = token['body'].token;
        });
        // it('should set a user to \'present\' on setPresence', async () => {
        //     const res = await request
        //         .post('/badger')
        //         .send({
        //             "token": token,
        //             "action": "setPresence",
        //             "id_user": 1
        //         });
        //     console.log(res.body);
        //     expect(res.body).to.have.property("message")
        //         .to.equal("Vous avez pointé PRESENT.");
        // });
        it('should set a user to \'absent\' on setPresence', async () => {
            const res = await request
                .post('/badger')
                .send({
                    "token": token,
                    "action": "setPresence",
                    "id_user": 1,
                    "presence": 1
                });
            expect(res.body).to.have.property("message")
                .to.equal("Vous avez pointé ABSENT.");
        });
        it('should display an error when there is no token', async () => {
            const res = await request
                .post('/badger')
                .send({});
            expect(res.body).to.have.property("message")
                .to.equal("Vous n\'avez rien à faire ici !");
        });

    });
});
