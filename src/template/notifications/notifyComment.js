import models from '../../models';
import sendMail from '../mail/sendMail';
import eventEmitter from './EventEmitter';

const { Notification, Opt, User } = models;

const notifyComment = async (data) => {
  let inAppNotification, emailNotification;
  const { resource, user, inAppMessage, emailMessage, url } = data;
  console.log(url, 'url from notify');
  const optedin = await Opt.findAll({ where: { userId: user.userId } });
  optedin.forEach(async (subscription) => {
    const { dataValues } = await User.findOne({ where: { id: user.userId } });
    switch (subscription.type) {
      case 'email':
        emailNotification = await Notification.create({ userId: user.userId,
          resource,
          message: emailMessage,
          status: 'unseen',
          type: subscription.type });
        await sendMail(dataValues.email, 'notification', { message: emailMessage });
        break;
      case 'inapp':
        inAppNotification = await Notification.create({ userId: user.userId,
          resource,
          message: inAppMessage,
          status: 'unseen',
          type: subscription.type });
        eventEmitter.emit('new_inapp', inAppMessage, dataValues);
        break;
      default:
        break;
    }
  });
  return { inAppNotification, emailNotification };
};

export default notifyComment;
