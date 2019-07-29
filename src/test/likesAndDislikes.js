/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';

const { User, Articles, Comments } = models;
const { generateToken } = Tokenizer;

chai.use(chaiHttp);
chai.should();

let tokenGen;
let comment;

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
      authorId: newUser.dataValues.id,
      readtime: 'less than a minute' };

    await Articles.create(articleObject);

    const commentObject = { body: 'Good' };

    comment = await Comments.create(commentObject);
  });

  it('User should be able to like the article', (done) => {
    chai.request(app)
      .post('/api/articles/2/like')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  //  opt inn user for email notifications

  it('Should opt-in a user for email notifications', (done) => {
    chai.request(app)
      .post('/api/optinemail')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Autenticated user should be able to comment on an article', (done) => {
    const articleId = 2;
    const comments = { body: 'This is comment for opt in mail' };
    chai
      .request(app)
      .post(`/api/articles/${articleId}/comments`)
      .set('token', tokenGen)
      .send(comments)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  // opt inn user for in app notification

  it('Should opt-in a user for in-app notifications', (done) => {
    chai.request(app)
      .post('/api/optinapp')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Autenticated user should be able to comment on an article', (done) => {
    const articleId = 2;
    const comments = { body: 'This is comment for opt in app' };
    chai
      .request(app)
      .post(`/api/articles/${articleId}/comments`)
      .set('token', tokenGen)
      .send(comments)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('It should get all articles', (done) => {
    chai.request(app)
      .get('/api/articles/2')
      .set('token', tokenGen)
      .end((req, res) => {
        res.should.have.status(200);
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
        res.body.should.be.an('object');
        done();
      });
  });

  it('Article already liked', (done) => {
    chai.request(app)
      .post('/api/articles/2/like')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
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
        res.body.should.be.an('object');
        done();
      });
  });

  it('User should be able to like a comment', (done) => {
    chai.request(app)
      .post(`/api/articles/comments/${comment.id}/likes`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('Comment not found', (done) => {
    chai.request(app)
      .post('/api/articles/comments/9/likes')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('User should be able to dislike a comment', (done) => {
    chai.request(app)
      .post(`/api/articles/comments/${comment.id}/dislikes`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});
