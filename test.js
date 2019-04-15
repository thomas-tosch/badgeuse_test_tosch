const http = require('http');
const assert = require('assert');

describe('UUID Route Test', function () {
    before(function () {
        const uuid_value = '55555555'
    });
    describe('/uuid', function () {
        it('should be Badgeuse intelligente : UUID', function (done) {
            http.get('http://127.0.0.1:8080/uuid', function (response) {
                assert.equal(response.statusCode, 200);

                var body = '';
                response.on('data', function(d) {
                    body += d;
                });
                response.on('end', function() {
                    // Let's wait until we read the response, and then assert the body
                    // is 'Hello, Mocha!'.
                    assert.equal(body, 'Badgeuse intelligente : UUID');
                    done();
                });
            })
        })
        it('should ', function () {
            
        });
    });
});
