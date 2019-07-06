/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import models from '../models';

class ValidateUser {
  static async validateUser(req, res, next) {
    const { email } = req.body;
    const { User } = models;
    try {
      await User.findAll({ where: { email: req.body.email } })
        .then((user) => {
          if (user.length) {
            return res.status(409).json({ message: `Email ${email} exists in the system!` });
          }
          next();
        });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error!' });
    }
  }
}

export default ValidateUser;
