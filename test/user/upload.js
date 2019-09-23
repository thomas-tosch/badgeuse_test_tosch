const request = require('supertest')('http://127.0.0.1:8080');
const expect = require("chai").expect;

describe('Upload Route Test', function () {
    describe('GET', function () {
        it('should be Badgeuse intelligente : Upload', async () => {
            const res = await request.get('/upload');
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('Badgeuse intelligente : Upload')
        });
    });
    describe('POST', function () {
        it('should display a 500 error when no data is sent', async () => {
            const res = await request
                .post('/upload')
                .send({});
            expect(res.status).to.equal(500);
        });
        it('should return an error if the file type is incorrect', async () => {
            const res = await request
                .post('/upload')
                .attach('justificatif', __dirname + '/wrong_file.txt');
            expect(res.text).to.equal("error");
        });
        it('should return a 500 since Upload is not working as intended', async () => {
            const res = await request
                .post('/upload')
                .attach('justificatif', __dirname + '/10-2019correct_file.jpg');
            expect(res.status).to.equal(500);
        });
    });
});