import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { User } = models;
const { generateToken } = Tokenizer;

chai.use(chaiHttp);
chai.should();

let tokenGen1, tokenGen2;

describe('FOLLOW', () => {
  before(async () => {
    const user = { username: 'Joseph',
      email: 'joseph@gmail.com',
      password: 'joe@123' };

    const newUser = await User.create(user);
    tokenGen1 = await generateToken({ id: newUser.id });

    const user2 = { username: 'FollowMan',
      email: 'followman@gmail.com',
      password: 'joe@123' };

    const newUser1 = await User.create(user2);
    tokenGen2 = await generateToken({ id: newUser1.id });
  });

  it('User1 should be able to follow the User2', (done) => {
    const username = 'Joseph';
    chai.request(app)
      .post(`/api/profiles/${username}/follow`)
      .set('token', tokenGen2)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('User2 should be able to follow user1', (done) => {
    const username = 'FollowMan';
    chai.request(app)
      .post(`/api/profiles/${username}/follow`)
      .set('token', tokenGen1)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('Should opt-in a user for email notifications', (done) => {
    chai.request(app)
      .post('/api/optinemail')
      .set('token', tokenGen1)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should opt-in a user for email notifications', (done) => {
    chai.request(app)
      .post('/api/optinemail')
      .set('token', tokenGen2)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('it should create an article', (done) => {
    const article = { title: 'hello man, testing follow email notifications',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night',
      tags: 'andela,study' };
    chai.request(app)
      .post('/api/articles')
      .set('token', tokenGen2)
      .send(article)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('The article successfully created!');
        done();
      });
  });

  it('Should opt-in a user for in-app notifications', (done) => {
    chai.request(app)
      .post('/api/optinapp')
      .set('token', tokenGen1)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Should opt-in a user for in-app notifications', (done) => {
    chai.request(app)
      .post('/api/optinapp')
      .set('token', tokenGen2)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('it should create an article', (done) => {
    const article = { title: 'hello man, testing follow in app notifications',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night',
      tags: 'andela,study' };
    chai.request(app)
      .post('/api/articles')
      .set('token', tokenGen2)
      .send(article)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('The article successfully created!');
        done();
      });
  });

  it('Should return following users', (done) => {
    chai
      .request(app)
      .get('/api/profiles/following')
      .set('token', tokenGen1)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('User should not follow another user if token is missing', (done) => {
    const username = 'Kagabo';
    chai
      .request(app)
      .post(`/api/profiles/${username}/follow`)
      .set('token', ' ')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Should return followers', (done) => {
    chai
      .request(app)
      .get('/api/profiles/followers')
      .set('token', tokenGen2)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Fail to return followers when they dont exist', (done) => {
    chai
      .request(app)
      .get('/api/profiles/followers')
      .set('token', tokenGen1)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });


  it('User should be able to unfollow user', (done) => {
    const username = 'FollowMan';
    chai.request(app)
      .delete(`/api/profiles/${username}/follow`)
      .set('token', tokenGen1)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Fail to unfollow user that you dont follow', (done) => {
    const username = 'Kagabo';
    chai.request(app)
      .delete(`/api/profiles/${username}/follow`)
      .set('token', tokenGen1)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('User should not unfollow another user if token is missing', (done) => {
    const username = 'Joseph';
    chai
      .request(app)
      .delete(`/api/profiles/${username}/follow`)
      .set('token', ' ')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('Should not return following users', (done) => {
    chai
      .request(app)
      .get('/api/profiles/following')
      .set('token', tokenGen1)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
