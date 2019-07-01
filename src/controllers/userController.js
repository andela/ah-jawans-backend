/* eslint-disable require-jsdoc */
import models from '../models';


const { User } = models;

export default class UserController {
  static async getUserProfile(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.status(404).json({ error: 'User not available' });
      }
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(401).json({ error: 'Invalid param' });
    }
  }

  static updateUserProfile(req, res, next) {
    User.findById(req.payload.id)
      .then((user) => {
        if (!user) {
          return res.sendStatus(401);
        }

        // only update fields that were actually passed...
        if (typeof req.body.user.username !== 'undefined') {
          user.username = req.body.user.username;
        }
        if (typeof req.body.user.email !== 'undefined') {
          user.email = req.body.user.email;
        }
        if (typeof req.body.user.bio !== 'undefined') {
          user.bio = req.body.user.bio;
        }
        if (typeof req.body.user.image !== 'undefined') {
          user.image = req.body.user.image;
        }
        if (typeof req.body.user.password !== 'undefined') {
          user.setPassword(req.body.user.password);
        }

        return user.save().then(() => res.json({ user: user.toAuthJSON() }));
      })
      .catch(next);
  }

  static createUser(req, res, next) {
    const user = new User();

    user.username = req.body.user.username;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);

    user.save()
      .then(() => res.json({ user: user.toAuthJSON() }))
      .catch(next);
  }
}
