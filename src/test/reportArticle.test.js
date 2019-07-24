import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';
import TokenGenerator from '../helpers/tokenGenerator';

const { User } = models;
const { generateToken } = TokenGenerator;

chai.use(chaiHttp);
chai.should();

let tokenGen;

describe('REPORTING ARTICLE TESTS', () => {
  before(async () => {
    const user = { username: 'nziza',
      email: 'nziza@gmail.com',
      password: 'Nziza@123' };

    const newUser = await User.create(user);
    tokenGen = await generateToken({ id: newUser.id });
  });
  it('user should able to report an article', (done) => {
    const articleId = 2;
    const report = { reportType: 'Abusive',
      comment: 'This article is contains some harassment concerns!' };
    chai
      .request(app)
      .post(`/api/reports/${articleId}`)
      .set('token', tokenGen)
      .send(report)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('Fail to report an article when reportType is empty ', (done) => {
    const articleId = 2;
    const report = { reportType: ' ',
      comment: 'This article is contains some harassment concerns!' };
    chai
      .request(app)
      .post(`/api/reports/${articleId}`)
      .set('token', tokenGen)
      .send(report)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Fail to report an article when comment is empty ', (done) => {
    const articleId = 2;
    const report = { reportType: 'Abusive',
      comment: ' ' };
    chai
      .request(app)
      .post(`/api/reports/${articleId}`)
      .set('token', tokenGen)
      .send(report)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Fail to report an article when its not found', (done) => {
    const articleId = 200;
    const report = { reportType: 'Abusive',
      comment: 'This article is contains some harassment concerns!' };
    chai
      .request(app)
      .post(`/api/reports/${articleId}`)
      .set('token', tokenGen)
      .send(report)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('Get a specific article report', (done) => {
    const articleId = 2;
    chai
      .request(app)
      .get(`/api/reports/article/${articleId}`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('Fail Get a specific article report if it does not reported', (done) => {
    const articleId = 10;
    chai
      .request(app)
      .get(`/api/reports/article/${articleId}`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('Fail to get all reports if they are not found', (done) => {
    const articleId = 20;
    chai
      .request(app)
      .get(`/api/reports/${articleId}`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('Get all reports', (done) => {
    const articleId = 2;
    chai
      .request(app)
      .get(`/api/reports/${articleId}`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('Delete a specific report', (done) => {
    const articleId = 2;
    chai
      .request(app)
      .delete(`/api/reports/${articleId}`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Fail to delete a specific report if its already deleted or not reported', (done) => {
    const articleId = 10;
    chai
      .request(app)
      .delete(`/api/reports/${articleId}`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        done();
      });
  });
});
