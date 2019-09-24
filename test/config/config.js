const expect = require("chai").expect;
const rewire = require('rewire');
require('../../server/config/config');
const configRewire = rewire('../../server/config/config');
const makeId = configRewire.__get__('makeId');

describe('Config file Testing', function () {
   describe('#MakeId()', function () {
       it('should return a value of any size', function () {
           let id = null;
           id = makeId();
           expect(id).to.not.be.null;
           expect(id).to.be.lengthOf(5);
       });
       it('should be random and not pass the same number 2 times', function () {
           let id = [];
           for (let i = 0; i < 10; i++) {
               id[i] = makeId();
           }
           expect((new Set(id)).size !== id.length).to.equal(false)
       });
   })
});