/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('users', () => {
  it('A new user who filled all required data should be registered', (done) => {
    const user = {
      username: 'Kagabo',
      email: 'kagabo@gmail.com',
      password: '12345678',
    };
    chai.request(app)
      .post('/api/users')
      .send(user)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.user.should.have.property('username');
        res.body.user.should.have.property('email');
        res.body.user.should.have.property('token');
        done();
      });
  });

  it('User should be able to sign in', (done) => {
    const user = {
      email: 'kagabo@gmail.com',
      password: '12345678'
    };
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('token');
        done();
      });
  });

  it('Invalid email', (done) => {
    const user = {
      email: 'kagabo1@gmail.com',
      password: '12345678'
    };
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((req, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('Invalid Password', (done) => {
    const user = {
      email: 'kagabo@gmail.com',
      password: '123456789'
    };
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((req, res) => {
        res.should.have.status(403);
        done();
      });
  });
});
