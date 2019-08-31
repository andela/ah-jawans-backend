import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import app from '../index';
import UploadController from '../controllers/ImageUploadController';
import models from '../models';
import TokenGenerator from '../helpers/tokenGenerator';

const { User } = models;
const { generateToken } = TokenGenerator;

const { expect } = chai;
chai.should();

const appLocal = express();
const router = express.Router();

appLocal.use(express.json());
appLocal.use(express.urlencoded({ extended: false }));

appLocal.use('/api/upload', router.post('/', UploadController.save));


chai.use(chaiHttp);
let accessToken = '';

describe('UPLOAD', () => {
  before(async () => {
    const user = { username: 'Josepheee',
      email: 'josepheee@gmail.com',
      password: 'joeee@123' };

    const newUser = await User.create(user);

    accessToken = await generateToken({ id: newUser.id });
  });
  it('should get error if no gallery found', (done) => {
    chai
      .request(app)
      .get('/api/gallery')
      .set('token', accessToken)
      .end((err, res) => {
        expect(res).to.have.status(500);
        res.body.should.be.an('object');
        done();
      });
  });
  it('Should not upload image if no image selected', (done) => {
    chai
      .request(appLocal)
      .post('/api/upload')
      .set('token', accessToken)
      .end((err, res) => {
        res.status.should.equal(400);
        done();
      });
  });
});
