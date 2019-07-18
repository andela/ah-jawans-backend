import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { User } = models;
const { generateToken } = Tokenizer;

chai.use(chaiHttp);
chai.should();

let tokenGen;

describe('FOLLOW', () => {
  before(async () => {
    const user = { username: 'Joseph',
      email: 'joseph@gmail.com',
      password: 'joe@123' };

    const newUser = await User.create(user);
    tokenGen = await generateToken({ id: newUser.id });
  });
  it('Users should be able to follow each other', (done) => {
    const username = 'Joseph';
    chai.request(app)
      .patch(`/api/users/${username}/follow`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('Should return following users', (done) => {
    chai
      .request(app)
      .get('/api/users/following')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('User should not follow another user if token is missing', (done) => {
    const username = 'Kagabo';
    chai
      .request(app)
      .patch(`/api/users/${username}/follow`)
      .set('token', ' ')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('User should be able to unfollow user', (done) => {
    const username = 'Joseph';
    chai.request(app)
      .patch(`/api/users/${username}/unfollow`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Fail to unfollow user that you dont follow', (done) => {
    const username = 'Joseph';
    chai.request(app)
      .patch(`/api/users/${username}/unfollow`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('User should not unfollow another user if token is missing', (done) => {
    const username = 'Joseph';
    chai
      .request(app)
      .patch(`/api/users/${username}/unfollow`)
      .set('token', ' ')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Fail to return followers when they dont exist', (done) => {
    chai
      .request(app)
      .get('/api/users/followers')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('Should not return following users', (done) => {
    chai
      .request(app)
      .get('/api/users/following')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
