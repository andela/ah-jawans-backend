/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import models from '../models';
import Tokenizer from '../helpers/tokenGenerator';
import { updateUser, findUser } from '../controllers/helpers/findUser';

const { User } = models;
const { generateToken } = Tokenizer;

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

let tokenGen;
let userGen;
let adminToken;

describe('users', () => {
  it('Should return welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('Welcome to Authors Haven');
        done();
      });
  });

  it('A new user who filled all required data should be registered', (done) => {
    const user = { username: 'Kagabo',
      email: 'kagabo@gmail.com',
      password: 'Kagabo1@', };
    chai.request(app)
      .post('/api/users')
      .send(user)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        done();
      });
  });

  it('A user should not create account if username already exists in the database', (done) => {
    const user = { username: 'Kagabo',
      email: 'kagabo12@gmail.com',
      password: 'Kagabo1@',
      verified: false };
    chai.request(app)
      .post('/api/users')
      .send(user)
      .end((req, res) => {
        res.should.have.status(409);
        done();
      });
  });
  it('A new user who filled all required data with an email that exists in the system should not signup', (done) => {
    const user1 = { username: 'Kagabo',
      email: 'kagabo@gmail.com',
      password: 'Kagabo1@',
      verified: false };
    chai.request(app)
      .post('/api/users')
      .send(user1)
      .end((req, res) => {
        res.should.have.status(409);
        res.body.should.be.an('object');
        done();
      });
  });

  it('User should be able to sign in', (done) => {
    const user2 = { email: 'kagabo@gmail.com',
      password: 'Kagabo1@' };
    chai.request(app)
      .post('/api/users/login')
      .send(user2)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.user.should.be.an('object');
        done();
      });
  });

  it('Should return a value', async () => {
    const gh = await updateUser(1, 'hewg', 'hgewy', 'hguew');
    expect(typeof gh[0]).to.be.equal('number');
  });

  it('Should return a user', async () => {
    const gh = await findUser(1);
    expect(typeof gh.id).to.be.equal('number');
  });
  it('User should be able to signin as an admin', (done) => {
    const user2 = { username: 'john',
      password: 'Kagabo1@',
      email: 'faustin.kagabo@andela.com' };
    chai.request(app)
      .post('/api/users/login')
      .send(user2)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.user.should.be.an('object');
        adminToken = res.body.user.token;
        done();
      });
  });

  it('Should return a value', async () => {
    const gh = await updateUser(1, 'hewg', 'hgewy', 'hguew');
    expect(typeof gh[0]).to.be.equal('number');
  });

  it('Should return a user', async () => {
    const gh = await findUser(1);
    expect(typeof gh.id).to.be.equal('number');
  });
  it('User should be able to signin as an admin', (done) => {
    const user2 = { username: 'john',
      password: 'Kagabo1@',
      email: 'faustin.kagabo@andela.com' };
    chai.request(app)
      .post('/api/users/login')
      .send(user2)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.user.should.be.an('object');
        adminToken = res.body.user.token;
        done();
      });
  });

  it('Invalid email', (done) => {
    const user3 = { email: 'kagabo11@gmail.com',
      password: 'Kagabo1@' };
    chai.request(app)
      .post('/api/users/login')
      .send(user3)
      .end((req, res) => {
        res.should.have.status(403);
        done();
      });
  });
  it('Invalid Password', (done) => {
    const user4 = { email: 'kagabo@gmail.com',
      password: 'Kagabo1@3' };
    chai.request(app)
      .post('/api/users/login')
      .send(user4)
      .end((req, res) => {
        res.should.have.status(403);
        done();
      });
  });
  it('Wrong email format', (done) => {
    const user5 = { email: 'kagabogmail.com',
      password: 'Kagabo1@3' };
    chai.request(app)
      .post('/api/users/login')
      .send(user5)
      .end((req, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('Wrong password format', (done) => {
    const user6 = { email: 'kagabogmail.com',
      password: '12345678' };
    chai.request(app)
      .post('/api/users/login')
      .send(user6)
      .end((req, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should test when the email does not exist', (done) => {
    const data = { email: 'michfewael@andela.com' };
    chai.request(app)
      .post('/api/users/passwordreset')
      .send(data)
      .end((error, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should test the email that exists before sending link to reset password', (done) => {
    chai.request(app)
      .post('/api/users/passwordreset')
      .send({ email: 'kagabo@gmail.com' })
      .end((error, res) => {
        // eslint-disable-next-line prefer-destructuring
        tokenGen = res.body.token;
        res.should.have.status(200);
        done();
      });
  });
  it('should verify a user', (done) => {
    chai.request(app)
      .patch(`/api/users/verification/${tokenGen}`)
      .send({ verified: true })
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Your account is now verified you can login with your email');
        done();
      });
  });
  it('should change the password', (done) => {
    chai.request(app)
      .post(`/api/users/passwordreset/${tokenGen}`)
      .send({ password: 'Dumnh@1425' })
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should not change the password because of the wrong token', (done) => {
    chai.request(app)
      .post('/api/users/passwordreset/hgd')
      .send({ password: '12345678' })
      .end((req, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('should not signup with bad password', (done) => {
    const data = { username: 'kagabo',
      password: 'Fofo1',
      email: 'fofo@gmail.com' };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.json;
        done();
      });
  });

  it('should no signup with bad email', (done) => {
    const data = { username: 'kagabo',
      password: 'Fofo1@',
      email: 'fofogmail.com' };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.json;
        done();
      });
  });

  it('bad email and password on signup', (done) => {
    const data = { username: 'kagabo',
      password: 'Fofo1',
      email: 'fofogmail.com' };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.json;
        done();
      });
  });
  it('should no signup with bad username', (done) => {
    const data = { username: '',
      password: 'Fofo1@',
      email: 'fofo@gmail.com' };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.json;
        done();
      });
  });

  it('should no signup with bad firstName', (done) => {
    const data = { username: '',
      password: 'Fofo1@',
      email: 'fofo@gmail.com',
      firstName: 'dfrh44' };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.json;
        done();
      });
  });

  it('should no signup with bad lastName', (done) => {
    const data = { username: 'heyefgs',
      password: 'Fofo1@',
      email: 'fofo@gmail.com',
      lastName: 'ghfd4' };
    chai.request(app)
      .post('/api/users')
      .send(data)
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.json;
        done();
      });
  });
});

// user Profile
describe('User Profile view amend', () => {
  before('Before any test, Create A new user', async () => {
    await models.User.destroy({ where: { email: 'shaluchandwani@gmail.com' },
      truncate: false });
  });

  it('creating new user', (done) => {
    const user = { username: 'shaluchandwani',
      email: 'shaluchandwani@gmail.com',
      password: 'Shalu@1993', };
    chai.request(app)
      .post('/api/users')
      .send(user)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        userGen = res.body.user.username;
        done();
      });
  });

  it('User should be able to sign in', (done) => {
    const user = { email: 'shaluchandwani@gmail.com',
      password: 'Shalu@1993' };
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.user.should.be.an('object');
        // eslint-disable-next-line prefer-destructuring
        tokenGen = res.body.user.token;
        done();
      });
  });

  it('should allow user to see his/her profile after creation', (done) => {
    chai.request(app)
      .get(`/api/user/${userGen}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should throw error if the username doesnot exists', (done) => {
    chai.request(app)
      .get(`/api/user/${userGen}iiiiii`)
      .end((req, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        done();
      });
  });

  it('should throw error if the username is not valid', (done) => {
    chai.request(app)
      .get('/api/user/!!!!!!!')
      .end((req, res) => {
        res.should.have.status(401);
        res.body.should.be.an('object');
        done();
      });
  });

  it('User should be able to update his/her profile', (done) => {
    chai.request(app)
      .patch('/api/users')
      .set('token', tokenGen)
      .send({ firstName: 'Shalu',
        lastName: 'chandwandi' })
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('User should be able to update his/her profile', (done) => {
    chai.request(app)
      .patch('/api/users')
      .set('token', tokenGen)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
  it('User should be able to update his/her profile admin ', (done) => {
    chai.request(app)
      .patch('/api/users?id=3')
      .set('token', adminToken)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });

  it('User should delete user', (done) => {
    chai.request(app)
      .delete('/api/users/3')
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});

describe('SignOut', () => {
  before(async () => {
    const user = { username: 'Joseph',
      email: 'joseph@gmail.com',
      password: 'joseph@123', };

    const newUser = await User.create(user);

    tokenGen = await generateToken({ id: newUser.id });
  });

  it('user should logout with a valid token', (done) => {
    chai.request(app)
      .post('/api/users/logout')
      .set('token', tokenGen)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.a('string');
        done();
      });
  });
  it('Token is missing', (done) => {
    chai
      .request(app)
      .post('/api/users/logout')
      .set('token', ' ')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
