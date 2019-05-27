const http = require('http');
const assert = require('assert');

describe('UUID Route Test', function () {

    const endpoint = 'http://127.0.0.1:8080/uuid';

    const options = {
        hostname: '127.0.0.1',
        port: 8080,
        path: '/uuid',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const uuid_value = {
        uuid: '55555555'
    };

    describe('/uuid', function () {
        it('should be Badgeuse intelligente : UUID', function (done) {
            http.get(endpoint, function (response) {
                assert.equal(response.statusCode, 200);
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('end', function () {
                    assert.equal(body, 'Badgeuse intelligente : UUID');
                    done();
                });
            })
        });
    });
});
