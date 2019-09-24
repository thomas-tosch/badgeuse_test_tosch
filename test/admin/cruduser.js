const request = require('supertest')('http://127.0.0.1:8080');
const expect = require("chai").expect;

describe('cruduser Route Test', function () {
    describe('GET', function () {
        it('should return all users from Users table', async () => {
            const res = await request.get('/cruduser');
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf.at.least(1);
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
                .post('/cruduser')
                .send({});
            expect(res.body).to.have.property("message").to.equal("Utilisateur non autorisé");
        });

        it('should add an user when sending correct payload', async () => {
            const res = await request
                .post('/cruduser')
                .send({
                    "token": token,
                    "user": {
                        "prenom_user": "Philippin",
                        "nom_user": "Margoulin",
                        "mail_user": "philippin.margoulin@uha.fr",
                        "id_role": 1
                    }
                });
            expect(res.body).to.have.property("message").to.equal("Success");
        });
    });
    describe('PUT', function () {
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
                .put('/cruduser')
                .send({});
            expect(res.body).to.have.property("message").to.equal("Utilisateur non autorisé");
        });

        it('should update an user when sending correct payload', async () => {
            const res = await request
                .post('/cruduser')
                .send({
                    "token": token,
                    "user": {
                        "prenom_user": "Philippin",
                        "nom_user": "Margoulin",
                        "mail_user": "philippin.margoulin@uha.fr",
                        "id_role": 1,
                        "card": "12345678"
                    }
                });
            expect(res.body).to.have.property("message").to.equal("Success");
        });
    });
    describe('DELETE', function () {
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
                .delete('/cruduser')
                .send({});
            expect(res.body).to.have.property("message").to.equal("Utilisateur non autorisé");
        });

        it('should remove an user when sending it\'s ID', async () => {
            const res = await request
                .delete('/cruduser')
                .send({
                    "token": token,
                    "id_user": 55
                });
            expect(res.status).to.equal(200);
        });
    });
});