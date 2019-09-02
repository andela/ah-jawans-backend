import models from '../../models';
import sendMail from '../mail/sendMail';
import eventEmitter from './EventEmitter';

const { Notification, Opt, User } = models;

const notify = async (data) => {
  let inAppNotification, emailNotification;

  const { resource, user, inAppMessage, emailMessage, url } = data;
  const optedin = await Opt.findAll({ where: { userId: user.followed } });
  optedin.map(async (subscription) => {
    const { dataValues } = await User.findOne({ where: { id: user.userId } });
    switch (subscription.type) {
      case 'email':
        emailNotification = await Notification.create({
          userId: user.userId,
          resource,
          message: emailMessage,
          status: 'unseen',
          type: subscription.type,
          url
        });
        await sendMail(dataValues.email, 'notification', { message: emailMessage });
        break;
      case 'inapp':
        inAppNotification = await Notification.create({
          userId: user.userId,
          resource,
          message: inAppMessage,
          status: 'unseen',
          type: subscription.type,
          url
        });
        eventEmitter.emit('new_inapp', inAppMessage, dataValues);
        break;
      default:
        break;
    }
  });
  return { inAppNotification, emailNotification };
};

export default notify;
