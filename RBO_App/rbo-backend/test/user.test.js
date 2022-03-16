let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();

let mongoose = require('mongoose');
let User = require('../models/user.model');

chai.use(chaiHttp);

    //Testing POST /auth/signup
    describe('POST /auth/signup', () => {
        it('it should not POST a user without email field', (done) => {
            let user = {
                username: "user05",
                password: "123456789",
            };
            chai.request(app)
                .post('/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Content can not be empty!');
                    done();
                });
        });
        it('it should POST a user ', (done) => {
            let user = {
                username: "user06",
                email: "user06@gmail.com",
                password: "123456789",
            }; 
            chai.request(app)
                .post('/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('username');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    done();
                });
        });
    });

