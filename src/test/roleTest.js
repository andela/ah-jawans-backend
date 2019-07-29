import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mock from './mock/users';

chai.use(chaiHttp);
chai.should();
let tokenGen;
let tokens;

describe('role', () => {
  it('signin user 1 for bookmark', (done) => {
    const user = { username: 'fffff',
      password: 'Fofo11@hjsd',
      email: 'faustinkagabo11@gmail.com' };
    chai.request(app)
      .post('/api/users/login')
      .send(user)
      .end((req, res) => {
        res.should.have.status(200);
        res.body.user.should.be.an('object');
        tokens = res.body.user.token;
        done();
      });
  });

  it('admin signin', (done) => {
    chai.request(app)
      .post('/api/users/login')
      .send(mock.userAdmin)
      .end((req, res) => {
        // eslint-disable-next-line prefer-destructuring
        res.should.have.status(200);
        res.body.user.should.be.an('object');
        tokenGen = res.body.user.token;
        done();
      });
  });

  it('admin should create a role', (done) => {
    const role = { tablesAllowed: 'Articles,User',
      role: 'admin',
      actions: 'GET' };
    chai.request(app)
      .post('/api/role')
      .set('token', tokenGen)
      .send(role)
      .end((req, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should not create a role if user is not an admin', (done) => {
    const role = { tablesAllowed: 'Articles,User',
      role: 'admin',
      permissions: 'GET' };
    chai.request(app)
      .post('/api/role')
      .set('token', `${tokenGen}dgfwe`)
      .send(role)
      .end((req, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should get all roles', (done) => {
    chai.request(app)
      .get('/api/role')
      .set('token', tokenGen)
      .end((req, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should update role actions ', (done) => {
    const role = { tablesAllowed: 'Articles',
      role: 'admin',
      actions: 'GET' };
    chai.request(app)
      .patch('/api/role')
      .set('token', tokenGen)
      .send(role)
      .end((req, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should update with no data role actions ', (done) => {
    const role = { tablesAllowed: '',
      role: 'admin',
      actions: 'GET' };
    chai.request(app)
      .patch('/api/role')
      .set('token', tokenGen)
      .send(role)
      .end((req, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should update user roles ', (done) => {
    const role = { roles: 'normalUser,admin', };
    chai.request(app)
      .patch('/api/addrole/12')
      .set('token', tokenGen)
      .send(role)
      .end((req, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should not update with no data roles', (done) => {
    const role = { roles: '', };
    chai.request(app)
      .patch('/api/addrole/12')
      .set('token', tokenGen)
      .send(role)
      .end((req, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should not update with bad token', (done) => {
    const role = { roles: 'normalUser,admin', };
    chai.request(app)
      .patch('/api/addrole/12')
      .set('token', tokens)
      .send(role)
      .end((req, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('should not delete with bad role', (done) => {
    const role = { tablesAllowed: 'Articles,User',
      role: 'adminsdfwad',
      actions: 'GET' };
    chai.request(app)
      .delete('/api/role')
      .set('token', tokenGen)
      .send(role)
      .end((req, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('should not delete with bad role', (done) => {
    const role = { tablesAllowed: 'Articles,User',
      role: 'superAdmin',
      actions: 'GET' };
    chai.request(app)
      .delete('/api/role')
      .set('token', tokenGen)
      .send(role)
      .end((req, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('should delete with admin token', (done) => {
    const role = { tablesAllowed: 'Articles,User',
      role: 'admin',
      actions: 'GET' };
    chai.request(app)
      .delete('/api/role')
      .set('token', tokenGen)
      .send(role)
      .end((req, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should not delete with bad role', (done) => {
    const role = { tablesAllowed: 'Articles,User',
      role: 'adminsdfwad',
      actions: 'GET' };
    chai.request(app)
      .delete('/api/role')
      .set('token', tokenGen)
      .send(role)
      .end((req, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
