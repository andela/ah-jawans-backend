/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import Gallery from '../controllers/helpers';
import models from '../models';

const { User } = models;

const { expect } = chai;

describe('Get gallery query', () => {
  before(async () => {
    const user = { username: 'Joseph',
      email: 'joseph@gmail.com',
      password: 'joe@123' };

    await User.create(user);
  });

  it('should get chats', async () => {
    const galleries = await Gallery.get();
    expect(galleries.length).to.be.equal(0);
  });
  it('should save a gallery', async () => {
    const savedGallery = await Gallery.save({ image: 'image.jpg', userId: 1 });
    expect(Object.keys(savedGallery).length).to.be.above(0);
  });
});
