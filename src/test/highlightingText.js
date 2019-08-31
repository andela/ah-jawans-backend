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

describe('Comment on Highlighted', () => {
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

  it('User should be able to comment on highted text', (done) => {
    const data = { indexStart: 1,
      indexEnd: 5,
      comment: 'Good point' };
    chai.request(app)
      .post(`/api/articles/${article.id}/highlights`)
      .set('token', tokenGen)
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Already highlighted', (done) => {
    const data = { indexStart: 1,
      indexEnd: 5,
      comment: 'Good point' };
    chai.request(app)
      .post(`/api/articles/${article.id}/highlights`)
      .set('token', tokenGen)
      .send(data)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Index should be positive number', (done) => {
    const data = { indexStart: '1',
      indexEnd: 5,
      comment: 'Good point' };
    chai.request(app)
      .post(`/api/articles/${article.id}/highlights`)
      .set('token', tokenGen)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Comment should not be empty', (done) => {
    const data = { indexStart: 1,
      indexEnd: 5,
      comment: '' };
    chai.request(app)
      .post(`/api/articles/${article.id}/highlights`)
      .set('token', tokenGen)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
});
