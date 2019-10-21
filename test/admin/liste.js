const config = require('../../src/server/config/config');
const request = require('supertest')('http://127.0.0.1:' + config.auth.PORT_EXPRESS);
const expect = require("chai").expect;

describe('Liste Route Test', function () {
    describe('GET', function () {
        it('should be Badgeuse intelligente : liste', async () => {
            const res = await request.get('/liste');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Badgeuse intelligente : liste')
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
        it('should display an error when there is no token', async () => {
            const res = await request
                .post('/liste')
                .send({});
            expect(res.body).to.have.property("message").to.equal("Vous n\'avez rien à faire ici !");
        });
        it('should return a list of user on getUserList', async () => {
            const res = await request
                .post('/liste')
                .send({
                    "token": token,
                    "action": "getUserList"
                });
            expect(res.body).to.have.property("list");
        });
    });
});