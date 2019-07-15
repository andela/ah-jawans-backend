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

describe('Get all Users', () => {
  before(async () => {
    const user = { username: 'Joseph',
      email: 'joseph@gmail.com',
      password: 'joe@123' };

    const newUser = await User.create(user);

    token = await generateToken({ id: newUser.id });
  });

  it('Autenticated user should be able to get the list of all users', (done) => {
    chai
      .request(app)
      .get('/api/allusers/')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        done();
      });
  });
});
