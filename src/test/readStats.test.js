import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

let tokenGen;
describe('READING STATS TEST', () => {
  it('A new user who filled all required data should be registered', (done) => {
    const user = { username: 'Kagabof',
      email: 'kagabo1@gmail.com',
      password: 'Kagabo1@', };
    chai.request(app)
      .post('/api/users')
      .send(user)
      .end((req, res) => {
        // eslint-disable-next-line prefer-destructuring
        res.should.have.status(201);
        res.body.should.have.property('message');
        res.body.should.have.property('token');
        done();
      });
  });

  it('User should be able to sign in', (done) => {
    const user2 = { username: 'Kagabo1',
      email: 'kagabo1@gmail.com',
      password: 'Kagabo1@', };
    chai.request(app)
      .post('/api/users/login')
      .send(user2)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('token');
        tokenGen = res.body.data.token;
        done();
      });
  });
  it('Autenticated user should get the number of users who read an article', (done) => {
    const articleId = 3;
    chai
      .request(app)
      .get(`/api/readerstats/${articleId}`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Autenticated user should get the number of users who commented an article', (done) => {
    const articleId = 3;
    chai
      .request(app)
      .get(`/api/readerstats/comments/${articleId}`)
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});
