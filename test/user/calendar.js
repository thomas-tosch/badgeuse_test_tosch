const request = require('supertest')('http://127.0.0.1:8080');
const expect = require("chai").expect;

describe('Calendar Route Test', function () {
    describe('GET', function () {
        it('should be Badgeuse intelligente : calendar', async () => {
            const res = await request.get('/calendar');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Badgeuse intelligente : calendar')
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
                .post('/calendar')
                .send({});
            expect(res.body).to.have.property("message")
                .to.equal("Vous n\'avez rien à faire ici !");
        });
        it('should return a list of values on getMonth', async () => {
            const res = await request
                .post('/calendar')
                .send({
                    "token": token,
                    "action": "getMonth",
                    "id_user": 1
                });
            expect(res.body).to.have.property("list");
        });
        it('should return a list of values on getWeek', async () => {
            const res = await request
                .post('/calendar')
                .send({
                    "token": token,
                    "action": "getWeek",
                    "id_user": 1
                });
            expect(res.body).to.have.property("list");
        });
    });
});