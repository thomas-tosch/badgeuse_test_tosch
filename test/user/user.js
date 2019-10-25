const config = require('../../server/config/config');
const request = require('supertest')('http://127.0.0.1:' + config.auth.PORT_EXPRESS);
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
        it('should display false when cheking for wrong token on checkToken', async () => {
            const res = await request
                .post('/user')
                .send({
                    "token": token,
                    "action": "checkToken"
                });
            expect(res.body).to.have.property("errorToken")
                .to.equal(false);
        });
        it('should return the user ID when the username is passed on getIdUser', async () => {
            const res = await request
                .post('/user')
                .send({
                    "token": token,
                    "action": "getIdUser",
                    "userName": "bourgeois florent"
                });
            expect(res.body).to.have.property("user")
                .to.equal(1);
        });
        it('should contain a user object on getDataUser', async () => {
            const res = await request
                .post('/user')
                .send({
                    "token": token,
                    "action": "getDataUser",
                    "id_user": 1
                });
            expect(res.body).to.have.property("user")
                .to.be.an('object').to.not.be.null;
        });
        it('should display a confirmation on update on updateGroup', async () => {
            const res = await request
                .post('/user')
                .send({
                    "token": token,
                    "action": "updateGroup",
                    "id_user": 1,
                    "id_group": 4
                });
            expect(res.body).to.have.property("message").to.equal("L'information a bien été mise à jour.")
        });
        it('should provide pieChartData and Reason given a start to end date on getPieChart', async () => {
            const res = await request
                .post('/user')
                .send({
                    "token": token,
                    "action": "getPieChart",
                    "id_user": 1,
                    "startDate": "",
                    "endDate": ""
                });
            expect(res.body).to.have.property('pieData');
            expect(res.body).to.have.property('pieReason');
        });
        it('should provide pieChartData and Reason given a start to end date on getPieChartAdmin', async () => {
            const res = await request
                .post('/user')
                .send({
                    "token": token,
                    "action": "getPieChartAdmin",
                    "startDate": "",
                    "endDate": ""
                });
            expect(res.body).to.have.property('PieData');
            expect(res.body).to.have.property('PieReason');
        });
    });
});