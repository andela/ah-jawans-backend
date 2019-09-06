import models from '../models';

const { Opt, Notification } = models;

const optInCreate = async (req, res, Type) => {
  const optedin = await Opt.findOne({ where: { userId: req.user.id,
    type: Type } });
  if (optedin) {
    return res.status(400).json({ message: 'You are already opted-in' });
  }
  const newOpt = await Opt.create({ userId: req.user.id,
    type: Type });
  if (newOpt) {
    res.status(201).json({ message: `You are now opted-in to ${Type} notifications`,
      data: newOpt });
  }
};

const optOutCreate = async (req, res, Type) => {
  const optedin = await Opt.findOne({ where: { userId: req.user.id,
    type: Type } });
  if (optedin) {
    await Opt.destroy({ where: { userId: req.user.id,
      type: Type } });

    return res.json({ message: 'You are now opted-out!' });
  }
  res.status(400).json({ message: `You are not yet opted in with ${Type}` });
};

/**
  * @class
  */
class OptController {
  /**
    * @description User should be able  to
    * @param {Object} req Request object
    * @param {Object} res  Response object
    * @returns {Object} Response object
    */
  static async OptInApp(req, res) {
    const Type = 'inapp';
    await optInCreate(req, res, Type);
  }

  /**
   * @description User should subscribe with email
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response object
   */
  static async OptInEmail(req, res) {
    const Type = 'email';
    await optInCreate(req, res, Type);
  }

  /**
    * @description User should be able to opt-out in-app notifications
    * @param {Object} req Request Object
    * @param {Object} res Response Object
    * @returns {Object} Response object
    */
  static async optOutApp(req, res) {
    const Type = 'inapp';
    await optOutCreate(req, res, Type);
  }

  /**
    * @description User should be able to opt-out email notifications
    * @param {Object} req Request object
    * @param {Object} res Response object
    * @returns {Object} Response object
    */
  static async optOutEmail(req, res) {
    const Type = 'email';
    await optOutCreate(req, res, Type);
  }

  /**
    * @description User should be able able to view notifications
    * @param {Object} req Request object
    * @param {Object} res Response object
    * @returns {Object} Response object
    */
  static async ViewNotification(req, res) {
    const Notifications = await Notification.findAll({ where: { userId: req.params.id, status: 'unseen', type: 'inapp' } });
    return Notifications.length
      ? res.status(200).json({ message: 'Notifications',
        Notifications })
      : res.status(200).json({ message: { Notifications: "You don't have any notifications" } });
  }

  /**
    * @description User should be able able to view notifications
    * @param {Object} req Request object
    * @param {Object} res Response object
    * @returns {Object} Response object
    */
  static async EditNotification(req, res) {
    const amendNotifications = await Notification.findOne({ where: { userId: req.params.id, id: req.params.notificationid, type: 'inapp' } });
    return amendNotifications
      ? await Notification.update({ status: 'seen' },
        { where: { userId: req.params.id, id: req.params.notificationid, type: 'inapp' } })
      && res.status(200).json({ message: 'Notification Viewed!' })
      : res.status(404).json({ message: 'Notification not found!' });
  }
}

export default OptController;
