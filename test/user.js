const request = require('supertest')('http://127.0.0.1:8080');
const expect = require("chai").expect;

describe('User Route Test', function () {
    describe('GET', function () {
        it('should be Badgeuse intelligente : user', async () => {
            const res = await request.get('/user');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Badgeuse intelligente : user')
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
                .post('/user')
                .send({});
            expect(res.body).to.have.property("message")
                .to.equal("Vous n'avez rien à faire ici ! USER");
        });
    });
});