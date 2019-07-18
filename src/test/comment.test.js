import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';
import TokenGenerator from '../helpers/tokenGenerator';

const { User } = models;
const { generateToken } = TokenGenerator;

chai.use(chaiHttp);
chai.should();

let token;

describe('COMMENTS TEST', () => {
  before(async () => {
    const user = { username: 'Joseph',
      email: 'joseph@gmail.com',
      password: 'joe@123' };

    const newUser = await User.create(user);
    token = await generateToken({ id: newUser.id });
  });
  it('Autenticated user should be able to comment on an article', (done) => {
    const articleId = 1;
    const comment = { body: 'This my first comment' };
    chai
      .request(app)
      .post(`/api/articles/${articleId}/comments`)
      .set('token', token)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Autenticated user should be able to edit comment', (done) => {
    const articleId = 1;
    const commentId = 1;
    const comment = { body: 'This my edited comment' };
    chai
      .request(app)
      .patch(`/api/articles/${articleId}/comments/${commentId}`)
      .set('token', token)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Fail to edit comment when it does not exist', (done) => {
    const articleId = 10;
    const commentId = 1;
    const comment = { body: 'This my edited comment' };
    chai
      .request(app)
      .patch(`/api/articles/${articleId}/comments/${commentId}`)
      .set('token', token)
      .send(comment)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Autenticated user should be able to get all article\'s comments', (done) => {
    const articleId = 1;

    chai
      .request(app)
      .get(`/api/articles/${articleId}/comments`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Autenticated user should be able to delete article\'s comment', (done) => {
    const articleId = 1;
    const commentId = 1;

    chai
      .request(app)
      .delete(`/api/articles/${articleId}/comments/${commentId}`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Fail to delete a comment if it does not exist', (done) => {
    const articleId = 1;
    const commentId = 1;

    chai
      .request(app)
      .delete(`/api/articles/${articleId}/comments/${commentId}`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
});
