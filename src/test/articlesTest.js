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

let userObject, articleObject, testUser, testArticle, tokenGen, tokens;

describe('Article', () => {
  it('A new user who filled all required data should be registered in order to create an article', (done) => {
    const user = { username: 'ffff',
      password: 'Fofo1@hjsd',
      email: 'faustinkagabo1@gmail.com' };
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

  it('User should be able to sign in', (done) => {
    const user = { email: 'faustinkagabo1@gmail.com',
      password: 'Fofo1@hjsd' };
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('token');
        // eslint-disable-next-line prefer-destructuring
        tokens = res.body.data.token;
        done();
      });
  });

  it('login for creating article', (done) => {
    const user = { username: 'ffff',
      password: 'Fofo1@hjsd',
      email: 'faustinkagabo1@gmail.com' };
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((req, res) => {
        res.should.have.status(200);
        // res.body.should.be.an('object');
        // res.body.should.have.property('username');
        // res.body.should.have.property('email');
        // res.body.should.have.property('token');
        tokens = res.body.data.token;
        done();
      });
  });

  it('it should create an article', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night',
      tags: 'andela,study' };
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

  it('it should create an article with no tag', (done) => {
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

  it('it should not create an article with a no title', (done) => {
    const article = { body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .post('/api/articles')
      .set('token', tokens)
      .send(article)
      .end((req, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.errors[0].should.have.property('title');
        done();
      });
  });

  it('it should not create an article with no body', (done) => {
    const article = { title: 'Hello how are u',
      description: 'Nzube is the best jhgwus wdajhb adsf' };
    chai.request(app)
      .post('/api/articles')
      .set('token', tokens)
      .send(article)
      .end((req, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.errors[0].should.have.property('body');
        done();
      });
  });

  it('it should not create an article with no description', (done) => {
    const article = { title: 'Hello how are u',
      body: 'hello man, how was the night', };
    chai.request(app)
      .post('/api/articles')
      .set('token', tokens)
      .send(article)
      .end((req, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.errors[0].should.have.property('description');
        done();
      });
  });

  it('it should not create an article with a bad token', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .post('/api/articles')
      .set('token', `${tokens}aaaa`)
      .send(article)
      .end((req, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.property('error').eql('invalid token');
        done();
      });
  });

  it('it should not create an article with bad token', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .post('/api/articles')
      .set('token', `${tokens}aaaa`)
      .send(article)
      .end((req, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        res.body.should.have.property('error').eql('invalid token');
        done();
      });
  });

  it('it should update an article', (done) => {
    const article = { title: 'hello man, how was the night',
      body: 'hello man, how was the night',
      description: 'hello man, how was the night' };
    chai.request(app)
      .patch('/api/articles/1')
      .set('token', tokens)
      .send(article)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('it should not update an article with no title, description or body', (done) => {
    const article = {};
    chai.request(app)
      .patch('/api/articles/1')
      .set('token', tokens)
      .send(article)
      .end((req, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('It should get all articles', (done) => {
    chai.request(app)
      .get('/api/articles')
      .set('token', tokens)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.articles[0].should.have.property('title').eql('hello man, how was the night');
        done();
      });
  });

  it('It should get all articles', (done) => {
    chai.request(app)
      .get('/api/articles/1')
      .set('token', tokens)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.article.should.have.property('title').eql('hello man, how was the night');
        done();
      });
  });

  it('It should not get an article', (done) => {
    chai.request(app)
      .get('/api/articles/10000')
      .set('token', tokens)
      .end((req, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should find all articles with keyword', (done) => {
    chai.request(app)
      .get('/api/article/search?keyword=was')
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should find all articles with author name', (done) => {
    chai.request(app)
      .get('/api/article/search?authorName=ffff')
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should find all articles with author name who does not exist', (done) => {
    chai.request(app)
      .get('/api/article/search?keyword=wasvdejhgew')
      .end((req, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('No data found');
        done();
      });
  });

  it('should find all articles with title', (done) => {
    chai.request(app)
      .get('/api/article/search?title=was')
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should find all articles with all data', (done) => {
    chai.request(app)
      .get('/api/article/search?title=kagabo have&tag=andela&keyword=the&authorName=Papwerewr')
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should find all articles with out data', (done) => {
    chai.request(app)
      .get('/api/article/search')
      .end((req, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('It should delete an article', (done) => {
    chai.request(app)
      .delete('/api/articles/1')
      .set('token', tokens)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Article Succesfully deleted!');
        done();
      });
  });

  it('It should not delete an article two times', (done) => {
    chai.request(app)
      .delete('/api/articles/1')
      .set('token', tokens)
      .end((req, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Article not found in the system!');
        done();
      });
  });

  it('It should not delete an article two times', (done) => {
    chai.request(app)
      .delete('/api/articles/f')
      .set('token', tokens)
      .end((req, res) => {
        res.should.have.status(500);
        res.body.should.be.an('object');
        res.body.should.have.property('error').eql('Internal server error!');
        done();
      });
  });
});

describe('share article on social media', () => {
  before('Before any test, delete the table contents', async () => {
    await models.User.destroy({ where: { email: 'pankajvaswani555@gmail.com' },
      truncate: false });
    await models.Articles.destroy({ where: { slug: 'lsug32344' },
      truncate: false });

    // create test user
    userObject = { firstName: 'pankaj',
      lastName: 'vaswani',
      username: 'Pankaj_vaswani',
      email: 'pankajvaswani555@gmail.com',
      password: 'Pankaj@1993',
      confirmPassword: 'Pankaj@1993', };

    testUser = await User.create(userObject);

    // generate test token
    tokenGen = await generateToken({ id: testUser.dataValues.id });

    articleObject = { title: 'How to survive at Andela',
      body: 'this is article is supposed to have two paragraph',
      description: 'the paragraph one has many character than before',
      tagList: ['reactjs', 'angularjs', 'expressjs'],
      slug: 'lsug32344',
      authorId: testUser.dataValues.id,
      readtime: '1 min' };

    // create test article
    testArticle = await Articles.create(articleObject);
  });

  // share article test
  it('should share an article on twitter', (done) => {
    chai
      .request(app)
      .get(`/api/articles/${testArticle.slug}/share/twitter`)
      .set('token', tokenGen)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should share an article on facebook', (done) => {
    chai
      .request(app)
      .get(`/api/articles/${testArticle.slug}/share/facebook`)
      .set('token', tokenGen)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should share an article on linkedin', (done) => {
    chai
      .request(app)
      .get(`/api/articles/${testArticle.slug}/share/linkedin`)
      .set('token', tokenGen)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should share an article on email', (done) => {
    chai
      .request(app)
      .get(`/api/articles/${testArticle.slug}/share/email`)
      .set('token', tokenGen)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should open the article link', (done) => {
    chai
      .request(app)
      .get(`/api/articles/slug/${testArticle.slug}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should not open the article link if the slug is invalid', (done) => {
    chai
      .request(app)
      .get(`/api/articles/slug/${testArticle.slug}aaaaaaaa`)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });
});
