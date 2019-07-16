import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';
import TokenGenerator from '../helpers/tokenGenerator';

const { User } = models;
const { generateToken } = TokenGenerator;

const user2 = { firstName: 'shalu',
  lastName: 'chandwani',
  email: 'shaluchandwani@gmail.com',
  username: 'shalu_sh',
  password: 'Shalu@1993' };

let token;
chai.use(chaiHttp);
chai.should();

describe('Notifications tests', () => {
  before(async () => {
    const newUser = await User.create(user2);
    token = await generateToken({ id: newUser.id });
  });

  it('Should opt-in a user for email notifications', (done) => {
    chai.request(app)
      .post('/api/optinemail')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should not opt-in a user for email notifications again', (done) => {
    chai.request(app)
      .post('/api/optinemail')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should opt-in a user for in-app notifications', (done) => {
    chai.request(app)
      .post('/api/optinapp')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should not opt-in a user for in-app notifications again', (done) => {
    chai.request(app)
      .post('/api/optinapp')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should opt-out a user for email notifications', (done) => {
    chai.request(app)
      .delete('/api/optinemail')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should not opt-out a user for email notifications if they hadn\'t opted-in', (done) => {
    chai.request(app)
      .delete('/api/optinemail')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should opt-out a user for in-app notifications', (done) => {
    chai.request(app)
      .delete('/api/optinapp')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should not opt-out a user for in-app notifications if they had not opted-in', (done) => {
    chai.request(app)
      .delete('/api/optinapp')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should not display any notifications if they are not present', (done) => {
    chai.request(app)
      .get('/api/viewNotifications/999')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
});
