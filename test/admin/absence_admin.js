const request = require('supertest')('http://127.0.0.1:8080');
const expect = require("chai").expect;

describe('Absence_admin Route Test', function () {
    describe('GET', function () {
        it('should be Badgeuse intelligente : absence', async () => {
            const res = await request.get('/absence_admin');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Badgeuse intelligente : absence')
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
            const res = await db.query("INSERT INTO `absences` (`id_absences`, `id_user`, `ref_absence`, `id_status`, `absence_date`, `half_day`, `id_reason`, `comment_absences`, `certificate`, `raison_refus`)\n" +
                "VALUES ('1', '1', '1', '2', now(), '1', '1', NULL, NULL, NULL);",
                [], (res) => {
                });
        });
        it('should display an error when there is no token', async () => {
            const res = await request
                .post('/absence_admin')
                .send({});
            expect(res.body).to.have.property("message").to.equal("Vous n\'avez rien à faire ici !");
        });
        it('should return a list of absence on getUserListAbsence', async () => {
            const res = await request
                .post('/absence_admin')
                .send({
                    "token": token,
                    "action": "getUserListAbsence"
                });
            expect(res.body).to.have.property("list");
        });
        it('should update absences on getUpdateAbsence', async () => {
            const res = await request
                .post('/absence_admin')
                .send({
                    "token": token,
                    "action": "getUpdateAbsence",
                    "ref": "1",
                    "valide": "1",
                    "refus": "1"
                });
            expect(res.body).to.have.property("success").to.equal(true);
        });
    });
});