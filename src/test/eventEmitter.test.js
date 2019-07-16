/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import eventEmitter from '../template/notifications/EventEmitter';

describe('Event Listener tests', () => {
  it('Should listen to errors', () => {
    const event = eventEmitter.emit('error', new Error('Random error!'));
    expect(event).to.be.true;
  });
});
