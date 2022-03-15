let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();

let mongoose = require('mongoose');
let Purchaserequest = require('../models/purchaserequest.model');

chai.use(chaiHttp);

    
    //Testing GET /purchaserequests
    describe('GET /purchaserequests', () => {
        it('it should GET all the purchaserequests', (done) => {
            chai.request(app)
            .get('/purchaserequests')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                done();
            });
        });
    });
    //Finished GET /purchaserequests
    
    //Testing POST /purchaserequests
    describe('POST /purchaserequests', () => {
        it('it should not POST an purchaserequest without booktype field', (done) => {
            let purchaserequest = {
                bookTitle: "book1",
                bookAuthor: "author1",
            };
            chai.request(app)
                .post('/purchaserequests')
                .send(purchaserequest)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Content can not be empty!');
                    done();
                });
        });
        it('it should POST a purchaserequest ', (done) => {
            let purchaserequest = {
                bookTitle: "book2",
                bookAuthor: "author2",
                bookType: "reading",
                requested: false,
                allocated: false,
                approved: false 
            }; 
            chai.request(app)
                .post('/purchaserequests')
                .send(purchaserequest)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('bookTitle');
                    res.body.should.have.property('bookAuthor');
                    res.body.should.have.property('bookType');
                    res.body.should.have.property('requested');
                    res.body.should.have.property('allocated');
                    res.body.should.have.property('approved');
                    done();
                });
        });
    });
    //Finished POST /purchaserequests/pets
