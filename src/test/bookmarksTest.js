/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

let tokens = ' ';
let tokens1 = ' ';

describe('Article', () => {
  it('signup user 1 for bookmark ', (done) => {
    const user = { username: 'fffff',
      password: 'Fofo11@hjsd',
      email: 'faustinkagabo11@gmail.com' };
    chai.request(app)
      .post('/api/users')
      .send(user)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('username');
        res.body.should.have.property('email');
        res.body.should.have.property('token');
        tokens = res.body.token;
        done();
      });
  });

  it('signin user 1 for bookmark', (done) => {
    const user = { username: 'fffff',
      password: 'Fofo11@hjsd',
      email: 'faustinkagabo11@gmail.com' };
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((req, res) => {
        res.should.have.status(200);
        tokens = res.body.data.token;
        done();
      });
  });

  it('signup user 2 for bookmark', (done) => {
    const user = { username: 'fffffd',
      password: 'Fofo11@hjsdd',
      email: 'faustinkagabo11d@gmail.com' };
    chai.request(app)
      .post('/api/users')
      .send(user)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('username');
        res.body.should.have.property('email');
        res.body.should.have.property('token');
        done();
      });
  });

  it('signin user 2 for bookmark', (done) => {
    const user = { username: 'fffffd',
      password: 'Fofo11@hjsdd',
      email: 'faustinkagabo11d@gmail.com' };
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((req, res) => {
        res.should.have.status(200);
        tokens1 = res.body.data.token;
        done();
      });
  });

  it('it should create an article', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .post('/api/articles')
      .set('token', tokens)
      .send(article)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('The article successfully created!');
        done();
      });
  });

  it('it should find find all bookmarks', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .get('/api/bookmarks')
      .set('token', tokens)
      .send(article)
      .end((req, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('it should find find one bookmarks', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .get('/api/bookmarks/1')
      .set('token', tokens)
      .send(article)
      .end((req, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('it should bookmark an article', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .post('/api/bookmarks/2')
      .set('token', tokens1)
      .send(article)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        done();
      });
  });

  it('it should find all bookmarks', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .get('/api/bookmarks')
      .set('token', tokens1)
      .send(article)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('bookmarks');
        done();
      });
  });

  it('it should find one bookmark', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .get('/api/bookmarks/1')
      .set('token', tokens1)
      .send(article)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('bookmark your article', (done) => {
    chai.request(app)
      .post('/api/bookmarks/4')
      .set('token', tokens)
      .end((req, res) => {
        res.should.have.status(403);
        res.body.should.be.an('object');
        done();
      });
  });

  it('it should delete one bookmark', (done) => {
    chai.request(app)
      .delete('/api/bookmarks/1')
      .set('token', tokens1)
      .end((req, res) => {
        res.should.have.status(204);
        res.body.should.be.an('object');
        done();
      });
  });

  it('it should not delete one bookmark', (done) => {
    chai.request(app)
      .get('/api/articles')
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});
