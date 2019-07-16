/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { User, Articles } = models;
const { generateToken } = Tokenizer;

chai.use(chaiHttp);
chai.should();

let tokenGen;

describe('Likes and Deslikes', () => {
  before(async () => {
    const userObject = { username: 'Joseph',
      email: 'joseph@gmail.com',
      password: 'joseph@123', };

    const newUser = await User.create(userObject);

    tokenGen = await generateToken({ id: newUser.id });

    const articleObject = { title: 'Greetings to all my freinds',
      body: 'This articles goes to all my freinds',
      description: 'This articles goes to all my freinds',
      slug: 'slug100000',
      authorId: newUser.dataValues.id, };

    // create test article
    await Articles.create(articleObject);
  });

  it('User should be able to like the article', (done) => {
    chai.request(app)
      .post('/api/articles/2/like')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('likes');
        res.body.should.be.an('object');
        done();
      });
  });

  it('Article not found', (done) => {
    chai.request(app)
      .post('/api/articles/89/like')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        res.body.message.should.be.an('string');
        done();
      });
  });

  it('Article already liked', (done) => {
    chai.request(app)
      .post('/api/articles/2/like')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('likes');
        res.body.should.be.an('object');
        done();
      });
  });

  it('User should be able to dislike the article', (done) => {
    chai.request(app)
      .post('/api/articles/2/dislike')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('dislikes');
        res.body.should.be.an('object');
        done();
      });
  });

  it('Article already disliked', (done) => {
    chai.request(app)
      .post('/api/articles/2/dislike')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('dislikes');
        res.body.should.be.an('object');
        done();
      });
  });
});
