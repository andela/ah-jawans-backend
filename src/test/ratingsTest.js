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
let article;

describe('Rating an article', () => {
  before(async () => {
    const userObject = { username: 'example',
      email: 'faustinkagabo1@gmail.com',
      password: 'Fofo1@hjsd', };

    const newUser = await User.create(userObject);

    tokenGen = await generateToken({ id: newUser.id });

    const articleObject = { title: 'This should be a good example of an article',
      body: 'This should be a good example of an article',
      description: 'This should be a good example of an article',
      slug: 'slug111111',
      authorId: newUser.dataValues.id,
      readtime: 'less than a minute' };

    // create test article
    article = await Articles.create(articleObject);
  });

  it('User should not be able to fetch all ratings from articles', (done) => {
    chai.request(app)
      .get(`/api/articles/${article.id}/rating`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('User shoud not be able to fetch all ratings from bad article articles', (done) => {
    chai.request(app)
      .get('/api/articles/10000/rating')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('User shouldn\'t find an article', (done) => {
    chai.request(app)
      .post('/api/articles/9/rating')
      .set('token', tokenGen)
      .send({ rating: 3 })
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        done();
      });
  });

  it('User should be able to rate the article', (done) => {
    chai.request(app)
      .post(`/api/articles/${article.id}/rating`)
      .set('token', tokenGen)
      .send({ rating: 3 })
      .end((err, res) => {
        res.should.have.status(204);
        res.should.be.an('object');
        done();
      });
  });

  it('User shoud be able to fetch all ratings of an article', (done) => {
    chai.request(app)
      .get(`/api/articles/${article.id}/ratings`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('User should be able to check the rating range of an article', (done) => {
    chai.request(app)
      .post(`/api/articles/${article.id}/rating`)
      .set('token', tokenGen)
      .send({ rating: 7 })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.have.property('error');
        done();
      });
  });
});
