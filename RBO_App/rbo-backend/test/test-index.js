let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();
 
chai.use(chaiHttp);
//the parent block
describe('backend root', () => {
 it('it should return a 404', () => {
   chai.request(app)
       .get('/')
       .end((err, res) => {
           res.should.have.status(404);
       });
 });
});
