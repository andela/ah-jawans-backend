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


describe('Social Login', () => {
  before('Before any test, Create A new user', async () => {
    await models.user.destroy({
      where: {
        mail: 'chandwani.shalu@andela.com'
      },
      truncate: false
    });
    await models.user.destroy({
      where: {
        mail: 'luvableshalu@gmail.com'
      },
      truncate: false
    });
  });
  it('should let a user log in with google, test! ', (done) => {
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
  it('should let save a user if he is already in the database, test! ', (done) => {
    chai.request(server)
      .post('/api/social/login/google/test')
      .send({
        email: 'luvableshalu@gmail.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should let a user log in with facebook, test! ', (done) => {
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
  it('should let save a user if he is already in the database, test! ', (done) => {
    chai.request(server)
      .post('/api/social/login/facebook/test')
      .send({
        email: 'chandwani.shalu@andela.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  // it('should let a user log in with twitter, test! ', (done) => {
  //   chai.request(server)
  //     .post('/api/social/login/twitter/test')
  //     .send({
  //       username: 'chandwani shalu',
  //     })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(201);
  //       expect(res.body).to.be.an('object');
  //       done();
  //     });
  // });
  // it('should let save a user if he is already in the database, test! ', (done) => {
  //   chai.request(server)
  //     .post('/api/social/login/twitter/test')
  //     .send({
  //       username: 'chandwani shalu',
  //     })
  //     .end((err, res) => {
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.be.an('object');
  //       done();
  //     });
  // });
});
