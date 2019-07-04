/* eslint-disable import/no-extraneous-dependencies */
import chaiHttp from 'chai-http';
import chai from 'chai';
import dotenv from 'dotenv';
import server from '../index';
import models from '../models';

//* global it */
//* global describe */

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();


describe('Social Login google', () => {
  before('Before any test, Create A new user', async () => {
    await models.User.destroy({
      where: {
        email: 'bnpyuysnhq_1562062969@tfbnw.net'
      },
      truncate: false
    });
    await models.User.destroy({
      where: {
        email: 'luvableshalu@gmail.com'
      },
      truncate: false
    });
  });

  it('should allow user to log-in with google, test! ', (done) => {
    chai.request(server)
      .post('/api/social/login/google/test')
      .send({
        email: 'luvableshalu@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should allow to save user if he/she is already in the database, test! ', (done) => {
    chai.request(server)
      .post('/api/social/login/google/test')
      .send({
        email: 'luvableshalu@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Social Login facebook', () => {
  before('delete google user', async () => {
    await models.User.destroy({
      where: {
        email: 'bnpyuysnhq_1562062969@tfbnw.net'
      },
      truncate: false
    });
  });

  it('should allow user to log-in with facebook, test! ', (done) => {
    chai.request(server)
      .post('/api/social/login/facebook/test')
      .send({
        email: 'chandwani.shalu@andela.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('log-in with facebook, test! ', (done) => {
    chai.request(server)
      .get('/api/social/login/facebook/test')
      .send({
        email: 'chandwani.shalu@andela.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should allow to save user if he/she is already in the database, test! ', (done) => {
    chai.request(server)
      .post('/api/social/login/facebook/test')
      .send({
        email: 'chandwani.shalu@andela.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('Social Login Twitter', () => {
  before('delete user created by facebook', async () => {
    await models.User.destroy({
      where: {
        email: 'bnpyuysnhq_1562062969@tfbnw.net'
      },
      truncate: false
    });
  });

  it('should allow user to log-in with twitter, test! ', (done) => {
    chai.request(server)
      .post('/api/social/login/twitter/test')
      .send({
        email: 'bnpyuysnhq_1562062969@tfbnw.net',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should allow to save user if he/she is already in the database, test! ', (done) => {
    chai.request(server)
      .post('/api/social/login/twitter/test')
      .send({
        email: 'bnpyuysnhq_1562062969@tfbnw.net',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
