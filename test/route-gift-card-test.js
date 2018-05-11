'use strict';

require('./lib/mock-env');
require('./lib/mock-aws');

const chai = require('chai');
const expect = require('chai').expect;
const http = require('chai-http');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const GiftCard = require('../model/gift-card');
const User = require('../model/user');

const tempGiftCard = require('./lib/mock-gift-card');
const server = require('../server');

mongoose.Promise = Promise;
chai.use(http);

describe('GIFT CARD ROUTES', function() {
  afterEach((done) => {
    Promise.all([
      GiftCard.remove({}),
      User.remove({}),
    ])
      .then(() => done())
      .catch(done);
  });

  describe('testing POST to api/gift-card', function() {
    before(tempGiftCard.bind(this));

    it('should return a 201 on Gift Card created', done => {
      chai.request(server)
        .post('/api/gift-card')
        .send({
          title: `${this.tempGiftCard.title}`,
          date: `${this.tempGiftCard.date}`,
          location: {
            lat: `${this.tempGiftCard.location.lat}`,
            lng: `${this.tempGiftCard.location.lng}`,
            name: `${this.tempGiftCard.location.name}`,
          },
          description: `${this.tempGiftCard.description}`,
          songTitle: `${this.tempGiftCard.songTitle}`,
          photo: {
            imageURI: `${this.tempGiftCard.photo.imageURI}`,
            ObjectId: `${this.tempGiftCard.photo.ObjectId}`,
          },
          dateCreated: `${this.tempGiftCard.dateCreated}`,
          userId: `${this.tempGiftCard.userId}`,
        })
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(201);
          done();
        });
    });

    it('should return a 404 on bad route', done => {
      chai.request(server)
        .post('/api/foo')
        .send({
          title: `${this.tempGiftCard.title}`,
          date: `${this.tempGiftCard.date}`,
          location: `${this.tempGiftCard.date}`,
          description: `${this.tempGiftCard.description}`,
          songTitle: `${this.tempGiftCard.songTitle}`,
          photo: `${this.tempGiftCard.photo}`,
          dateCreated: `${this.tempGiftCard.dateCreated}`,
          userId: `${this.tempGiftCard.userId}`,
        })
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });

    it('should return a 400 with missing title', done => {
      chai.request(server)
        .post('/api/gift-card')
        .send({
          title: undefined,
          date: `${this.tempGiftCard.date}`,
          location: `${this.tempGiftCard.location}`,
          description: `${this.tempGiftCard.description}`,
          songTitle: `${this.tempGiftCard.songTitle}`,
          photo: `${this.tempGiftCard.photo}`,
          dateCreated: `${this.tempGiftCard.dateCreated}`,
          userId: `${this.tempGiftCard.userId}`,
        })
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 400 with missing date', done => {
      chai.request(server)
        .post('/api/gift-card')
        .send({
          title: `${this.tempGiftCard.title}`,
          date: undefined,
          location: `${this.tempGiftCard.location}`,
          description: `${this.tempGiftCard.description}`,
          songTitle: `${this.tempGiftCard.songTitle}`,
          photo: `${this.tempGiftCard.photo}`,
          dateCreated: `${this.tempGiftCard.dateCreated}`,
          userId: `${this.tempGiftCard.userId}`,
        })
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 400 with missing location', done => {
      chai.request(server)
        .post('/api/gift-card')
        .send({
          title: `${this.tempGiftCard.title}`,
          date: `${this.tempGiftCard.date}`,
          location: undefined,
          description: `${this.tempGiftCard.description}`,
          songTitle: `${this.tempGiftCard.songTitle}`,
          photo: `${this.tempGiftCard.photo}`,
          dateCreated: `${this.tempGiftCard.dateCreated}`,
          userId: `${this.tempGiftCard.userId}`,
        })
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 400 with missing description', done => {
      chai.request(server)
        .post('/api/gift-card')
        .send({
          title: `${this.tempGiftCard.title}`,
          date: `${this.tempGiftCard.date}`,
          location: `${this.tempGiftCard.location}`,
          description: undefined,
          songTitle: `${this.tempGiftCard.songTitle}`,
          photo: `${this.tempGiftCard.photo}`,
          dateCreated: `${this.tempGiftCard.dateCreated}`,
          userId: `${this.tempGiftCard.userId}`,
        })
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 400 with missing dateCreated', done => {
      chai.request(server)
        .post('/api/gift-card')
        .send({
          title: `${this.tempGiftCard.title}`,
          date: `${this.tempGiftCard.date}`,
          location: `${this.tempGiftCard.location}`,
          description: `${this.tempGiftCard.description}`,
          songTitle: `${this.tempGiftCard.songTitle}`,
          photo: `${this.tempGiftCard.photo}`,
          dateCreated: undefined,
          userId: `${this.tempGiftCard.userId}`,
        })
        .set('Authorization', `Bearer ${this.tempToken}`)
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(400);
          done();
        });
    });

    it('should return a 401 with missing userId', done => {
      chai.request(server)
        .post('/api/gift-card')
        .send({
          title:`${this.tempGiftCard.title}`,
          date: `${this.tempGiftCard.date}`,
          location:  `${this.tempGiftCard.location}`,
          description: `${this.tempGiftCard.description}`,
          songTitle: `${this.tempGiftCard.songTitle}`,
          photo: `${this.tempGiftCard.photo}`,
          dateCreated: `${this.tempGiftCard.dateCreated}`,
          userId: undefined,
        })
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(401);
          done();
        });
    });
  });

  describe('testing GET from api/gift-card', function() {
    before(tempGiftCard.bind(this));

    it('should return a 200 on good request', done => {
      chai.request(server)
        .get('/api/gift-card')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(200);
          done();
        });
    });

    it('should return a 404 if the gift-card id does not exist', done => {
      chai.request(server)
        .get('/api/gift-card/abc123')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });

    it('should return a 401 without a token', done => {
      chai.request(server)
        .get('/api/gift-card')
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(401);
          done();
        });
    });
  });

  describe('testing GET from api/map', function() {
    before(tempGiftCard.bind(this));

    it('should return a 200 on good request', done => {
      chai.request(server)
        .get('/api/map')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(200);
          done();
        });
    });

    it('should return a 404 on a bad route', done => {
      chai.request(server)
        .get('/api/map/null')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });

    it('should return a 401 without a token', done => {
      chai.request(server)
        .get('/api/map')
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(401);
          done();
        });
    });
  });

  describe('testing PUT from api/gift-card', function() {
    before(tempGiftCard.bind(this));

    it('should return a 200 on good request', done => {
      chai.request(server)
        .put(`/api/gift-card/${this.tempGiftCard._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .send({
          title: 'New title',
        })
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(200);
          expect(res.body.title).to.equal('New title');
          done();
        });
    });

    it('should return a 401 without a token', done => {
      chai.request(server)
        .put(`/api/gift-card/${this.tempGiftCard._id}`)
        .send({
          title: 'New title',
        })
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(401);
          done();
        });
    });

    it('should return a 404 without the gift-card Id', done => {
      chai.request(server)
        .put('/api/gift-card')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .send({
          title: 'New title',
        })
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });
  });

  describe('testing DELETE from api/gift-card', function() {
    before(tempGiftCard.bind(this));

    it('should return a 204 on proper delete request', done => {
      chai.request(server)
        .delete(`/api/gift-card/${this.tempGiftCard._id}`)
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(204);
          done();
        });
    });

    it('should return a 404 if the id is not passed in', done => {
      chai.request(server)
        .delete('/api/gift-card/')
        .set({Authorization: `Bearer ${this.tempToken}`})
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(404);
          done();
        });
    });
  });
});
