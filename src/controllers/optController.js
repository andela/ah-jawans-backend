import models from '../models';

const { Opt, Notification } = models;

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
    const optedin = await Opt.findOne({ where: { userId: req.user.id,
      type: 'inapp' } });
    if (optedin) {
      return res.status(400).json({ message: 'You are already opted-in' });
    }
    const newOpt = await Opt.create({ userId: req.user.id,
      type: 'inapp' });
    if (newOpt) {
      res.status(201).json({ message: 'You are now opted-in to in-app notifications',
        data: newOpt });
    }
  }

  /**
   * @description User should subscribe with email
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} Response object
   */
  static async OptInEmail(req, res) {
    const optedin = await Opt.findOne({ where: { userId: req.user.id,
      type: 'email' } });
    if (optedin) {
      return res.status(400).json({ message: 'You are already opted in' });
    }

    const newOpt = await Opt.create({ userId: req.user.id,
      type: 'email' });
    if (newOpt) {
      res.status(201).json({ message: 'You are now opted-in for receiving email notifications',
        data: newOpt });
    }
  }

  /**
    * @description User should be able to opt-out in-app notifications
    * @param {Object} req Request Object
    * @param {Object} res Response Object
    * @returns {Object} Response object
    */
  static async optOutApp(req, res) {
    const optedin = await Opt.findOne({ where: { userId: req.user.id,
      type: 'inapp' } });
    if (optedin) {
      await Opt.destroy({ where: { userId: req.user.id,
        type: 'inapp' } });
      return res.json({ message: 'You are now opted-out!' });
    }
    res.status(400).json({ message: 'You are not opted-in with in-app' });
  }

  /**
    * @description User should be able to opt-out email notifications
    * @param {Object} req Request object
    * @param {Object} res Response object
    * @returns {Object} Response object
    */
  static async optOutEmail(req, res) {
    const optedin = await Opt.findOne({ where: { userId: req.user.id,
      type: 'email' } });
    if (optedin) {
      await Opt.destroy({ where: { userId: req.user.id,
        type: 'email' } });

      return res.json({ message: 'You are now opted-out!' });
    }
    res.status(400).json({ message: 'You are not yet opted in with email' });
  }

  /**
    * @description User should be able able to view notifications
    * @param {Object} req Request object
    * @param {Object} res Response object
    * @returns {Object} Response object
    */
  static async ViewNotification(req, res) {
    const Notifications = await Notification.findAll({ where: { userId: req.params.id } });
    return Notifications.length
      ? res.status(200).json({ message: 'Notifications',
        Notifications })
      : res.status(404).json({ errors: { Notifications: "You don't have any notifications" } });
  }
}

export default OptController;
