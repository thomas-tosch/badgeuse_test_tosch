const config = require('../../server/config/config');
const request = require('supertest')('http://127.0.0.1:' + config.auth.PORT_EXPRESS);
const expect = require("chai").expect;

describe('Login Route Test', function () {
    describe('GET', function () {
        it('should be Badgeuse intelligente : Login', async () => {
            const res = await request.get('/login');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Badgeuse intelligente : Login')
        });
    });
    describe('POST', function () {
        it('should display an error when payload is wrong', async () => {
            const res = await request
                .post("/login")
                .send(
                    {
                        "action": "tryConnect",
                        "userMail": "",
                        "password": ""
                    }
                );
            expect(res.status).to.equal(200)
            expect(res.body).to.have.property("message")
                .to.equal("Le nom d'utilisateur doit avoir un minimum de 3 caractères" +
                " et ne doit pas dépasser 255 caractères !")
        });
        it('should contain a token when correct credentials are sent', async () => {

            const res = await request
                .post("/login")
                .send(
                    {
                        "action": "tryConnect",
                        "userMail": "florent.bourgeois@uha.fr",
                        "password": "uha"
                    }
                );
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("token")
                .to.have.lengthOf.above(10)
        });
        it('should alert when mail is incorrect', async () => {
            const res = await request
                .post("/login")
                .send(
                    {
                        "action": "tryConnect",
                        "userMail": "florent.bourgeois@uha.frz",
                        "password": "uha"
                    }
                );
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message")
                .to.equal("Le nom de compte n'éxiste pas !")
        });
        it('should alert when password is incorrect', async () => {
            const res = await request
                .post("/login")
                .send(
                    {
                        "action": "tryConnect",
                        "userMail": "florent.bourgeois@uha.fr",
                        "password": "uhaaa"
                    }
                );
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property("message")
                .to.equal("Le mot de passe est incorrect !")
        });
    });
});