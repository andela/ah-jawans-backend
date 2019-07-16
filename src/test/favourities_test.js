import { expect } from 'chai';
import favourite from '../template/mail/Favourites';
import users from './mock/users';
import models from '../models';

const { User } = models;
let currentUser;

describe('Tests for finding who favourited an article', () => {
  before(async () => {
    currentUser = await User.create(users.user1);
  });

  it('Should return an object', async () => {
    const response = await favourite(currentUser.id);
    expect(response).to.be.an('object');
  });
});
