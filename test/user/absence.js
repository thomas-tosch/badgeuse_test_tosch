const config = require('../../server/config/config');
const request = require('supertest')('http://127.0.0.1:' + config.auth.PORT_EXPRESS);
const expect = require("chai").expect;

describe('Absence Route Test', function () {
    describe('GET', function () {
        it('should be Badgeuse intelligente : Absence', async () => {
            const res = await request.get('/absence');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Badgeuse intelligente : Absence')
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
                .post('/absence')
                .send({});
            expect(res.text).to.equal("Vous n\'avez rien à faire ici !");
        });
        it('should return a list containing the reasons on getReason', async () => {
            const res = await request
                .post('/absence')
                .send({
                    "token": token,
                    "action": "getReason",
                    "id_user": 1
                });
            expect(res.body).to.have.property("list");
        });
        it('should return a list containing the references of absence on getRefAbsence', async () => {
            const res = await request
                .post('/absence')
                .send({
                    "token": token,
                    "action": "getRefAbsence",
                    "id_user": 1
                });
            expect(res.body).to.have.property("list");
        });
    });
});
