/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai';
import template from '../template/mail/templates/notifications';

describe('Email notification template tests..,', () => {
  it('Should return an object of email data', () => {
    expect(template({ message: 'Hello world' })).to.be.an('object');
  });
});
