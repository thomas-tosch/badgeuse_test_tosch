const expect = require("chai").expect;
const rewire = require('rewire');
const sinon = require('sinon');
const rewireTokenList = rewire('../../src/server/config/tokenList');
const tokenList = require('../../server/config/tokenList');

describe('Token list Testing', function () {
    describe('#addToken()', function () {
        var clock;
        before(function () {
            clock = sinon.useFakeTimers();
        });
        it('should add the given token to the list', function () {
            tokenList.addToken('1234567890');
            expect(tokenList.checkToken('1234567890')).to.equal(true);
        });
        it('should remove the token after 3hours', function () {
            tokenList.addToken('9876543210');
            expect(tokenList.checkToken('9876543210')).to.equal(true);
            clock.tick(10800001);
            expect(tokenList.checkToken('9876543210')).to.equal(false);
        });
        after(function () {
            clock.restore();
        })
    });
    describe('#delToken()', function () {
        it('should remove a token from the list', function () {
            tokenList.delToken('1234567890');
            expect(tokenList.checkToken('1234567890')).to.equal(false);
        });
    });
});